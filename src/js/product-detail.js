$(document).ready(function() {
    $(".p-detail-info .stars-wrapper").prependTo(".p-info-wrapper");
    $(".p-short-description a[href='#description']").text(shopDataLayer.productDetail.readWholeDescription);
    $("#p-detail-tabs .shp-tab-link[href='#description']").text(shopDataLayer.productDetail.tabs.descriptionTab);
    if($(".extended-description .detail-parameters").length) {
        $("<div class='tab-pane fade' id ='parametersTab'></div>").appendTo("#tab-content");
        $(".extended-description").appendTo("#parametersTab");
        $('<li class="shp-tab" data-testid="tabParameters"><a href="#parametersTab" class="shp-tab-link" role="tab" data-toggle="tab">'+shopDataLayer.productDetail.tabs.parametersTab+'</a></li>').appendTo("#p-detail-tabs");
    }


    // Pro variantní řádky v .detail-parameters: pokud id parametru je v addedInfo a má linkText, přidáme span.variant-action + klikací .myvariants
    var addedInfo = shopDataLayer.productDetail.variants.addedInfo || [];

    // Skrýt řádek, který má v th .row-header-label text "Velikostní tabulka"
    $(".extended-description .detail-parameters tr").each(function() {
        var $row = $(this);
        var labelText = $row.find("th .row-header-label").text().trim();
        if (labelText === "Velikostní tabulka" || labelText === "Velikostní tabulka:") {
            $row.hide();
        }
    });

    $(".detail-parameters tr.variant-list").each(function() {
        var $row = $(this);
        var $th = $row.find("th");
        var $select = $row.find("select[data-parameter-id]");
        if (!$th.length || !$select.length) return;
        var paramId = $select.attr("data-parameter-id");
        var paramIdNum = parseInt(paramId, 10);
        var info = addedInfo.find(function(item) { return item.id === paramIdNum; });

        // U parametru id 5 (Velikost): přidat .variant-action vždy; data-link z td skrytého řádku "Velikostní tabulka", nebo selectu, nebo valueToType, nebo první typ
        if (paramIdNum === 5 && info && info.linkText && Array.isArray(info.linkContent)) {
            var types = info.linkContent.map(function(item) { return item.type; });
            var matchedType = null;
            // 1) Typ z td řádku, který má v th text "Velikostní tabulka" (ten řádek schováme)
            $(".extended-description .detail-parameters tr").each(function() {
                var $r = $(this);
                var lbl = $r.find("th .row-header-label").text().replace(/\s*:\s*$/, "").trim();
                if (lbl === "Velikostní tabulka") {
                    var tdText = $r.find("td").text().trim();
                    if (types.indexOf(tdText) !== -1) matchedType = tdText;
                    return false;
                }
            });
            // 2) Hodnota selectu parametru 5 (pokud je v types)
            if (!matchedType) {
                var selectVal = $select.val();
                if (types.indexOf(selectVal) !== -1) matchedType = selectVal;
            }
            // 3) valueToType z jiného selectu (Střih)
            if (!matchedType && info.valueToType) {
                var $strihSelect = $(".detail-parameters select[data-parameter-name]").filter(function() {
                    var name = $(this).attr("data-parameter-name") || "";
                    return $(this).attr("data-parameter-id") !== paramId && /střih|strih/i.test(name);
                }).first();
                if ($strihSelect.length) {
                    var strihVal = $strihSelect.val();
                    matchedType = info.valueToType[strihVal] || info.valueToType[String(strihVal)];
                }
            }
            if (!matchedType && types.length) matchedType = types[0];
            $th.wrapInner("<span>");
            var $action = $("<span>").addClass("variant-action").attr("data-variant-id", info.id).text(info.linkText);
            if (matchedType) $action.attr("data-link", matchedType);
            $th.append($action);
        } else if (info && info.linkText) {
            $th.wrapInner("<span>");
            $th.append($("<span>").addClass("variant-action").attr("data-variant-id", info.id).text(info.linkText));
        }

        // Klikací varianty: z optionů selectu vyrobíme .myvariants > .myvariant (obrázky jen když addedInfo má options a pro danou hodnotu existuje URL)
        var $td = $row.find("td");
        var variantOptions = info && info.options ? info.options : null;
        var $wrap = $("<div>").addClass("myvariants").attr("data-parameter-id", paramId);
        if (variantOptions) $wrap.addClass("image-included");

        $select.find("option").each(function() {
            var val = $(this).attr("value");
            if (val === "" || $(this).data("choose")) return;
            var optionText = $(this).text().trim();
            var $v = $("<div>")
                .addClass("myvariant")
                .attr("data-value", val)
                .attr("data-parameter-id", paramId);
            $("<span>").addClass("myvariant-name").text(optionText).appendTo($v);

            var imageSrc = variantOptions && (variantOptions[val] || variantOptions[String(val)]);
            if (imageSrc) {
                var $imgHolder = $("<div>").addClass("img-holder");
                $("<img>").attr("src", imageSrc).attr("alt", optionText).attr("loading", "eager").appendTo($imgHolder);
                $imgHolder.appendTo($v);
            }

            if ($select.val() === val) $v.addClass("active");
            $wrap.append($v);
        });
        $td.append($wrap);

        $wrap.on("click", ".myvariant", function() {
            var value = $(this).attr("data-value");
            $wrap.find(".myvariant").removeClass("active");
            $(this).addClass("active");
            $select.val(value);
            $select.trigger("change");
        });

        $select.on("change", function() {
            var val = $select.val();
            $wrap.find(".myvariant").removeClass("active").filter("[data-value='" + val + "']").addClass("active");
        });
    });

    // U parametru 5: při změně Střih selectu aktualizovat data-link u .variant-action v řádku parametru 5
    (function() {
        var info5 = addedInfo.find(function(item) { return item.id === 5; });
        if (!info5 || !info5.valueToType) return;
        var $strihSelect = $(".detail-parameters select[data-parameter-name]").filter(function() {
            var name = $(this).attr("data-parameter-name") || "";
            var pid = $(this).attr("data-parameter-id");
            return pid !== "5" && /střih|strih/i.test(name);
        }).first();
        if (!$strihSelect.length) return;
        $strihSelect.closest("tr").find("select").on("change", function() {
            var strihVal = $strihSelect.val();
            var type = info5.valueToType[strihVal] || info5.valueToType[String(strihVal)];
            var $row5 = $(".detail-parameters select[data-parameter-id=\"5\"]").closest("tr");
            if (type) $row5.find(".variant-action").attr("data-link", type);
        });
    })();

    // Klik na .variant-action: overlay s linkContent ze shopDataLayer podle id (jeden overlay na id, bez přepisování)
    $(document).on("click", ".variant-action", function() {
        var variantId = $(this).attr("id") || $(this).attr("data-variant-id");
        var dataLink = $(this).attr("data-link");
        var $existingOverlay = $(".myoverlay[data-variant-overlay][data-variant-id=\"" + variantId + "\"]");
        if ($existingOverlay.length && !dataLink) {
            $existingOverlay.fadeIn(300);
            return;
        }
        // Pro id 5 s data-link: každý typ má vlastní overlay (data-link v atributu overlay), aby se při přepnutí střihu zobrazil správný obsah
        if (dataLink) {
            $existingOverlay = $(".myoverlay[data-variant-overlay][data-variant-id=\"" + variantId + "\"][data-link=\"" + dataLink + "\"]");
        }
        if ($existingOverlay.length) {
            $existingOverlay.fadeIn(300);
            return;
        }
        var addedInfoList = shopDataLayer.productDetail.variants.addedInfo || [];
        var info = addedInfoList.find(function(item) { return String(item.id) === String(variantId); });
        var linkContent = info && info.linkContent ? info.linkContent : "";

        // Pokud je linkContent pole { type, content }: použij data-link z kliku, jinak hodnotu selectu
        if (Array.isArray(linkContent)) {
            var typeKey = dataLink || $(".detail-parameters select[data-parameter-id=\"" + variantId + "\"]").val() || "";
            var byType = linkContent.find(function(item) { return item.type === typeKey; });
            linkContent = byType && byType.content ? byType.content : (linkContent[0] && linkContent[0].content ? linkContent[0].content : "");
        }

        var $overlay = $("<div class=\"myoverlay\" data-variant-overlay></div>")
            .attr("data-variant-id", variantId)
            .css("display", "none");
        if (dataLink) $overlay.attr("data-link", dataLink);
        var $overlayWrapper = $("<div class=\"myoverlay-wrapper\"></div>");
        var $overlayInner = $("<div class=\"myoverlay-inner\"></div>");
        var $overlayClose = $("<div class=\"myoverlay-close\"></div>");
        $overlayInner.append($overlayClose).append($.parseHTML(linkContent));
        $overlayWrapper.append($overlayInner);
        $overlay.append($overlayWrapper);
        $(".overall-wrapper").append($overlay);
        $overlay.fadeIn(300);
    });

    $(document).on("click", ".myoverlay-close", function(e) {
        e.stopPropagation();
        var $overlay = $(this).closest(".myoverlay");
        if ($overlay.length) {
            $overlay.fadeOut(300);
        }
    });

    $(document).on("click", ".myoverlay-wrapper", function(e) {
        if ($(e.target).is(".myoverlay-wrapper")) {
            var $overlay = $(this).closest(".myoverlay");
            if ($overlay.length) {
                $overlay.fadeOut(300);
            }
        }
    });

    // Slick carousel souvisejících produktů: zničit a znovu nastavit na 3 viditelné slidy (po chvíli, až ho theme inicializuje)
    function reinitRelatedSlick() {
        var $related = $(".products.products-related.slick-initialized, .products.products-additional.slick-initialized");
        if (!$related.length || typeof $related.slick !== "function") return;
        $related.slick("unslick");
        $related.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous">Previous</button>',
            nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next">Next</button>',
            responsive: [
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 576, settings: { slidesToShow: 1 } }
            ]
        });
    }
    setTimeout(reinitRelatedSlick, 150);
});