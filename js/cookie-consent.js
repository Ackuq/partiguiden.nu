    var gaProperty = 'UA-111642551-1';
    
    var disableStr = 'ga-disable-' + gaProperty;

    //Check if user has accepted cookies
    if(document.cookie.indexOf("consent=true") == -1){
        jQuery(function($) {
            $('#cookie-banner').slideToggle();
        });
        window[disableStr] = true;
    }
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gaProperty);

    //Enable Analytics
    function gaOpt(){
        jQuery(function($) {
            $('#cookie-banner').slideToggle();
        });
        document.cookie = "consent=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    }