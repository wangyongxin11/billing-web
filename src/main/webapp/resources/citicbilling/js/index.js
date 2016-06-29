$(function(){
	$(".table a").click(function () {
		$('.pop-recharge').show();
	});
	$(".pop-close a").click(function () {
		$('.pop-recharge').hide();
	});
});
$(function(){
$(".rechar-title li").click(function () {
	$(".rechar-title li").each(function () {
		$(this).removeClass("active");
	});
	$(this).addClass("active");
});
$(".rechar-title li:eq(0)").click(function () {
	$('.main1').show();
	$('.main2').hide();
	$('.main3').hide();
});
$(".rechar-title li:eq(1)").click(function () {
	$('.main1').hide();
	$('.main2').show();
	$('.main3').hide();
});
$(".rechar-title li:eq(2)").click(function () {
	$('.main1').hide();
	$('.main2').hide();
	$('.main3').show();
});
});