$(function() {
	var ord = 0;
	function changeTo(ord){
	    $("#box").stop(true,false).animate({ "left" : -ord*252},1000);
	}
	$("#leftbnt").click(function(ev){
		ord=ord > 0 ? --ord:ord;
		changeTo(ord);
	})
	$("#rightbnt").click(function(ev){
		ord=ord < ($(".qiehuan").length/2)?++ord:ord;
		changeTo(ord);
	})
	
	$(".wen").find("div").first().css({
		"background": "#0A4265",
		"color": "white"
	})
	$(".wen").find("div").first().click(function() {
		$(this).css({
			"background": "#0A4265",
			"color": "white"
		})
		$(".wen").find("div").eq(1).css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$(".wen").find("div").eq(2).css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$(".wen").find("div").eq(3).css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$("#sanJ").css({
			"left": "0px"
		})
	})
	$(".wen").find("div").eq(1).click(function() {
		$(this).css({
			"background": "#0A4265",
			"color": "white"
		})
		$(".wen").find("div").first().css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$(".wen").find("div").eq(2).css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$(".wen").find("div").eq(3).css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$("#sanJ").css({
			"left": "120px"
		})
	})
	$(".wen").find("div").eq(2).click(function() {
		$(this).css({
			"background": "#0A4265",
			"color": "white"
		})
		$(".wen").find("div").first().css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$(".wen").find("div").eq(1).css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$(".wen").find("div").eq(3).css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$("#sanJ").css({
			"left": "230px"
		})
	})
	$(".wen").find("div").eq(3).click(function() {
		$(this).css({
			"background": "#0A4265",
			"color": "white"
		})
		$(".wen").find("div").first().css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$(".wen").find("div").eq(1).css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$(".wen").find("div").eq(2).css({
			"background": "#EAEFF3",
			"color": "#6990AC"
		})
		$("#sanJ").css({
			"left": "350px"
		})
	})

	//	$(".itemWen").mouseover(function(){
	//		$(this).addClass("wen");
	//		$(this).find(".sanJ").addClass("san");
	//	}).mouseleave(function(){
	//		$(this).removeClass("wen");
	//		$(this).find(".sanJ").removeClass("san");
	//	})
})
