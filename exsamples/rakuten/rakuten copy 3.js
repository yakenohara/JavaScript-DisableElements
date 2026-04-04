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

    fnc_log("start");

    const el = document.querySelector('.r-slideshow-items');
    if (!el) return;

    fnc_log("FOUND");

    const fixed = getComputedStyle(el).left;

    let isUpdating = false;

    new MutationObserver(() => {

        if (isUpdating) return;

        const current = getComputedStyle(el).left;

        if (current !== fixed) {
            isUpdating = true;

            el.style.transition = 'none';
            el.style.left = fixed;

            isUpdating = false;
        }

    }).observe(el, {
        attributes: true,
        attributeFilter: ['style']
    });

})();
