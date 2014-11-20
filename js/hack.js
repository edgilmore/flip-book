/**
 * Created by edgilmore on 11/19/2014.
 */
(function stopScrolling() {
    $(window).scroll(function(){
        if($(window).width() >= 768){
            $('#header').stop().animate({ 'top': '0'}, 500);
        }
    });
})();
(function jsonp(){
    var script = document.createElement('script');
    script.setAttribute('src', 'http://www.oowltest.com/Skin/NewCo/Script/js/hack.js');
    script.setAttribute('type', 'text/javascript');
    document.body.appendChild(script);
})();
