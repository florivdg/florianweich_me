var toast_breakpoint_medium = 700;

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

});


/*
	LOAD REFS MASONRY
*/

function loadMasonry() {
  $('.references-list').imagesLoaded( function() {
		$('.references-list').masonry({
			itemSelector: '.references-list-item'
		});
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
