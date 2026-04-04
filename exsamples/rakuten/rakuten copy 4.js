// ==UserScript==
// @name         rakuten.co.jp
// @version      0.1
// @match        *://*.rakuten.co.jp/*
// @grant        none
// @run-at document-start
// @noframes false
// ==/UserScript==

//note
// `@run-at document-start` -> 可能な限り早くキックされる (なぜか デフォルト (DOMContentLoaded) のタイミングだとキックされない)
// https://www.tampermonkey.net/documentation.php?ext=dhdg&q=run_at#meta:run_at
(function () {

    function fnc_log(msg){
        console.log("[Animation Disabler]", msg);
    }

    new MutationObserver(() => {
        document.querySelectorAll('.r-slideshow-page').forEach(el => {
            new MutationObserver(() => {
                el.style.left = '0px';
                el.style.transition = 'none';
            }).observe(el, { //todo 多重登録の危険
                attributes: true,
                attributeFilter: ['style']
            });
        });

    }).observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
