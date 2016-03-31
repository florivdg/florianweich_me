var toast_breakpoint_medium = 700;

/*
  EXTEND JQUERY FOR CSS ANIMATIONS
*/

$.fn.extend({
    animateCss: function (animationName, afterClass) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName).addClass(afterClass);
        });
    }
});

$( document ).ready(function() {

	/*
		SCROLL NAVIGATION
	*/

	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    if ($target.length == 0) return;

      // Hide mobile nav if shown
      var $mainNav = $("#main-nav");
      if ( $mainNav.hasClass("shown") ) {
    		$mainNav.removeClass("shown").animateCss("fadeOutLeftBig", "hidden-mobile");
    	}

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 500, 'swing', function () {
	        window.location.hash = target;
	    });
	});

	/*
		MASONRY
	*/

	loadMasonry();

  /*
    CARD ANI
  */

  animateCards();

});


/*
	LOAD REFS MASONRY
*/

function animateInRefCards() {
  $('.references-list').find('.references-list-item').each(function(i) {
    var delay = i * 300;
    var $item = $(this);
    setTimeout(function() {
      $item.css("opacity", "1").animateCss("bounceInUp", "visible");
    }, delay);
  });
}

function loadMasonry() {
  $('.references-list').imagesLoaded( function() {
		$('.references-list').masonry({
			itemSelector: '.references-list-item'
		});

    animateInRefCards();

	});
}

function animateCards() {
  $('.cards').find('.card').each(function(i) {
    var delay = i * 300;
    var $item = $(this);
    setTimeout(function() {
      $item.css("opacity", "1").animateCss("bounceInUp", "visible");
    }, delay);
  });
}


/*
  DROPDOWN MENU
*/

$('.dropdown .parent').click(function(e) {
	e.preventDefault();
});

if ( $( document ).width() > toast_breakpoint_medium) {

	$('.dropdown').mouseenter(function() {
	  $('.dropdown .dropdown-menu').show();
	});

  $('.dropdown').click(function() {
    $('.dropdown-menu').show();
    event.stopPropagation();
  });

	$('.dropdown-menu').mouseleave(function() {
	  $(this).hide();
	});

	$('html').click(function() {
	  $('.dropdown-menu').hide();
	});

	$('.dropdown-menu').click(function(event){
	  event.stopPropagation();
	});

}

/*
  MOBILE MENU
*/

$("#mobile-menu-btn").click(function() {

  var $mainNav = $("#main-nav");

	if ( $mainNav.hasClass("animated") ) { return; }

	if ( $mainNav.hasClass("shown") ) {
		$mainNav.removeClass("shown").animateCss("fadeOutLeftBig", "hidden-mobile");
	} else {
		$mainNav.removeClass("hidden-mobile").animateCss("bounceInLeft", "shown");
	}

});

/*
  ANIMATE COLLECTION ITEMS ON SCROLL
*/

var $animation_elements = $('.collection-item');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position) &&
        ($element.hasClass("in-view") == false)) {
          $element.addClass("in-view").animateCss("slideInUp");
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');
