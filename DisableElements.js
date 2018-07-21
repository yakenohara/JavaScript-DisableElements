window.onload = function(){
    var ignoreTagNames = ["iFrame"];
    console.log(`on load`);
    disableElementWhenOverThisZIndex(10);
    disableThisTagNames(["iFrame"]);
};

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
