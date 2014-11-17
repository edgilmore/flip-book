/**
 * Created by edgilmore on 11/17/2014.
 */

/*store jQuery object*/
var $mobileView = $('#mobile-view-wrapper');
/*detach stored object from DOM*/
$mobileView.detach();
/*append stored object into zoyto mobile menu */
$('#mobile-menu').append($($mobileView));


