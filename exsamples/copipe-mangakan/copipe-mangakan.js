// ==UserScript==
// @name         copipe-mangakan.com
// @version      0.1
// @match        https://copipe-mangakan.com/*
// @grant        none
// ==/UserScript==

//note
// DOMContentLoaded のタイミングで実行される
(function () {

    // ログ用
    var str_logprefix = "[Animation Disabler] ";
    function fnc_log(msg){
        console.log(str_logprefix + msg);
    }
    
    fnc_log("Start - DOMContentLoaded");
    
    // Slick 無効化 -> JQuery が load されたタイミングで実行する
    const observer = new MutationObserver(() => {
    if (window.jQuery) {
        fnc_log("jQuery detected");
        jQuery('.slick-slider').slick('slickPause');
    }
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    //shine を無効化
    const style = document.createElement('style');
    style.textContent = `.btn-shine::before { content: none !important; }`;
    document.head.appendChild(style);

    fnc_log("Disabling End");

})();
