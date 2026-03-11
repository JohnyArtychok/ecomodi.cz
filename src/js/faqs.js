$(document).ready(function() {
    $('.faqs-inner').on('click', '.question', function() {
        var $faq = $(this).closest('.faq');
        var $answer = $faq.find('.answer');

        $faq.toggleClass('active');
        $answer.slideToggle(300);
    });
});