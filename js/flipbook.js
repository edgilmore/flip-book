/*variables that hold jquery objects*/
var $flipbook = $('#flipbook');
var $pager =  $('#pager');
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
/**
 * This initializes the $flipbook. You will need to set the width and height based
 * on the sizes of your images.
 */
$flipbook.turn({
    display: 'double',
    autoCenter: true,
    acceleration: true,
    height: 506,
    width: 800
}).turn('disable', true);
/* click handlers for buttons
 * next page
 */
$('#next').click(function () {
    $flipbook.turn('disable', false).turn('next').turn('disable', true);
    setPagerNumber();
});
/*previous page*/
$('#previous').click(function() {
    $flipbook.turn('disable', false).turn('previous').turn('disable', true);
    setPagerNumber();
    /*hack to hide $pager on flip back to first page - EWG*/
    if($flipbook.turn('page') === 1){
        $pager.hide();
    }
});