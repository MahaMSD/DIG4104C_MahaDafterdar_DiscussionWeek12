$(document).ready(function() {
	/* ------------------- home ------------------ */
	//parallax - slider 
	var slideStart;

  	function startSlide() {
    	slideStart = setInterval(slideShow, 7000);
  	};

  	function slideShow() {
    	var slideCurrent = $('.slide-active');
    	var slideNext = slideCurrent.next();
    	var dotCurrent = $('li.active');
    	var dotNext = dotCurrent.next();

    	if (slideNext.length == 0) {
      		slideNext = $('.slide').first();
      		dotNext = $('.slide-indicator li').first();
   	 	}

    	var slideIndex = slideNext.index();

    	$('.slide').css({
      		'transform': 'translate(-' + (slideIndex) * 100 + '%)'
    	});

    	$('.slide').removeClass('slide-active');
    	slideNext.addClass('slide-active');

    	var captionNext = slideNext.find('.caption');

    	$('.slide-indicator li').removeClass('active');
    	dotNext.addClass('active');
    
  	};

  	function parallaxX() {
    	var scrollTop = window.pageYOffset

    	$(window).on('scroll resize', function() {
      		scrollTop = window.pageYOffset;
    	});

    	$('.slide').each(function() {
      		var parallaxImage = $(this);
      		var parallaxOffset = parallaxImage.offset().top;
      		var yPos;
      		var coords;

      		$(window).on('scroll resize', function() {
        		yPos = -(parallaxOffset - scrollTop) / 2;
        		coords = '50% ' + yPos + 'px';

        		parallaxImage.css({
          			backgroundPosition: coords
        		});
      		});
    	});
  	};
  // function siteNav() {

  //   $(".nav-menu").on("click", function() {
  //     $("body").animate({
  //       'right': '320'
  //     });
  //     $(".nav-container").animate({
  //       'right': '0'
  //     });
  //     $("<div class=\"nav-wrapper\"></div>").appendTo("body");
  //   });
    
  //   $(".close-button").on("click", buttonClose);
  //   $("body").on("click", '.nav-wrapper', buttonClose);
    
  //   function buttonClose() {
  //     $(".nav-wrapper").remove();
  //     $(".caret").removeClass("open");
  //     $(".dropdown-nav").slideUp();
  //     $("body").animate({
  //       'right': '0'
  //     });
  //     $(".nav-container").animate({
  //       'right': '-100%'
  //     });
  //   }
    
  //   $(".dropdown-container a").on("click", function(){
  //     $(this).children(".caret").toggleClass("open");
  //     $(this).next(".dropdown-nav").slideToggle(300);
  //   });
    
  // };

  $('.slide-indicator li').on('click', function() {

    clearInterval(slideStart);
    var goToSlide = $(this).index();

    $('.slide-indicator li').removeClass('active');
    $('.slide').removeClass('slide-active');
    $('.slide').eq(goToSlide).addClass('slide-active');
    $(this).addClass('active');

    $('.slide').css({
      'transform': 'translate(-' + (goToSlide) * 100 + '%)'
    });
    startSlide();
  });

  startSlide();
  parallaxX();
  // siteNav(); 

  //horizontal accordion 
  var activeSlide = $('.accordion li:first');
  $(activeSlide).addClass('active');
  $('.accordion li').hover(function() {
      $(activeSlide).animate({width: '200px'}, {duration: 'slow', queue: false});
      $(this).animate({width: '500px'}, {duration: 'slow', queue: false});
    activeSlide = this;
    }
  )

});


/* ------------------------ history timeline ---------------------- */
(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll('.timeline li');

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add('in-view');
      }
    }
  }

  // listen for events
  window.addEventListener('load', callbackFunc);
  window.addEventListener('resize', callbackFunc);
  window.addEventListener('scroll', callbackFunc);

})();