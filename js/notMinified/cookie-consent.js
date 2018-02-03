    //Check if user has accepted cookies
    if (document.cookie.indexOf("consent=true") == -1) {
        jQuery(function ($) {
            $('#cookie-banner').slideToggle();
        });
    }
    //Enable Analytics
    function gaOpt() {
        jQuery(function ($) {
            $('#cookie-banner').slideToggle();
        });
        document.cookie = "consent=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    }
    function closeBanner(){
        jQuery(function ($) {
            $('#cookie-banner').slideToggle();
        });
    }
