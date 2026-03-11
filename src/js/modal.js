/**
 * Shoptet modály (#colorbox) – použití shoptet.modal API
 *
 * V Shoptetu se modály řeší přes jQuery Colorbox. API je v objektu shoptet.modal:
 *
 * - shoptet.modal.open(options)  – otevře modal (volá $.colorbox)
 * - shoptet.modal.close()       – zavře modal
 * - shoptet.modal.resize(opts)  – změna velikosti
 * - shoptet.modal.shoptetResize() – responzivní přepočet (volat v onComplete po načtení obsahu)
 *
 * Časté options pro open():
 *   href       – URL (načte se do iframe nebo jako obsah)
 *   html       – HTML řetězec (lze obalit: shoptet.content.colorboxHeader + html + shoptet.content.colorboxFooter)
 *   width      – 300 | 500 | 700 | 1152 nebo shoptet.modal.config.widthSm/Md/Lg
 *   className  – shoptet.modal.config.classSm | classMd | classLg (shoptet-modal-sm/md/lg)
 *   maxWidth   – "98%"
 *   maxHeight  – "95%"
 *   opacity    – např. ".95"
 *   closeButton, overlayClose, escKey – boolean
 *   onComplete – callback po zobrazení (např. shoptet.modal.shoptetResize(), validátory)
 *   onClosed   – callback po zavření
 *
 * V HTML: odkaz s třídou .colorbox nebo .link-icon.chat/.watchdog otevírá modal (href).
 * Tlačítko .colorbox-close modal zavírá.
 */

(function () {
    if (typeof shoptet === 'undefined' || !shoptet.modal) return;

    /**
     * Otevře Shoptet modal s vlastním HTML obsahem.
     * @param {string} html - HTML obsah modalu
     * @param {Object} [opts] - doplňkové options pro shoptet.modal.open (width, className, onComplete, …)
     */
    window.openShoptetModal = function (html, opts) {
        opts = opts || {};
        var options = {
            html: html,
            width: shoptet.modal.config.widthMd,
            maxWidth: shoptet.modal.config.maxWidth,
            className: shoptet.modal.config.classMd
        };
        if (typeof shoptet.content !== 'undefined' && shoptet.content.colorboxHeader && shoptet.content.colorboxFooter) {
            options.html = shoptet.content.colorboxHeader + html + shoptet.content.colorboxFooter;
        }
        for (var key in opts) {
            if (opts.hasOwnProperty(key)) options[key] = opts[key];
        }
        shoptet.modal.open(options);
    };

    /**
     * Otevře Shoptet modal na URL (např. AJAX stránka).
     * @param {string} url - href
     * @param {Object} [opts] - width, className, onComplete, …
     */
    window.openShoptetModalUrl = function (url, opts) {
        opts = opts || {};
        var options = {
            href: url,
            width: shoptet.modal.config.widthSm,
            className: shoptet.modal.config.classSm
        };
        for (var key in opts) {
            if (opts.hasOwnProperty(key)) options[key] = opts[key];
        }
        shoptet.modal.open(options);
    };
})();
