/*variables that hold jquery objects*/
var $flipbook = $('#book');
var $pager =  $('#pager');
/*function to set page number text below flip book*/
function setPagerNumber() {
    if($flipbook.turn('page') > 0) {
        console.log($flipbook.turn('page') /2 );
        $('#pageNumber').text(Math.floor($flipbook.turn('page') / 2 ));
        $pager.show();
    }
    else {
        $pager.hide();
    }
}
/* click handlers for buttons
 * next page
 */
$('#next').click(function () {
    $flipbook.turn('disable', false).turn('next').turn('disable', true);
    setPagerNumber();
});
//previous page
$('#previous').click(function() {
    $flipbook.turn('disable', false).turn('previous').turn('disable', true);
    setPagerNumber();
    /*hack to hide $pager on flip back to first page - EWG*/
    if($flipbook.turn('page') === 1){
        $pager.hide();
    }
});
/* function used to dynamically resize the flip book based on window size */
(function () {
    'use strict';

    var module = {
        ratio: 1.0,
        init: function (id) {
            var me = this;
            // if older browser then don't run javascript
            if (document.addEventListener) {
                this.el = document.getElementById(id);
                this.resize();
                this.plugins();

                // on window resize, update the plugin size
                window.addEventListener('resize', function (e) {
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
                autoCenter: true
            }).turn('disabled', true);
            // hide the body overflow
            document.body.className = 'hide-overflow';
        }
    };

    module.init('book');
}());