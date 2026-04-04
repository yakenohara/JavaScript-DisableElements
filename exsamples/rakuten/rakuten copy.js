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

    // ログ用
    var str_logprefix = "[Animation Disabler] ";
    function fnc_log(msg){
        console.log(str_logprefix + msg);
    }

    fnc_log("aaa");

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

    function tryFind() {
        const el = document.querySelector('.r-slideshow-items');
        if (el) {
            fnc_log('FOUND');
            fnc_disable(el);
            return true;
        }
        return false;
    }

    // ★ ① 最初に1回チェック
    if (tryFind()) return;

    // ★ ② 見つからなければ監視
    const observer = new MutationObserver(() => {
        if (tryFind()) {
            observer.disconnect();
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
