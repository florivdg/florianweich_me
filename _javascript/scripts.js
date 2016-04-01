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

	    if ($target.length === 0) return;

      // Disable scroll ANIMATIONS
      console.log(target);
      if (target == "#kontakt") {
        $target.find("#contactform, .social-list").addClass("in-view visible");
      }

      // Hide mobile nav if shown
      var $mainNav = $("#main-nav");
      if ( $mainNav.hasClass("shown") ) {
    		$mainNav.removeClass("shown").animateCss("fadeOutLeftBig", "hidden-mobile");
    	}

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 400, 'swing', function () {
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

  if (isMobile.any === true) {
    showCards();
  } else {
    animateCards();
  }

  /*
    FORM VALIDATION
  */

  $('#contactform').parsley();

  /*
    SLIDER
  */

  if ( $('#masterslider').length > 0 ) {
    initMasterSlider();
  }

});


/*
	LOAD REFS MASONRY
*/

function loadMasonry() {
  $('.references-list').imagesLoaded( function() {
		$('.references-list').masonry({
			itemSelector: '.references-list-item'
		});
    if (isMobile.any === false) {
      check_if_in_view();
    } else {
      showRefCards();
    }
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

function showCards() {
  $('.card').addClass("visible");
}

function showRefCards() {
  $('.references-list-item').addClass("visible");
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

var $animation_elements = $('.collection-item, .references-list-item, #contactform, #kontakt .social-list');
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
        ($element.hasClass("in-view") === false)) {
          $element.css("opacity", "1").addClass("in-view").animateCss("slideInUp", "visible");
    }
  });
}

if (isMobile.any === false) {
  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');
}

/*
  PARSLEY DE
*/

Parsley.addMessages('de', {
  defaultMessage: "Die Eingabe scheint nicht korrekt zu sein.",
  type: {
    email:        "Gib bitte eine gültige E-Mail-Adresse ein.",
    url:          "Die Eingabe muss eine gültige URL sein.",
    number:       "Die Eingabe muss eine Zahl sein.",
    integer:      "Die Eingabe muss eine Zahl sein.",
    digits:       "Die Eingabe darf nur Ziffern enthalten.",
    alphanum:     "Die Eingabe muss alphanumerisch sein."
  },
  notblank:       "Die Eingabe darf nicht leer sein.",
  required:       "Das hier ist ein Pflichtfeld.",
  pattern:        "Die Eingabe scheint ungültig zu sein.",
  min:            "Die Eingabe muss größer oder gleich %s sein.",
  max:            "Die Eingabe muss kleiner oder gleich %s sein.",
  range:          "Die Eingabe muss zwischen %s und %s liegen.",
  minlength:      "Die Eingabe ist zu kurz. Es müssen mindestens %s Zeichen eingegeben werden.",
  maxlength:      "Die Eingabe ist zu lang. Es dürfen höchstens %s Zeichen eingegeben werden.",
  length:         "Die Länge der Eingabe ist ungültig. Es müssen zwischen %s und %s Zeichen eingegeben werden.",
  mincheck:       "Wählen Sie mindestens %s Angaben aus.",
  maxcheck:       "Wählen Sie maximal %s Angaben aus.",
  check:          "Wählen Sie zwischen %s und %s Angaben.",
  equalto:        "Dieses Feld muss dem anderen entsprechen."
});

Parsley.setLocale('de');

/*
  REF SLIDER
*/

function initMasterSlider() {
  $('#masterslider').masterslider({
    width: 750,
    height: 480,
    loop:true,
    autoplay:false,
    speed: 15,
    view:'partialWave',
    layout:'partialview',
    startOnAppear:true,
    controls: {
      arrows: { autohide:true }
    }
  }).on(MSSliderEvent.CHANGE_START, function(e){
    var current_slide = $('#masterslider').masterslider('index');
    $('.slider-nav li').removeClass("active");
    $('li[data-target-slide="'+ current_slide +'"]').addClass("active");
  });
}

$('.slider-nav li').click(function() {
  $('#masterslider').masterslider('gotoSlide', $(this).data('target-slide'));
});
