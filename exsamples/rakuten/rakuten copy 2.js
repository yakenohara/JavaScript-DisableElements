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
        console.log("[Animation Disabler]", msg, location.href);
    }

    fnc_log("start");

    function tryFind() {
        const el = document.querySelector('.r-slideshow-items');
        if (el) {
            fnc_log("FOUND");
            return el;
        }
        return null;
    }

    function wait() {
        const el = tryFind();
        if (el) {
            const fixed = getComputedStyle(el).left;
            el.style.transition = 'none';
            el.style.left = fixed;
            return;
        }
        requestAnimationFrame(wait);
    }

    wait();

})();
