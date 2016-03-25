$( document ).ready(function() {

	/*
		SCROLL NAVIGATION
	*/

	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    if ($target.length == 0) return;

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 500, 'swing', function () {
	        window.location.hash = target;
	    });
	});

	/*
		MASONRY
	*/

	// $('.references-list').imagesLoaded( function() {
	// 	$('.references-list').masonry({
	// 		itemSelector: '.references-list-item'
	// 	});
	// });

	loadMasonry();

});


/*
	Detect mobile device
*/

function detectMob ()
{
	if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	){
		return true;
	}
	else {
		return false;
	}
}

/*
	LOAD REFS MASONRY
*/

function loadMasonry()
{
 	/* Animated masonry images */
 	if ( detectMob() == false && $("#references-list").length > 0 ) {
	 	new AnimOnScroll( document.getElementById( 'references-list' ), {
			minDuration : 0.4,
			maxDuration : 0.7,
			viewportFactor : 0.2
		} );
	 }
}

/*
  DROPDOWN MENU
*/

$('.dropdown .parent').click(function(e) {
  e.preventDefault();
});

$('.dropdown').mouseenter(function() {
  $('.dropdown .dropdown-menu').show();
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
