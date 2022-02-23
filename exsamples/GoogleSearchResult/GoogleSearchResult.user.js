// ==UserScript==
// @name         GoogleSearchResult
// @version      0.1
// @match        https://www.google.com/*
// @grant        none
// ==/UserScript==

(function () {

    var objArr1 = [
        {
            specifier: null,
            mode:"none",
            judger: function(elem){ //<div id="eob_??">の形式の場合にtrueを返す
                var bl_result = false;
                if(elem.tagName.toUpperCase() == 'DIV'){
                    if(elem.hasAttribute("id")){
                        var baseUri = elem.getAttribute("id");
                        if((baseUri.indexOf('eob_') == 0)||(baseUri.indexOf('aobm_') == 0)){ //<div id="eob_??">または<div id="aobm_??">の形式の場合)
                            bl_result = true;
                        }
                    }
                    return bl_result;
                }
            }
        }
    ];

    var timingAndsettings = {

        // Dom Content Loaded のタイミングで発火する
        ready: objArr1,

        // window.onloadのタイミングで発火する
        // onload: objArr1,
    };

    //判定関数リスト
    var judgers = new function(){

        // zIndexが指定値を超えているかどうか
        this.over_zIndex = function(elem, val){
            return(document.defaultView.getComputedStyle(elem,null).zIndex  > val);
        }

        // 指定文字列をクラス名を持っているかどうか
        this.eq_class = function(elem, str){
            return (elem.classList.contains(str));
        }

        // 指定ID名かどうか
        this.eq_id = function(elem, str){
            return (elem.id == str);
        }

        // ID名に指定文字列が含まれるかどうか
        this.inc_id = function(elem, str){
            return (elem.id.indexOf(str) != -1);
        }

        // 指定タグ名かどうか
        this.eq_tag = function(elem, str){
            return (elem.tagName.toUpperCase() == str.toUpperCase());
        }

        // href属性に指定文字列を含むかどうか
        this.inc_href = function(elem, str){
            var href = elem.getAttribute('href');
            if(href !== null){
                return (href.indexOf(str) != -1);
            }else{
                return false;
            }
        }
    }

    // イベント登録 - DOMContentLoaded
    if(typeof timingAndsettings.ready == 'object'){
        // document.addEventListener("DOMContentLoaded", function() { // <- note:greasemonkeyでは不要
            console.log("Disabling Start");
            disableElements(timingAndsettings.ready);
            console.log("Disabling End");
        // });
    }

    // // イベント登録 - window.onload
    if(typeof timingAndsettings.onload == 'object'){
        window.addEventListener("load", function(){
            console.log("Disabling Start");
            disableElements(timingAndsettings.onload);
            console.log("Disabling End");
        }, false);
    }

    function disableElements(settings){
        var elements = document.getElementsByTagName("*");

        //DOM要素網羅ループ
        for(var idxOfElement = 0 ; idxOfElement < elements.length ; idxOfElement++){

            var element = elements[idxOfElement];

            //設定網羅ループ
            for(var idxOfSetting = 0 ; idxOfSetting < settings.length ; idxOfSetting++){

                var setting = settings[idxOfSetting];
                var func_judger;

                if(typeof setting.judger == 'function'){ //関数の直接指定の場合
                    func_judger = setting.judger;

                }else{ //判定関数リストから指定の場合
                    func_judger = judgers[setting.judger];
                }


                if(Array.isArray(setting.specifier)){ //配列の場合

                    //キーワード網羅ループ
                    for(var idxOfSpecifier = 0 ; idxOfSpecifier < setting.specifier.length ; idxOfSpecifier++){
                        var oneOfSpecifier = setting.specifier[idxOfSpecifier];
                        if(func_judger(element, oneOfSpecifier)){ //判定結果trueの場合
                            disable(element, setting.mode);
                        }
                    }

                }else{ //配列でない場合
                    if(func_judger(element, setting.specifier)){ //判定結果trueの場合
                        disable(element, setting.mode);
                    }
                }
            }
        }
    }

    function disable(elem, mode){
        switch(mode){
            case "none":
            {
                beforeDesabling(elem, mode);
                elem.style.display = "none";

            }
            break;

            case "hidden":
            {
                beforeDesabling(elem, mode);
                elem.style.visibility = "hidden";
            }
            break;

            case "remove":
            {
                beforeDesabling(elem, mode);
                elem.remove();
            }
            break;


            default:
            {
                var errorMessage = "Unknown mode \`" + mode + "\` specified.";
                throw new Error(errorMessage);
            }
            break;
        }
    }

    function beforeDesabling(elem, mode){
        console.log("Disabled \`" + getDomPath(elem).join('/') + "\`. mode:\`" + mode + "\`");
        console.log(elem);
    }

    // DOM要素のPathを配列型で返却する
    function getDomPath(el) {

        var stack = [];

        while ( el.parentNode !== null ) {

            var sibCount = 0;
            var sibIndex = 0;

            for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
                var sib = el.parentNode.childNodes[i];
                if ( sib.nodeName == el.nodeName ) {
                    if ( sib === el ) {
                        sibIndex = sibCount;
                    }
                    sibCount++;
                }
            }

            if ( el.hasAttribute('id') && el.id != '' ) {
                stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
            } else if ( sibCount > 1 ) {
                stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
            } else {
                stack.unshift(el.nodeName.toLowerCase());
            }

            el = el.parentNode;
        }

        return stack.slice(1); // removes the html element
    }

})();
