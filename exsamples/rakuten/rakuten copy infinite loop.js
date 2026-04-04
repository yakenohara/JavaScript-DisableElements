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

    fnc_log("start");

    function attach(el) {
        fnc_log("FOUND");

        const fixed = getComputedStyle(el).left;

        // 初回固定
        el.style.transition = 'none';
        el.style.left = fixed;

        // ★ style変化を監視
        new MutationObserver(() => {
            el.style.transition = 'none';
            el.style.left = fixed;
        }).observe(el, {
            attributes: true,
            attributeFilter: ['style']
        });
    }

    function tryFind() {
        const el = document.querySelector('.r-slideshow-items');
        if (el) {
            attach(el);
            return true;
        }
        return false;
    }

    // ★ 初回チェック
    if (tryFind()) return;

    // ★ 追加検知（念のため）
    new MutationObserver(() => {
        tryFind();
    }).observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();