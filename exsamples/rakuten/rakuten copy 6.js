// ==UserScript==
// @name         rakuten.co.jp
// @version      0.1
// @match        *://*.rakuten.co.jp/*
// @grant        none
// @run-at document-start
// @noframes false
// ==/UserScript==
//
//note
// `@run-at document-start` -> 可能な限り早くキックされる (なぜか デフォルト (DOMContentLoaded) のタイミングだとキックされない)
// https://www.tampermonkey.net/documentation.php?ext=dhdg&q=run_at#meta:run_at
// `@noframes false` -> iframe 内部についても実行する
// https://www.tampermonkey.net/documentation.php?locale=en&q=noframes
(function () {

    function fnc_log(msg){
        console.log("[Animation Disabler]", msg);
    }

    new MutationObserver(() => {
        document.querySelectorAll('.r-slideshow-page').forEach(el => {
            el.style.left = '0px';
            el.style.transition = 'none';
        });

    }).observe(document.documentElement, { //todo すべての要素を監視するので処理負荷大
        attributes: true,
        attributeFilter: ['style'],
        childList: true,
        subtree: true
    });

})();
