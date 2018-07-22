//document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded");
    disableElements();
//});

// window.onload = function(){
//     console.log("window.onload");
//     disableElements();
// };

function disableElements(){
    disableElementWhenOverThisZIndex(10);
    disableThisTagNames(["iFrame"]);
    disableElementsWhatIncludesThisHref(["traffic-url"]);
}

function disableElementWhenOverThisZIndex(zidx){
    var tags = document.getElementsByTagName("*");
    for(i=0;i < tags.length;i++){
        var elem = tags[i];
        zIndexOfElem = document.defaultView.getComputedStyle(elem,null).zIndex; //z-Indexの取得

        if(zIndexOfElem > zidx){ //指定z-indexより大きかったら
            elem.style.display = "none"; //display: none; を設定
            console.log(`following element is disabled by "disableElementWhenOverThisZIndex". tagName:"${elem.tagName}", id:"${elem.id}", className:"${elem.className}"`);
        }
    }
}

function disableThisTagNames(tagNames){
    var tags = document.getElementsByTagName("*");
    for(i=0;i < tags.length;i++){
        var elem = tags[i];
        for(var j = 0 ; j < tagNames.length ; j++){
            if(tagNames[j].toUpperCase() === elem.tagName.toUpperCase()){ //大文字・小文字の違いを無視して一致した場合
                elem.style.display = "none"; //display: none; を設定
                console.log(`following element is disabled by "disableThisTagNames. tagName:"${elem.tagName}", id:"${elem.id}", className:"${elem.className}"`);
                break;
            }
        }
    }
}

function disableElementsWhatIncludesThisHref(refs){
    var tags = document.getElementsByTagName("*");
    for(i=0;i < tags.length;i++){
        var elem = tags[i];
        var ref = elem.getAttribute('href');
        var fnd = false;
        if(ref != null){
            for(var j = 0 ; j < refs.length ; j++){
                fnd = ref.indexOf(refs[j]) != -1; //文字列が存在するかどうか
                if(fnd){ //存在する場合
                    break;
                }
            }
        }
        if(fnd){
            elem.style.display = "none";
            console.log(`following element is disabled by "disableElementsWhatIncludesThisHref. tagName:"${elem.tagName}", id:"${elem.id}", className:"${elem.className}, href:"${elem.getAttribute('href')}"`);
        }
    }
}