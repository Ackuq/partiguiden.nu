var portraitScreenHeight;
var landscapeScreenHeight;

if (window.orientation === 0 || window.orientation === 180) {
    portraitScreenHeight = $(window).height();
    landscapeScreenHeight = $(window).width();
}
else {
    portraitScreenHeight = $(window).width();
    landscapeScreenHeight = $(window).height();
}

var tolerance = 25;
$(window).bind('resize', function(){
    if((window.orientation === 0 || window.orientation === 180) &&
       ((window.innerHeight + tolerance) < portraitScreenHeight)){
        // keyboard visible in portrait
    }
    else if((window.innerHeight + tolerance) < landscapeScreenHeight){
        // keyboard visible in landscape
    }
    else{
        // keyboard NOT visible
    }
});