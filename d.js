// ==UserScript==
// @name         BlenderMarket Downloader
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Добавляет кнопку "Скачать" в блок цены
// @author       Axelaredz
// @match        https://blendermarket.com/products/animation-layers*
// @match        https://blendermarket.com/products/mesh-materializer*
// @match        https://blendermarket.com/products/simplicage*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const products = {
        'animation-layers': 'https://t.me/c/1495906512/7396/',
        'mesh-materializer': 'https://t.me/c/1495906512/8182/',
        'simplicage': 'https://t.me/c/1495906512/9938/',
    };

    const currentProduct = Object.keys(products).find(key =>
        window.location.href.includes(key)
    );

    if (!currentProduct) return;

    const observer = new MutationObserver(() => {
        const priceBox = document.querySelector('.price-box');
        if (!priceBox || priceBox.querySelector('.download-btn')) return observer.disconnect();

        const btn = document.createElement('a');
        btn.href = products[currentProduct];
        btn.target = '_blank';
        btn.className = 'btn btn-success download-btn d-grid';
        btn.textContent = '⬇ Скачать';

        // Вставляем перед кнопкой добавления в корзину
        const cartBtn = priceBox.querySelector('.add-to-cart');
        cartBtn ? priceBox.insertBefore(btn, cartBtn) : priceBox.prepend(btn);

        observer.disconnect();
        console.log(`Кнопка добавлена для: ${currentProduct}`);
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
