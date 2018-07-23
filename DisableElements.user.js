//document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded");
    disableElements();
//});

// window.onload = function(){
//     console.log("window.onload");
//     disableElements();
// };

function disableElements(){
    var mode = "hidden";
    disableElementWhenOverThisZIndex(10, mode);
    disableThisTagNames(["iFrame"], mode);
    disableElementsWhatIncludesThisHref(["traffic-url"], mode);
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
                    break;
                }
            }
        }
        if(fnd){
            disableThisElement(elem, mode, "disableElementsWhatIncludesThisHref");
        }
    }
}

function disableThisElement(elem, mode, whoCalled){    
    switch(mode){
        case "node":
            elem.style.display = "none";
            break;

        case "hidden":
            elem.style.visibility = "hidden";
            break;

        default:
            break;
    }
    console.log(`following element is disabled by "${whoCalled}". tagName:"${elem.tagName}", id:"${elem.id}", className:"${elem.className}, href:"${elem.getAttribute('href')}"`);
}
