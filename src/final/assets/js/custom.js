  $(document).on('ready', function() {
	  
	 
      $(".home_slider").not('.slick-initialized').slick({
        infinite: true,
		speed: 500,
		 arrows: true,
		autoplay: true,
        slidesToShow: 1
      });

	   $(".top_brand_slider").not('.slick-initialized').slick({
        infinite: true,
		speed: 500,
		 arrows: true,
		autoplay: true,
        slidesToShow: 1
      });
      $(".top_brand_slider-two").not('.slick-initialized').slick({
          infinite: true,
          speed: 500,
          arrows: true,
          autoplay: true,
          slidesToShow: 1
      });
	  
	   $(".testimonial_slider").not('.slick-initialized').slick({
	   arrows: true,
        infinite: true,
        slidesToShow: 3
      });



      $('.tab1').click(function(){
          $('.top_brand .tab_sec ul a li').removeClass('active');
          $('.tab-sec2').fadeOut();
          $('.tab-sec1').fadeIn();
          $(this).addClass('active');

      });
      $('.tab2').click(function(){
          $('.top_brand .tab_sec ul a li').removeClass('active');
          $('.tab-sec1').fadeOut();
          $('.tab-sec2').fadeIn();
          $(this).addClass('active');

      });


      // $('.inner_service_box ul li').hover(function(){
      //     $('.list-item').hide();
      //     $(this).find('.list-item').fadeIn();
      // });

      $(".sidebar_slider").slick({
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          autoplay: true,
          speed: 500
      });


    });



  $('.cant-btn a').click(function(){

    $('.signup, .overlay').fadeIn();

  });

  $('.close').click(function(){

    $('.signup, .overlay').fadeOut();

  });

  $('.close').click(function(){

    $('.news-letter, .overlay-news').fadeOut();

  });


