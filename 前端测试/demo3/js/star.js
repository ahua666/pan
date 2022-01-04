$(document).ready(function() {
		var length,
			currentIndex = 0,
			interval,
			hasStarted = false, //是否已经开始轮播
			t = 3000; //轮播时间间隔
		length = $('.slider-panel').length;
		//将除了第一张图片隐藏
		$('.slider-panel:not(:first)').hide();
		//将第一个slider-item设为激活状态
		$('.slider-item:first').addClass('slider-item-selected');
		//鼠标上悬时停止滑动鼠标离开时开始滑动
		$('.slider-panel').hover(function() {
			stop();
		}, function() {
			start();
		});
		$('.slider-item').hover(function(e) {
			stop();
			var preIndex = $(".slider-item").filter(".slider-item-selected").index();
			currentIndex = $(this).index();
			play(preIndex, currentIndex);
		}, function() {
			start();
		});
		/**
		 * 向前翻页
		 */
		function pre() {
			var preIndex = currentIndex;
			currentIndex = (--currentIndex + length) % length;
			play(preIndex, currentIndex);
		}
		/**
		 * 向后翻页
		 */
		function next() {
			var preIndex = currentIndex;
			currentIndex = ++currentIndex % length;
			play(preIndex, currentIndex);
		}
		/**
		 * 从preIndex页翻到currentIndex页
		 * preIndex 整数，翻页的起始页
		 * currentIndex 整数，翻到的那页
		 */
		function play(preIndex, currentIndex) {
			$('.slider-panel').eq(preIndex).fadeOut(500)
				.parent().children().eq(currentIndex).fadeIn(1000);
			$('.slider-item').removeClass('slider-item-selected');
			$('.slider-item').eq(currentIndex).addClass('slider-item-selected');
		}
		
		/**
		 * 开始轮播
		 */
		function start() {
			if(!hasStarted) {
				hasStarted = true;
				interval = setInterval(next, t);
			}
		}
		/**
		 * 停止轮播
		 */
		function stop() {
			clearInterval(interval);
			hasStarted = false;
		}
		
		//开始轮播
		start();
	});