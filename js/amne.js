var menu = $(".siteNav");
var isMobile = window.matchMedia("only screen and (max-width: 767px)");
$(document).ready(function () {
    //init scrolling event heandler
    if (isMobile.matches) {
        $(document).scroll(function () {
            //when rich top of boxex than fire
            if ($(window).height() + $(document).scrollTop() < $("#footer").offset().top) {
                $(menu).fadeIn(200);
            } else {
                $(menu).fadeOut(200);
            }
        })
    }
    $(document).scroll(function () {
        if ($(document).scrollTop() > $(window).height()) {
            $("#scrollUp").fadeIn(200);
        } else {
            $("#scrollUp").fadeOut(200);
        }
    })
});

$("#scrollUp").click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
    return false;
});

$(".partititle").click(function () {
    $(this).parent(".asikt").children('.slidetoggle').stop().slideToggle($(this).parent(".asikt").find(".opinion_box").length * 100, "linear");
})

$(".partiBox").click(function () {
    var href = $(this).attr('href');
    $(href).children('.slidetoggle').stop().slideToggle($(href).find(".opinion_box").length * 100, "linear");
})
