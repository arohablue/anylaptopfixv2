jQuery(document).ready(function() {
    jQuery('#mycarousel').jcarousel();
	 jQuery('#mycarousel1').jcarousel();
});

$('#mycarousel').jcarouselAutoscroll({
    target: '+=3',
    interval: 500x,
    autostart: true
});
$('#mycarousel1').jcarouselAutoscroll({
    target: '+=3',
    interval: 1000,
    autostart: true
});
