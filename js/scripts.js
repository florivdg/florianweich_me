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

	$('.references-list').imagesLoaded( function() {
		$('.references-list').masonry({
			itemSelector: '.references-list-item'
		});
	});

});

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
