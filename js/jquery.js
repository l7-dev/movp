  $(function () {
		$('div[class^="m-con"]').hide();
		$('.m-con1').show();
		$('#accordion-m1').next('div').hide();
		$('#accordion-m2').next('div').hide();
		
		/*아코디언 플러그인 옵션*/
  	/*var icons = {
  		header: "ui-icon-circle-arrow-e",
  		activeHeader: "ui-icon-circle-arrow-s"
  	};
  	$("#accordion").accordion({
  		heightStyle: "content",
  		icons: icons,
  		collapsible: true,
  		active: false,
  		animate: 0
  	});
  	$("#toggle").button().on("click", function () {
  		if ($("#accordion").accordion("option", "icons")) {
  			$("#accordion").accordion("option", "icons", null);
  		} else {
  			$("#accordion").accordion("option", "icons", icons);
  		}
  	});*/
		/*아코디언 종료*/
		
		/*nav 아코디언*/
		$('#accordion-m1').on('click', function(){
			$('#accordion-m2').next('div').hide();
			$('#accordion-m2').find('span i').removeClass().addClass('xi-caret-down-square-o');
			$(this).next('div').slideToggle(100);
			$(this).find('span i').toggleClass('xi-caret-down-square-o xi-caret-up-square-o');
		});
		
		$('#accordion-m2').on('click', function(){
			$('#accordion-m1').next('div').hide();
			$('#accordion-m1').find('span i').removeClass().addClass('xi-caret-down-square-o');
			$(this).next('div').slideToggle(100);
			$(this).find('span i').toggleClass('xi-caret-down-square-o xi-caret-up-square-o');
		});
		
		
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
		
		
	/*PWA 시작*/
	var deferredPrompt;
	var btnSave = document.getElementById('btn-save');
	btnSave.style.display = 'none';

	window.addEventListener('beforeinstallprompt', function (e) {
		console.log('beforeinstallprompt Event fired');
		e.preventDefault();

		// Stash the event so it can be triggered later. 
		deferredPrompt = e;
		btnSave.style.display = 'block';
		return false;
	});

	// 특정 버튼 클릭 시 설치 시작 
	btnSave.addEventListener('click', function () {
		if (deferredPrompt !== undefined) {
			// The user has had a postive interaction with our app and Chrome 
			// has tried to prompt previously, so let's show the prompt. 
			deferredPrompt.prompt();
			// Follow what the user has done with the prompt. 
			deferredPrompt.userChoice.then(function (choiceResult) {
				console.log(choiceResult.outcome);
				if (choiceResult.outcome == 'dismissed') {
					console.log('User cancelled home screen install');
				} else {
					console.log('User added to home screen');
					btnSave.style.display = 'none';
				}
				// We no longer need the prompt. Clear it up. 
				deferredPrompt = null;
			});
		}
	});
	/*PWA 종료*/

  });
