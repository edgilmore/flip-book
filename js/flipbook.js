/*Author: Ed Gilmore
* Date: 11-11-2014
* Description: Flip book project for Origami Owl. Holiday season 2014. The code below contains the responsive code for the turnjs library */

/*variables that hold jquery objects*/
var $flipbook = $('#book');
var $pager =  $('#pager');
var ga = ga || [];

/*function to call on page scroll to reset page size and disable Zoyto scroll hacks@!!@@@!!!*/
function stopScrollingMenu(){
    var $fadeNav = $('nav.fadeout');
    var $header = $('#header');
    $('.page').stop().animate({ 'top': '0' }, 500);
    $header.stop().animate({ 'top': '0'}, 500);
    $fadeNav.stop().removeClass('fadeout');
    /*setTimeout(function()
        {
            //$header.removeAttr('id');
        }, 500);*/
}
/*function to set page number text below flip book*/
function setPagerNumber(pageNumber) {
    if($flipbook.turn('page') > pageNumber) {
        $('#page-number-one').text(Math.floor($flipbook.turn('page') / 2 ));
        $pager.show();
    }
    else {
        $pager.hide();
    }
}
/*function to set page number text for count of total pages*/
function getTotalPages(){
    $('#page-number-two').text(Math.floor($flipbook.turn('pages') / 2));
}
/* click handlers for buttons
 * next page
 */
$('#next').click(function () {
    $flipbook.turn('next');
    setPagerNumber(0);
    /*return false to avoid post back click handler*/
    return false;
});
//previous page
$('#previous').click(function() {
    $flipbook.turn('previous');
    setPagerNumber(1);
    /*return false to avoid post back on click handler*/
    return false;
});
/*function to collecting information about which page */
$(document).ready(function () {
    $('.book-page a').click(function () {
        var match = $(this).attr('href');
        ga('send', 'pageview', location.pathname + match);
    });
    /*flipbook instantiation*/
    // run the plugin
    $($flipbook).turn({
        gradients: true,
        acceleration: true,
        page: 2,
        display: 'double',
        height: 602,
        width: 800
    });
    /*bind turn event on touch events to set pager number*/
    $($flipbook).bind('turn', function(){
        setPagerNumber(1);
    });
    $($flipbook).bind('turning', function(event, page, pageObject){
        //prevent page turn to the first page
        if (page === 1) {
            event.preventDefault();
        }
        /*log page turns to google analytics*/
        ga('send', 'event', 'FlipBook', 'Page Turn', 'Page', page);
    });
    /*add over flow class to body and initial count of total pages text*/
    getTotalPages();
});

/*HACKS!!! -EWG*/
$(document).ready(function(){
    stopScrollingMenu();
    $(window).scroll(function(){
        stopScrollingMenu();
        /*hack to show nav after Zoyto tries to hide it*/
        setTimeout(function(){
            stopScrollingMenu();
        }, 125);
    });
});