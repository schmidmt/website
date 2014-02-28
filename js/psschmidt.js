var stickyNavDisp;

$(document).ready(function()
{
  applyHeader();
  applyNavigation();
  applyStickyNav();

  /*
  scrollFade($(document.getElementById('title'))
    , 0.5  // Friction (0 ~ 1): lower = none
    , 0    // Fade duration (0 ~ 1): lower = longer
  );
  */
});

var $window = $(window);
var scrollFade = function ($element, friction, offset) {
  friction  = (friction  === undefined)? 0.5 : friction;
  offset = (offset === undefined)? 0   : offset;

  $window.scroll(function() {
    var scrollTop    = $window.scrollTop()
      , parentHeight = $element.parent().outerHeight() * 0.5
      , yOffset      = ($element.outerHeight() * -0.5) + scrollTop * friction;

    $element.css({
      transform: 'translate(0px,'+ (120+yOffset) +'px)',
      opacity: 1 - (scrollTop / Math.max(1, (parentHeight - (parentHeight * offset))))
    });
  });
}


function applyHeader()
{
  $('.jumbotron').css({ height: ($(window).height()) +'px' });
};


function applyNavigation() {
  applyClickEvent();
  //applyNavigationFixPhone();
  applyScrollSpy();
};

function applyClickEvent() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    if( $( $.attr(this, 'href') ).length > 0 ) {
      $('html, body').animate( {
        scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 400);
    }
  return false;
  }); 
};

function applyScrollSpy() {
  $('#navbar').on('activate.bs.scrollspy', function() {
    window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
  }); 
};

function applyStickyNav() {
  stickyNavDisp= $('.scroll-down').offset().top + 20;
  $(window).on('scroll', function() {
    stickyNav();
  });
  stickyNav(); 
};

function stickyNav() {
  if($(window).scrollTop() > stickyNavDisp) {
    $('body').addClass('fixed');
  } else {
    $('body').removeClass('fixed');
  } 
};
