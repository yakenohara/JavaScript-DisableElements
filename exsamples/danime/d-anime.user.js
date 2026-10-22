// ==UserScript==
// @name         dアニメストア ポップアップ自動削除
// @namespace    https://animestore.docomo.ne.jp/
// @version      1.0.0
// @description  dアニメストアで不定期に表示される広告モーダル (dialog.popup-wrapper) を自動で閉じて削除する
// @match        https://animestore.docomo.ne.jp/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

// 作の流れ

// 最初に CSS で隠す: ページ読み込みの一番最初に CSS を入れて、dialog.popup-wrapper と背景の暗転を見えないようにします。一瞬表示されてしまうこともありません。
// 閉じてから削除する: モーダルが現れたら、close() で閉じてから DOM から削除します。CSS で隠すだけだと、showModal() で開かれていた場合にページ全体がクリックできないままになるため、閉じる処理も入れています。
// 後から出るものも監視: 不定期に後から追加されるモーダルや、後で open 属性が付くものも監視して処理します。
// スクロールを元に戻す: モーダル表示中にスクロールが止められていた場合は、元に戻します。

// 作り方について: モーダルはスクリプトで後から追加されるため、魚拓のファイルにもソースにも入っていませんでした。そこで、スクリーンショットに写っている要素（dialog.popup-wrapper と .popup-modal）を目印にしています。サイト側でクラス名が変わると効かなくなるので、その場合は SELECTOR の行を修正してください。

(function () {
  'use strict';

  const SELECTOR = 'dialog.popup-wrapper, dialog:has(> .popup-modal)';

  // 1. 一瞬でも見えないように CSS で先に隠す
  const style = document.createElement('style');
  style.textContent = `
    dialog.popup-wrapper,
    dialog:has(> .popup-modal),
    dialog.popup-wrapper::backdrop { display: none !important; }
  `;
  (document.head || document.documentElement).appendChild(style);

  // 2. モーダルを閉じて DOM から削除
  //    showModal() で開かれた場合、CSS で隠すだけだとページ全体が操作不能 (inert) のままになるため close() が必要
  function removePopups(root) {
    const list = [];
    if (root.matches && root.matches(SELECTOR)) list.push(root);
    if (root.querySelectorAll) list.push(...root.querySelectorAll(SELECTOR));
    if (!list.length) return;

    for (const dlg of list) {
      try { if (dlg.open) dlg.close(); } catch (_) {}
      dlg.remove();
    }
    restoreScroll();
    console.debug('[dアニメ popup remover] removed', list.length);
  }

  // 3. モーダル表示時にスクロールが止められていた場合に戻す
  function restoreScroll() {
    for (const el of [document.documentElement, document.body]) {
      if (!el) continue;
      if (el.style.overflow === 'hidden') el.style.overflow = '';
      if (el.style.overflowY === 'hidden') el.style.overflowY = '';
    }
  }

  // 4. 後から挿入される / open 属性が付くのを監視
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'childList') {
        for (const node of m.addedNodes) {
          if (node.nodeType === 1) removePopups(node);
        }
      } else if (m.type === 'attributes' && m.target.matches(SELECTOR)) {
        removePopups(m.target);
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['open', 'class'],
  });

  // 既に存在しているものも処理
  removePopups(document);
  document.addEventListener('DOMContentLoaded', () => removePopups(document));
})();
