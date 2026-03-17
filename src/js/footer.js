$(document).ready(function() {
    if($(".custom-footer__newsletter").length){
        $(".custom-footer__newsletter .newsletter-header h3").html(shopDataLayer.footer.newsletter.title);
        $("<div class='newsletter-subtitle'>" + shopDataLayer.footer.newsletter.subtitle + "</div>").insertAfter(".custom-footer__newsletter .newsletter-header h3");
        $(".custom-footer__newsletter input[type='email']").attr("placeholder", shopDataLayer.footer.newsletter.placeholder);
    }
});