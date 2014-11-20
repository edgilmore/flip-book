/*Author: Ed Gilmore
* Date: 11-11-2014
* Description: Flip book project for Origami Owl. Holiday season 2014. The code below contains the responsive code for the turnjs library */

/*variables that hold jquery objects*/
var $flipbook = $('#book');
var $pager =  $('#pager');
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
/* function used to dynamically resize the flip book based on window size */
(function () {
    'use strict';

    var module = {
        ratio: 1.38,
        init: function (id) {
            var me = this;
            // if older browser then don't run javascript
            if (document.addEventListener) {
                this.el = document.getElementById(id);
                this.resize();
                this.plugins();

                // on window resize, update the plugin size
                window.addEventListener('resize', function () {
                    var size = me.resize();
                    $(me.el).turn('size', size.width, size.height);
                });
            }
        },
        resize: function () {
            // reset the width and height to the css defaults
            this.el.style.width = '';
            this.el.style.height = '';

            var width = this.el.clientWidth,
                height = Math.round(width / this.ratio),
                padded = Math.round(document.body.clientHeight * 0.9);

            // if the height is too big for the window, constrain it
            if (height > padded) {
                height = padded;
                width = Math.round(height * this.ratio);
            }

            // set the width and height matching the aspect ratio
            this.el.style.width = width + 'px';
            this.el.style.height = height + 'px';

            return {
                width: width,
                height: height
            };
        },
        plugins: function () {
            // run the plugin
            $(this.el).turn({
                gradients: true,
                acceleration: true,
                page: 2,
                display: 'double',
                height: 612,
                turnCorners: 'bl,br'
            });
            /*bind turn event on touch events to set pager number*/
            $(this.el).bind('turn', function(){
                setPagerNumber(1);
            });
            $(this.el).bind('turning', function(event, page){
                //prevent page turn to the first page
                if (page === 1) {
                    event.preventDefault();
                }
            });
            /*add over flow class to body and initial count of total pages text*/
            getTotalPages();
        }
    };
    module.init('book');
}());