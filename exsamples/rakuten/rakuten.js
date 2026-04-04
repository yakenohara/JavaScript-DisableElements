// ==UserScript==
// @name         rakuten.co.jp
// @version      0.1
// @match        https://www.rakuten.co.jp/*
// @grant        none
// @run-at document-start
// ==/UserScript==

//note
// `@run-at document-start` -> 可能な限り早くキックされる (なぜか デフォルト (DOMContentLoaded) のタイミングだとキックされない)
// https://www.tampermonkey.net/documentation.php?ext=dhdg&q=run_at#meta:run_at
(function () {

    // ログ用
    var str_logprefix = "[Animation Disabler] ";
    function fnc_log(msg){
        console.log(str_logprefix + msg);
    }

    // 楽天独自スライダー無効化
    function fnc_disable(el) {
        const fixed = getComputedStyle(el).left;

        el.style.transition = 'none';
        el.style.left = fixed;

        new MutationObserver(() => {
            el.style.transition = 'none';
            el.style.left = fixed;
        }).observe(el, {
            attributes: true,
            attributeFilter: ['style']
        });
    }
    const observer = new MutationObserver(() => {
        const el = document.querySelector('.r-slideshow-items');
        if (el) {
            fnc_log("Node that includes class \".r-slideshow-items\" found.");
            fnc_disable(el);
            observer.disconnect();
        }
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();