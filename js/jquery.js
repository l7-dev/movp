  $(function () {
		$('div[class^="m-con"]').hide();
		$('.m-con1').show();
		
		/*아코디언 플러그인 옵션*/
  	var icons = {
  		header: "ui-icon-circle-arrow-e",
  		activeHeader: "ui-icon-circle-arrow-s"
  	};
  	$("#accordion").accordion({
  		heightStyle: "content",
  		icons: icons,
  		collapsible: true,
  		active: false,
  		animate: 200
  	});
  	$("#toggle").button().on("click", function () {
  		if ($("#accordion").accordion("option", "icons")) {
  			$("#accordion").accordion("option", "icons", null);
  		} else {
  			$("#accordion").accordion("option", "icons", icons);
  		}
  	});
		/*아코디언 종료*/
		
		/*메뉴 버튼*/
		$('#menu-open-btn').on('click', function(){
			$('nav').addClass('on');
		});
		/*메뉴 버튼 종료*/
		
		/*클로즈 버튼*/
		$('#menu-close-btn').on('click', function(){
			$('nav').removeClass('on');
		});
		/*클로즈 버튼 종료*/

		/*m-con show & hide*/
		var $boxObtn1 = $('#boxoffice1'),
				$boxObtn2 = $('#boxoffice2'),
		 		$boxObtn3 = $('#boxoffice3');
		$boxObtn1.on('click', function(){
			$('nav').removeClass('on');
			$('div[class^="m-con"]').hide();
			$('.m-con1').show();
		});
		$boxObtn2.on('click', function(){
			$('nav').removeClass('on');
			$('div[class^="m-con"]').hide();
			$('.m-con2').show();
		});
		$boxObtn3.on('click', function(){
			$('nav').removeClass('on');
			$('div[class^="m-con"]').hide();
			$('.m-con3').show();
		});
		
		/*movie-show-close버튼*/
		$('.movie-show-close').on('click', function(){
      $('.movie-show-desc').html('<i class="xi-spinner-1 xi-spin"></i> 검색중...');
			$('.movie-show').hide();
		});
		
		/*맨위로 올리기 버튼*/
		$( '#top-btn' ).on('click', function() {
			$( 'html, body' ).animate( { scrollTop : 0 }, 300 );
		return false;
		} );
		
  });
