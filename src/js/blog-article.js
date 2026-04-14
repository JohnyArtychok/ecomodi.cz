$(document).ready(function () {
    if (!$(".type-post").length) return;

    var $detail = $(".news-item-detail");
    var $h1 = $detail.find("h1");
    var $time = $detail.find("time");

    // Přesunout labely nad H1
    var $labels = $detail.find(".blog-labels");
    if ($labels.length && $h1.length) {
        $labels.insertBefore($h1);
    }

    // Přesunout autora k datu
    var $authorP = $detail.find(".blog-author").closest("p");
    if ($authorP.length && $time.length) {
        $time.after($authorP);
    }

    // URL blogu z breadcrumbs
    var $breadcrumbLinks = $(".breadcrumbs a, [class*='breadcrumb'] a");
    var blogUrl = "";
    $breadcrumbLinks.each(function () {
        if (/blog/i.test($(this).attr("href"))) {
            blogUrl = $(this).attr("href");
        }
    });
    if (!blogUrl) return;

    var currentPath = window.location.pathname;
    var heading = (typeof shopDataLayer !== "undefined" && shopDataLayer.blog)
        ? shopDataLayer.blog.similarArticlesHeading
        : "Podobné články";

    // Načtení článků z blog listingu
    $.get(blogUrl, function (data) {
        var $response = $($.parseHTML(data));
        var $items = $response.find(".news-item");
        var allArticles = [];

        $items.each(function () {
            var $item = $(this);
            var $link = $item.find("a.title");
            var href = $link.attr("href") || "";
            var title = $link.text().trim();

            var $desc = $item.find(".description");
            var $img = $desc.find(".blog-hero__img");
            if (!$img.length) $img = $item.find(".image img");
            var imgSrc = $img.attr("data-src") || $img.attr("src") || "";
            var perex = "";
            $desc.find(".blog-article p, p").each(function () {
                var text = $(this).text().trim();
                if (text.length > 20 && !perex) {
                    perex = text;
                }
            });

            if (perex.length > 140) {
                perex = perex.substring(0, 140).replace(/\s+\S*$/, "") + "...";
            }

            allArticles.push({
                href: href,
                title: title,
                imgSrc: imgSrc,
                perex: perex
            });
        });

        // Stránkování — donačíst názvy článků do prev/next
        var $nextPrev = $detail.find(".next-prev");
        if ($nextPrev.length) {
            var $prevLink = $nextPrev.find("a[data-testid='buttonPreviousArticle']");
            var $nextLink = $nextPrev.find("a[data-testid='buttonNextArticle']");

            // Najít názvy článků podle href
            var findTitle = function (href) {
                for (var i = 0; i < allArticles.length; i++) {
                    if (allArticles[i].href === href) return allArticles[i].title;
                }
                return "";
            };

            if ($prevLink.length) {
                var prevTitle = findTitle($prevLink.attr("href"));
                var prevLabel = $prevLink.text().trim();
                $prevLink.html(
                    "<span class='next-prev__label'>" + prevLabel + "</span>" +
                    (prevTitle ? "<span class='next-prev__title'>" + prevTitle + "</span>" : "")
                );
            }

            if ($nextLink.length) {
                var nextTitle = findTitle($nextLink.attr("href"));
                var nextLabel = $nextLink.text().trim();
                $nextLink.html(
                    "<span class='next-prev__label'>" + nextLabel + "</span>" +
                    (nextTitle ? "<span class='next-prev__title'>" + nextTitle + "</span>" : "")
                );
            }
        }

        // Podobné články — vyfiltrovat aktuální
        var articles = [];
        for (var i = 0; i < allArticles.length; i++) {
            var a = allArticles[i];
            if (a.href === currentPath || window.location.href.indexOf(a.href) !== -1) continue;
            articles.push(a);
            if (articles.length >= 3) break;
        }

        if (!articles.length) return;

        // Sestavit HTML
        var html = "<div class='blog-similar'>" +
            "<h2 class='blog-similar__heading'>" + heading + "</h2>" +
            "<div class='blog-similar__grid'>";

        for (var j = 0; j < articles.length; j++) {
            var art = articles[j];
            html += "<a class='blog-similar__card' href='" + art.href + "'>";
            if (art.imgSrc) {
                html += "<div class='blog-similar__img-wrap'>" +
                    "<img class='blog-similar__img' src='" + art.imgSrc + "' alt='" + art.title + "' loading='lazy'>" +
                "</div>";
            }
            html += "<div class='blog-similar__content'>" +
                "<h3 class='blog-similar__title'>" + art.title + "</h3>";
            if (art.perex) {
                html += "<p class='blog-similar__perex'>" + art.perex + "</p>";
            }
            html += "</div></a>";
        }

        html += "</div></div>";

        $(html).appendTo($(".type-post .content-inner"));
    }, "html");
});
