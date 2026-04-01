// ==UserScript==
// @name         mcdonalds.co.jp
// @version      0.1
// @match        https://www.mcdonalds.co.jp/*
// @grant        none
// @run-at document-start
// ==/UserScript==

//note
// `@run-at document-start` -> 可能な限り早くキックされる
// https://www.tampermonkey.net/documentation.php?ext=dhdg&q=run_at#meta:run_at
(function () {

    // ログ用
    var str_logprefix = "[Animation Disabler] ";
    function fnc_log(msg){
        console.log(str_logprefix + msg);
    }

    // swiper.js の無効化
    const observer = new MutationObserver(() => {
        const wrapper = document.querySelector('.swiper-wrapper');

        if (wrapper) {
            fnc_log("Node that includes class \".swiper-wrapper\" found.");

            wrapper.style.transition = 'none';
            wrapper.style.transform = getComputedStyle(wrapper).transform;

            // 監視して上書きし続ける
            new MutationObserver(() => {
                wrapper.style.transition = 'none';
            }).observe(wrapper, {
                attributes: true,
                attributeFilter: ['style']
            });

            observer.disconnect();
        }
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
