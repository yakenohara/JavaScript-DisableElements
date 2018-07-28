//document.addEventListener("DOMContentLoaded", function() {
    // console.log("DOMContentLoaded");
    // disableElements();
//});

window.onload = function(){
    console.log("window.onload");
    disableElements();
};

function disableElements(){
    // var mode = "hidden";
    // disableElementWhenOverThisZIndex(10, mode);
    // disableThisTagNames(["iFrame"], mode);
    // disableElementsWhatIncludesThisHref(["traffic-url"], mode);
    disableElementsWhatIncludesThisIDs(["eobm_"],"none");
    disableThisClasses(["exp-outline"], "none");

}

function disableElementWhenOverThisZIndex(zidx, mode){
    var tags = document.getElementsByTagName("*");
    for(i=0;i < tags.length;i++){
        var elem = tags[i];
        zIndexOfElem = document.defaultView.getComputedStyle(elem,null).zIndex; //z-Indexの取得

        if(zIndexOfElem > zidx){ //指定z-indexより大きかったら
            disableThisElement(elem, mode, "disableElementWhenOverThisZIndex");
        }
    }
}

function disableThisIDs(idNames, mode){
    for(var i = 0 ; i < idNames.length ; i++){
        var elem = document.getElementById(idNames[i]);
        if(elem != null){ //大文字・小文字の違いを無視して一致した場合
            disableThisElement(elem, mode, "disableThisIDs");
        }
    }
}

//todo
function disableElementsWhatIncludesThisIDs(idNames, mode){
    var tags = document.getElementsByTagName("*");
    for(i=0;i < tags.length;i++){
        var elem = tags[i];
        var idName = elem.id;
        for(var j = 0 ; j < idNames.length ; j ++){
            var fnd = idName.indexOf(idNames[j]) != -1; //文字列が存在するかどうか
            if(fnd){
                disableThisElement(elem, mode, "disableElementsWhatIncludesThisIDs");
                break;
            }
        }
        
    }
}

function disableThisClasses(classNames, mode){
    for(var i = 0 ; i < classNames.length ; i++){
        var elements = document.getElementsByClassName(classNames[i]);
        console.log(elements);
        if(elements != null){ //大文字・小文字の違いを無視して一致した場合
            for(var j = 0; elements.length ; j++){
                disableThisElement(elements[j], mode, "disableThisClasses");
            }
        }
    }
}

function disableThisTagNames(tagNames, mode){
    var tags = document.getElementsByTagName("*");
    for(i=0;i < tags.length;i++){
        var elem = tags[i];
        for(var j = 0 ; j < tagNames.length ; j++){
            if(tagNames[j].toUpperCase() === elem.tagName.toUpperCase()){ //大文字・小文字の違いを無視して一致した場合
                disableThisElement(elem, mode, "disableThisTagNames");
                break;
            }
        }
    }
}

function disableElementsWhatIncludesThisHref(refs, mode){
    var tags = document.getElementsByTagName("*");
    for(i=0;i < tags.length;i++){
        var elem = tags[i];
        var ref = elem.getAttribute('href');
        var fnd = false;
        if(ref != null){
            for(var j = 0 ; j < refs.length ; j++){
                fnd = ref.indexOf(refs[j]) != -1; //文字列が存在するかどうか
                if(fnd){ //存在する場合
                    disableThisElement(elem, mode, "disableElementsWhatIncludesThisHref");
                    break;
                }
            }
        }
    }
}

function disableThisElement(elem, mode, whoCalled){
    var succeeded = true;
    switch(mode){
        case "none":
            elem.style.display = "none";
            break;

        case "hidden":
            elem.style.visibility = "hidden";
            break;

        default:
            succeeded = false;
            break;
    }

    if(succeeded){
        console.log(`following element is disabled by "${whoCalled}". tagName:"${elem.tagName}", id:"${elem.id}", className:"${elem.className}, href:"${elem.getAttribute('href')}"`);
    }else{
        console.warn(`unknown disabling type "${mode}" specified by "${whoCalled}". tagName:"${elem.tagName}", id:"${elem.id}", className:"${elem.className}, href:"${elem.getAttribute('href')}"`);
    }
}
