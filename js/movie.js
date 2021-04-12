$(function () {
	

	/*3자리 콤마*/
	function comma(numb) {
		var money = numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return money;
	}
	
	/*시간에 따라 자동으로 변경 시키기*/
	var now = new Date(),
				hr = now.getHours(),
				opennerArray = ['f748e00070e724795fca73adc0ff1469', 'e066de385a0b1ee87007f0f2be3e48de', '2f06ac47d726c1473e60b2b268a60f08', 'f6e709eab6373466ce4d51c6c7bdbeba', 'b429e2d23c366b3975e6a2385769a92a', '4c38f04fc677ecdaaa04b3cfa5b6e00a'],
				openner = '';
	if(hr >= 0 && hr < 9) {
				openner = opennerArray[0];
	} else if(hr >= 9 && hr < 12) {
				openner = opennerArray[1];			
	} else if(hr >= 12 && hr < 15) {
				openner = opennerArray[2];
	} else if(hr >= 15 && hr < 18) {
				openner = opennerArray[3];		
	} else if(hr >= 18 && hr < 21) {
				openner = opennerArray[4];
	}else {
				openner = opennerArray[5];
	}
	
	/*오늘날짜 표시*/
	var mydate = new Date();
	var year = mydate.getYear();

	if (year < 1000) {
		year += 1900;
	}

	var day = mydate.getDay();
	var month = mydate.getMonth();
	var daym = mydate.getDate();


	var dayarray = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일");
	var montharray = new Array("1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월");

	var selectedDayOfMonth = mydate.getDate();
	var first = new Date(mydate.getFullYear() + '/' + (mydate.getMonth() + 1) + '/01');
	var monthFirstDateDay = first.getDay();
	var todayResult = Math.ceil((selectedDayOfMonth + monthFirstDateDay) / 7);

	var $tResult = $('.today-result');
	$tResult.html(year + '년 ' + montharray[month] + ' ' + daym + '일 ' + dayarray[day] + '<br>');
	/*오늘날짜 표시 - 종료*/

		/*마지막 수요일 표시*/
		var today = new Date(),
		lastDay = new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			0).getDate(), //이번달의 마지막 날
		thisYear = today.getFullYear(),
		thisMonth = today.getMonth() + 1,
		thisDate = new Date(),
		thisDay = new Date(),
		dNum = 1;

	for (dNum = 1; dNum <= lastDay; dNum++) {
		thisDate = new Date(thisYear + '-' + thisMonth + '-' + dNum);
		thisDay = thisDate.getDay();
		if (thisDay == 3) {
			$('.ct-day').find('span').html(montharray[month] + ' ' + dNum + '일 ' + '수요일');
		}
	}
	/*마지막 수요일 표시 종료*/

	/*실시간 박스 오피스*/
	function dailyrank() {
		$('.rbox1-top').html('<i class="xi-spinner-1 xi-spin"></i> 검색중...');
		var url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key='+openner+'&targetDt=';
		
    url += maxYesdaystring.replace(/-/g, '');

    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function (item) {
				$('.rbox1-top').html('');
        $.each(item.boxOfficeResult.dailyBoxOfficeList, function (i, content) {
          var rankNum = content.rank;
					var str = "";
          var rankInten = parseInt(content.rankInten);
          if (rankInten > 0) str += "&uarr;"; //상승
          else if (rankInten < 0) str += "&darr;"; //하락
          else str = str + "&bull;";
          str += rankInten; //상승하락폭
          var movieCd = content.movieCd;
					var attrMovieCd = "show(" + content.movieCd + ")";
          $(".rbox1-bottom").next().find(".rbox-a").attr("onclick", attrMovieCd);
          $(".rbox1-bottom").next().find(".rbox-rank-p").html(content.rank);
          $(".rbox1-bottom").next().find(".rbox-title").html(content.movieNm);
          $(".rbox1-bottom").next().find(".rbox-date-span").html(content.openDt);
          $(".rbox1-bottom").next().find(".rbox-num-span").html(comma(content.audiAcc));
          $(".rbox1-bottom").next().find(".rbox-rank-gap").html(str);
					if (i < 9) {
					var $rankClone = $(".rbox1-bottom").next().clone();
					$(".rbox1-top").append($rankClone);
					}
        });
      }
    });
	};
	/*실시간 박스 오피스 종료*/

	/*일별 박스 오피스*/
	function selDrank(sdate) {
		$('.m-con2 .rbox').hide();
		$('.rbox2-top').html('<i class="xi-spinner-1 xi-spin"></i> 검색중...');

		var url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key='+openner+'&targetDt='+sdate;

    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function (item) {
				$('.rbox2-top').html('');
				$('.m-con2 .rbox').show();
        $.each(item.boxOfficeResult.dailyBoxOfficeList, function (i, content) {
          var rankNum = content.rank;
					var str = "";
          var rankInten = parseInt(content.rankInten);
          if (rankInten > 0) str += "&uarr;"; //상승
          else if (rankInten < 0) str += "&darr;"; //하락
          else str = str + "&bull;";
          str += rankInten; //상승하락폭
          var movieCd = content.movieCd;
					var attrMovieCd = "show(" + content.movieCd + ")";
          $(".rbox2-bottom").next().find(".rbox-a").attr("onclick", attrMovieCd);
          $(".rbox2-bottom").next().find(".rbox-rank-p").html(content.rank);
          $(".rbox2-bottom").next().find(".rbox-title").html(content.movieNm);
          $(".rbox2-bottom").next().find(".rbox-date-span").html(content.openDt);
          $(".rbox2-bottom").next().find(".rbox-num-span").html(comma(content.audiAcc));
          $(".rbox2-bottom").next().find(".rbox-rank-gap").html(str);
					if (i < 9) {
					var $rankClone = $(".rbox2-bottom").next().clone();
					$(".rbox2-top").append($rankClone);
					}
        });
      }
    });
		};
	/*일별 박스 오피스 종료*/
	
	/*주간 박스 오피스*/
		function selWrank(sdate) {
			$('.m-con3 .rank-list').show();
			$('.m-con3 .cont3-desc').hide();
			$('.m-con3 .rbox').hide();
						
			$('.rbox3-top').html('<i class="xi-spinner-1 xi-spin"></i> 검색중...');
			var url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key='+openner+'&targetDt='+sdate+'&weekGb=0';
    	$.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function (item) {
				$('.rbox3-top').html('');
				$('.m-con3 .rbox').show();
        $.each(item.boxOfficeResult.weeklyBoxOfficeList, function (i, content) {
          var rankNum = content.rank;
					var str = "";
          var rankInten = parseInt(content.rankInten);
          if (rankInten > 0) str += "&uarr;"; //상승
          else if (rankInten < 0) str += "&darr;"; //하락
          else str = str + "&bull;";
          str += rankInten; //상승하락폭
          var movieCd = content.movieCd;
					var attrMovieCd = "show(" + content.movieCd + ")";
          $(".rbox3-bottom").next().find(".rbox-a").attr("onclick", attrMovieCd);
          $(".rbox3-bottom").next().find(".rbox-rank-p").html(content.rank);
          $(".rbox3-bottom").next().find(".rbox-title").html(content.movieNm);
          $(".rbox3-bottom").next().find(".rbox-date-span").html(content.openDt);
          $(".rbox3-bottom").next().find(".rbox-num-span").html(comma(content.audiAcc));
          $(".rbox3-bottom").next().find(".rbox-rank-gap").html(str);
					if (i < 9) {
					var $rankClone = $(".rbox3-bottom").next().clone();
					$(".rbox3-top").append($rankClone);
					}
        });
      }
    });
		};
	/*주간 박스 오피스 종료*/
	
	/*show() : 영화 선택시 상세정보*/
window.show = function(movieCd) {
	$( 'html, body' ).animate( { scrollTop : 0 }, 300 );
	$('.movie-show').show();
  var url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key='+openner+'&movieCd=';
  url += movieCd;
	$('.movie-show-desc').html('<i class="xi-spinner-1 xi-spin"></i> 검색중...');
  $.ajax({
    url: url,
    dataType: 'json',
    success: function (item) {
      var str = "";
      var movieInfo = item.movieInfoResult.movieInfo;
      var movieNm = movieInfo.movieNm;
      var movieNmEn = movieInfo.movieNmEn;
      var movieGnr = movieInfo.genres[0].genreNm;
			var showTm = movieInfo.showTm;
			var movieType = movieInfo.typeNm;
			var movieYear = movieInfo.prdtYear;
			var movieOpen = movieInfo.openDt;
			var movieNation = movieInfo.nations[0].nationNm;
			if (movieInfo.directors.length > 0) {
				var director = movieInfo.directors[0].peopleNm;
			} else {var director = '--'}
      var people = "";
      var length = movieInfo.actors.length;
			var kakaoQuery = movieNm + movieYear;
			var weburl = 'https://linkman.herokuapp.com/https://m.search.daum.net/search?w=tot&nil_mtopsearch=btn&DA=YZR&q=' + kakaoQuery;

			$.ajax({
				url: weburl,
      	dataType: 'html',
          }).done(function (html1) {
						var mImg = $("div.movie_info img.thumb_img", html1); //썸네일
						var mStory = $("div.movie_story a", html1); //줄거리
						var mData = $(".dl_comp.dl_link", html1); //기타 데이터
						var mCount = new Array();
						var movieIurl = 'https://www.boxoffice.kro.kr/img/poster130.jpg';
						var movieStory = new Array();
						var movieCount = "";
				
            if (mImg.length != 0 && mStory.length != 0 && mData.length != 0 ) {
              $('.result-data-1').html(mImg[0]);
							$('.result-data-2').html(mStory[0].innerHTML);
							$('.result-data-3').html(mData);
							 goDetail();	
							} else {
              console.log('이미지가 없습니다.');
							$.each(movieInfo.actors, function (i, content) {
        				if (i == length - 1) {
										people += content.peopleNm;
									} else {
										people += content.peopleNm + ", ";
									}
      					});
									str += '<div class="movie-poster"><img src="' + movieIurl + '"></div>';
      						str += '<ul><li>' + movieNm + '</li>';
      						str += '<li>' + movieNmEn + '</li>';
      						str += '<li><b>영화장르</b> - ' + movieGnr + '</li>';
      						str += '<li><b>상영시간</b> - ' + showTm + '분</li>';
									str += '<li><b>영화유형</b> - ' + movieType + '</li>';
      						str += '<li><b>제작년도</b> - ' + movieYear + '년</li>';
      						str += '<li><b>개봉날짜</b> - ' + movieOpen.substring(0, 4) + '년 ' + movieOpen.substring(4, 6) + '월 ' + movieOpen.substring(6, 8) + '일' + '</li>';
      						str += '<li><b>제작국가</b> - ' + movieNation + '</li>';
      						str += '<li><b>영화감독</b> - ' + director + '</li>';
      						str += '<li><b>출연배우</b> - ' + people + '</li>';
									str += '<li class="movie-link"><a href="https://movie.daum.net/search?q='+ movieNm +'#tab=movie" target="_blank"><span>DAUM영화에서 상세검색 <i class="xi-touch"></i></span></a></li></ul>';
      						$('.movie-show-desc').html(str);	
            	}
									
						function goDetail() {
							movieIurl = $(document).find('.result-data-1').find('img').attr('data-original-src');

              movieStory = $(document).find('.result-data-2');
													
							mCount = $(document).find('.result-data-3').children('dl:nth-child(3)').find('span');

              if (mCount.length > 0) {movieCount = mCount[0].innerText;} else {movieCount = '--'}
							
							$.each(movieInfo.actors, function (i, content) {
        				if (i == length - 1) {
										people += content.peopleNm;
									} else {
										people += content.peopleNm + ", ";
									}
      					});
									str += '<div class="movie-poster"><img src="' + movieIurl + '"></div>';
      						str += '<ul><li>' + movieNm + '</li>';
      						str += '<li>' + movieNmEn + '</li>';
									str += '<li><b>누적관객</b> - ' + movieCount + ' (하루전기준)</li>';
      						str += '<li><b>영화장르</b> - ' + movieGnr + '</li>';
      						str += '<li><b>상영시간</b> - ' + showTm + '분</li>';
									str += '<li><b>영화유형</b> - ' + movieType + '</li>';
      						str += '<li><b>제작년도</b> - ' + movieYear + '년</li>';
                  str += '<li><b>개봉날짜</b> - ' + movieOpen.substring(0, 4) + '년 ' + movieOpen.substring(4, 6) + '월 ' + movieOpen.substring(6, 8) + '일' + '</li>';
      						str += '<li><b>제작국가</b> - ' + movieNation + '</li>';
      						str += '<li><b>영화감독</b> - ' + director + '</li>';
      						str += '<li><b>출연배우</b> - ' + people + '</li>';
									str += '<li><b>줄거리</b> - ' + movieStory[0].innerHTML + '</li>';
									str += '<li class="movie-link"><a href="https://movie.daum.net/search?q='+ movieNm +'#tab=movie" target="_blank"><span>DAUM영화에서 상세검색 <i class="xi-touch"></i></span></a></li></ul>';
      						$('.movie-show-desc').html(str);
						};	

          }); //.ajax종료
    }
  });
};
	/*show() 종료*/

	/*datepicker1과2에 어제날짜가 default*/
		var maxYesday = new Date();
		maxYesday.setDate(maxYesday.getDate() - 1);
		var maxYesdayyear = maxYesday.getFullYear();
  	var maxYesdaymonth = maxYesday.getMonth() + 1; //월 시작 0부터
	  if (maxYesdaymonth < 10) {maxYesdaymonth = "0" + maxYesdaymonth};
		var maxYesdaydate = maxYesday.getDate();
  	if (maxYesdaydate < 10) {maxYesdaydate = "0" + maxYesdaydate};
		var maxYesdaystring = maxYesdayyear + '-' + maxYesdaymonth + '-' + maxYesdaydate;
	
		var maxYesday2 = new Date();
		maxYesday2.setDate(maxYesday2.getDate() - 7);
		var maxYesdayyear2 = maxYesday2.getFullYear();
  	var maxYesdaymonth2 = maxYesday2.getMonth() + 1; //월 시작 0부터
	  if (maxYesdaymonth2 < 10) {maxYesdaymonth2 = "0" + maxYesdaymonth2};
		var maxYesdaydate2 = maxYesday2.getDate();
  	if (maxYesdaydate2 < 10) {maxYesdaydate2 = "0" + maxYesdaydate2};
		var maxYesdaystring2 = maxYesdayyear2 + '-' + maxYesdaymonth2 + '-' + maxYesdaydate2;
	
	
		$('#datepicker1').val(maxYesdaystring);
		$('#datepicker2').val(maxYesdaystring2);
//		document.getElementById('datepicker2').valueAsDate = maxYesday;

		/*datepicker1과2에 최소 선택날짜와 최대 선택날짜 설정*/
		$('#datepicker1').attr({  
   		"min" : '2003-12-1',  
			"max" : maxYesdaystring
			});  
	
		$('#datepicker2').attr({  
   		"min" : '2003-12-1',  
			"max" : maxYesdaystring2
		});  

		
		/*일별 박스오피스 날짜 선택*/
		$('#sel-date-bt1').on('click', function(){
		var selectDate1 = $( "#datepicker1" ).val().replace(/-/g, '');
			selDrank(selectDate1);
		});
		
		/*주간 박스오피스 날짜 선택*/
		$('#sel-date-bt2').on('click', function(){
		var selectDate2 = $( "#datepicker2" ).val().replace(/-/g, '');
			selWrank(selectDate2);
		});
	
	/*첫번째 실행*/
	goFirst();
	function goFirst(){
		$('.m-con1 .rbox').hide();
		var url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key='+openner+'&targetDt=';
		
    url += maxYesdaystring.replace(/-/g, '');

    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function (item) {
				$('.rbox1-top').html('');
				$('.m-con1 .rbox').show();
        $.each(item.boxOfficeResult.dailyBoxOfficeList, function (i, content) {
          var rankNum = content.rank;
					var str = "";
          var rankInten = parseInt(content.rankInten);
          if (rankInten > 0) str += "&uarr;"; //상승
          else if (rankInten < 0) str += "&darr;"; //하락
          else str = str + "&bull;";
          str += rankInten; //상승하락폭
          var movieCd = content.movieCd;
					var attrMovieCd = "show(" + content.movieCd + ")";
          $(".rbox1-bottom").next().find(".rbox-a").attr("onclick", attrMovieCd);
          $(".rbox1-bottom").next().find(".rbox-rank-p").html(content.rank);
          $(".rbox1-bottom").next().find(".rbox-title").html(content.movieNm);
          $(".rbox1-bottom").next().find(".rbox-date-span").html(content.openDt);
          $(".rbox1-bottom").next().find(".rbox-num-span").html(comma(content.audiAcc));
          $(".rbox1-bottom").next().find(".rbox-rank-gap").html(str);
					if (i < 9) {
					var $rankClone1 = $(".rbox1-bottom").next().clone();
					$(".rbox1-top").append($rankClone1);
					}
					/*2번째 일별*/
					$(".rbox2-bottom").next().find(".rbox-a").attr("onclick", attrMovieCd);
          $(".rbox2-bottom").next().find(".rbox-rank-p").html(content.rank);
          $(".rbox2-bottom").next().find(".rbox-title").html(content.movieNm);
          $(".rbox2-bottom").next().find(".rbox-date-span").html(content.openDt);
          $(".rbox2-bottom").next().find(".rbox-num-span").html(comma(content.audiAcc));
          $(".rbox2-bottom").next().find(".rbox-rank-gap").html(str);
					if (i < 9) {
					var $rankClone2 = $(".rbox2-bottom").next().clone();
					$(".rbox2-top").append($rankClone2);
					}
					/*3번째 주간은 함수 실행으로*/
        });
      }
    });
		/*selWrank(maxYesdaystring.replace(/-/gi, ''));*/
		$('.m-con3 .rank-list').hide();
	};
	
	/*영화제목으로 검색*/
	function searchSubmit(){
		var sItxt = $('#search-bar-input').val();
		$('#search-bar-input').val('');
		$('#search-bar-btn').focus();
			$('.s-text > span').html(sItxt);
			$('div[class^="m-con"]').hide();
			$('.m-con4').show();
			$('.s-top').html('<i class="xi-spinner-1 xi-spin"></i> 검색중...');
			var url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key='+openner+'&itemPerPage=20&movieNm='+sItxt;
			$.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function (item) {
				$('.m-con4 .sbox').show();
				$('.s-top').html('');
				var mLenth = item.movieListResult.movieList.length;
        $.each(item.movieListResult.movieList, function (i, content) {
					var yyyy = content.openDt.substr(0,4),
							mm = content.openDt.substr(4,2),
							dd = content.openDt.substr(6,2);
					var pdNm = "--";
					if (content.directors.length > 0) {pdNm = content.directors[0].peopleNm;}
          var movieNm = content.movieNm;
					var str = "";
     			var movieNmEn = content.movieNmEn;
      		var movieGnr = content.repGenreNm;
					var movieType = content.typeNm;
					var movieYear = content.prdtYear;
					var movieNation = content.repNationNm;
					var movieStat = content.prdtStatNm;
					var tUrl = "https://www.boxoffice.kro.kr/img/poster130.jpg";
          $(".s-bottom").next().find(".sbox-title").html(movieNm);
          $(".s-bottom").next().find(".sbox-date-span").html(yyyy+'-'+mm+'-'+dd);
          $(".s-bottom").next().find(".sbox-pd-span").html(pdNm);
										
									str += '<div class="movie-poster"><img src="' + tUrl + '"></div>';
      						str += '<ul><li class="searchMname">' + movieNm + '</li>';
      						str += '<li>' + movieNmEn + '</li>';
                  str += '<li><b>누적관객</b> - <span class="searchMcount">--</span> (하루전기준)</li>';
					      	str += '<li><b>영화감독</b> - ' + pdNm + '</li>';
					      	str += '<li><b>제작년도</b> - <span  class="searchMyear">' + movieYear + '</span>년</li>';
      						str += '<li><b>개봉날짜</b> - ' + yyyy+'년 '+mm+'월 '+dd + '일</li>';
      						str += '<li><b>제작국가</b> - ' + movieNation + '</li>';
      						str += '<li><b>영화장르</b> - ' + movieGnr + '</li>';
									str += '<li><b>영화유형</b> - ' + movieType + '</li>';
      						str += '<li><b>제작상태</b> - ' + movieStat + '</li>';
                  str += '<li><b>출연배우</b> - <span class="searchMactor">--</span> </li>';
                  str += '<li><b>줄거리</b> - <span class="searchMstory">--</span> </li>';
									str += '<li class="movie-link"><a href="https://movie.daum.net/search?q='+ movieNm +'#tab=movie" target="_blank"><span>DAUM영화에서 상세검색 <i class="xi-touch"></i></span></a></li></ul>';
      						$('.s-bottom').next().find('.sbox-desc').html(str);
									if (i < mLenth-1) {
										var $serClone = $(".s-bottom").next().clone();
										$(".s-top").append($serClone);
									}
        });
      }
    });
	};

		/*m-con4 sbox*/
		$(document).on('click', '.sbox', function(){
      $( 'html, body' ).animate( { scrollTop : 0 }, 300 );
      $('.movie-show').show();
      $(this).find('.sbox-desc').addClass('searchOn');
      var kakaoQuery =  $(this).find('.sbox-desc .searchMname').text() +  $(this).find('.sbox-desc .searchMyear').text();
			var weburl = 'https://linkman.herokuapp.com/https://m.search.daum.net/search?w=tot&nil_mtopsearch=btn&DA=YZR&q=' + kakaoQuery;

			$.ajax({
				url: weburl,
      	dataType: 'html',
          }).done(function (html1) {
						var mImg = $("div.movie_info img.thumb_img", html1); //썸네일
						var mStory = $("div.movie_story a", html1); //줄거리
						var mData = $(".dl_comp.dl_link", html1); //기타 데이터
						var mCount = new Array();
						var movieIurl = 'https://www.boxoffice.kro.kr/img/poster130.jpg';
						var movieStory;
						var movieCount = "";
            var mActor = new Array();
            var movieActor = "";
				
							if (mImg.length != 0 && mStory.length != 0 && mData.length != 0 ) {
                $('.result-data-1').html(mImg[0]);
						  	$('.result-data-2').html(mStory[0].innerHTML);
						  	$('.result-data-3').html(mData);
							 goDetail();	
							} else {
              console.log('이미지가 없습니다.');
              var cloneHtml = $('.searchOn').html();
              $('.movie-show-desc').html("");
              $('.movie-show-desc').html(cloneHtml);
              $('.movie-show').show();
              $('.sbox-desc').removeClass('searchOn');
            	}
									
						function goDetail() {
							movieIurl = $(document).find('.result-data-1').find('img').attr('data-original-src');

              movieStory = $(document).find('.result-data-2').html();
		
              mActor  = $(document).find('.result-data-3').children('dl:nth-child(2)').find('.f_link');

							mCount = $(document).find('.result-data-3').children('dl:nth-child(3)').find('span');

              if (mCount.length > 0) {movieCount = mCount[0].innerText;} else {movieCount = '--'}

							$.each(mActor, function (i, people) {
        				if (i == mActor.length - 1 ) {
                    movieActor += people.innerText;
									} else {
										movieActor += people.innerText + ", ";
									}
      					});
                $('.searchOn .movie-poster img').attr('src', movieIurl);
                $('.searchOn .searchMcount').text(movieCount);
                $('.searchOn .searchMactor').text(movieActor);
                $('.searchOn .searchMstory').html(movieStory);
              var cloneHtml = $('.searchOn').html();
              $('.movie-show-desc').html("");
              $('.movie-show-desc').html(cloneHtml);
              $('.sbox-desc').removeClass('searchOn');
						};	
          });
		});

	$('#search-bar-btn').on('click', function(){
		$('.m-con4 .sbox').hide();
			searchSubmit();
	});
	
	$(".h-con input[type=search]").keypress(function(e) { 
    if (e.keyCode == 13){
			$('.m-con4 .sbox').hide();
        searchSubmit();
    }    
  });


	/*movie.js 종료*/
});
