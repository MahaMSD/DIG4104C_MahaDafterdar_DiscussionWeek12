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

/* ------------------------ game quiz buzzfeed ---------------------- */
// Quiz result options in a separate object for flexibility
var resultOptions = [
    {   title: 'You Are This Thing',
        desc: '<p>...</p>'},
    {   title: 'You Are That Thing',
        desc: '<p>...</p>'},
    {   title: 'You Are This Other Thing',
        desc: '<p>...</p>'},
    {   title: 'You Are This One Thing',
        desc: '<p>...</p>'},
    {   title: 'You Are A Type Of Thing',
        desc: '<p>...</p>'}
];
    
// global variables
var quizSteps = $('#quizzie .quiz-step'),
    totalScore = 0;

// for each step in the quiz, add the selected answer value to the total score
// if an answer has already been selected, subtract the previous value and update total score with the new selected answer value
// toggle a visual active state to show which option has been selected
quizSteps.each(function () {
    var currentStep = $(this),
        ansOpts = currentStep.children('.quiz-answer');
    // for each option per step, add a click listener
    // apply active class and calculate the total score
    ansOpts.each(function () {
        var eachOpt = $(this);
        eachOpt[0].addEventListener('click', check, false);
        function check() {
            var $this = $(this),
                value = $this.attr('data-quizIndex'),
                answerScore = parseInt(value);
            // check to see if an answer was previously selected
            if (currentStep.children('.active').length > 0) {
                var wasActive = currentStep.children('.active'),
                    oldScoreValue = wasActive.attr('data-quizIndex'),
                    oldScore = parseInt(oldScoreValue);
                // handle visual active state
                currentStep.children('.active').removeClass('active');
                $this.addClass('active');
                // handle the score calculation
                totalScore -= oldScoreValue;
                totalScore += answerScore;
                calcResults(totalScore);
            } else {
                // handle visual active state
                $this.addClass('active');
                // handle score calculation
                totalScore += answerScore;
                calcResults(totalScore);
                // handle current step
                updateStep(currentStep);
            }
        }
    });
});

// show current step/hide other steps
function updateStep(currentStep) {
    if(currentStep.hasClass('current')){
       currentStep.removeClass('current');
       currentStep.next().addClass('current');
    }
}

// display scoring results
function calcResults(totalScore) {
    // only update the results div if all questions have been answered
    if (quizSteps.find('.active').length == quizSteps.length){
        var resultsTitle = $('#results h1'),
            resultsDesc = $('#results .desc');
        
        // calc lowest possible score
        var lowestScoreArray = $('#quizzie .low-value').map(function() {
            return $(this).attr('data-quizIndex');
        });
        var minScore = 0;
        for (var i = 0; i < lowestScoreArray.length; i++) {
            minScore += lowestScoreArray[i] << 0;
        }
        // calculate highest possible score
        var highestScoreArray = $('#quizzie .high-value').map(function() {
            return $(this).attr('data-quizIndex');
        });
        var maxScore = 0;
        for (var i = 0; i < highestScoreArray.length; i++) {
            maxScore += highestScoreArray[i] << 0;
        }
        // calc range, number of possible results, and intervals between results
        var range = maxScore - minScore,
            numResults = resultOptions.length,
            interval = range / (numResults - 1),
            increment = '',
            n = 0; //increment index
        // incrementally increase the possible score, starting at the minScore, until totalScore falls into range. then match that increment index (number of times it took to get totalScore into range) and return the corresponding index results from resultOptions object
        while (n < numResults) {
            increment = minScore + (interval * n);
            if (totalScore <= increment) {
                // populate results
                resultsTitle.replaceWith('<h1>' + resultOptions[n].title + '</h1>');
                resultsDesc.replaceWith('<p class=\'desc\'>' + resultOptions[n].desc + '</p>');
                return;
            } else {
                n++;
            }
        }
    }
}