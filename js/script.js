var stickyNavDisp;

$(document).ready(function() {
    applyHeader();
    applyNavigation();
    applyNavHeightFix();
    applyResize();
    decodeEmail();

    /*
  scrollFade($(document.getElementById('title'))
    , 0.5  // Friction (0 ~ 1): lower = none
    , 0    // Fade duration (0 ~ 1): lower = longer
  );
  */
})

var $window = $(window);

function scrollFade($element, friction, offset) {
    friction = (friction === undefined) ? 0.5 : friction;
    offset = (offset === undefined) ? 0 : offset;

    $window.scroll(function() {
        var scrollTop = $window.scrollTop(),
            parentHeight = $element.parent().outerHeight() * 0.5,
            yOffset = ($element.outerHeight() * -0.5) + scrollTop * friction;

        $element.css({
            transform: 'translate(0px,' + (120 + yOffset) + 'px)',
            opacity: 1 - (scrollTop / Math.max(1, (parentHeight - (parentHeight * offset))))
        });
    });
}

function applyHeader() {
    $('.jumbotron').css({
        height: ($(window).height()) + 'px'
    });
}

function applyNavigation() {
    applyClickEvent();
    //applyNavigationFixPhone();
    applyScrollSpy();
    applyStickyNav();
}

function applyClickEvent() {
    $('a[href*=#]').on('click', function(e) {
        e.preventDefault();
        if ($($.attr(this, 'href')).length > 0) {
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 400);
        }
        return false;
    });
}

function applyScrollSpy() {
    $('#navbar').on('activate.bs.scrollspy', function() {
        window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
    });
}

function applyStickyNav() {
    //stickyNavDisp = $('.scroll-down').offset().top + $('.scroll-down').outerHeight();

    stickyNavDisp = $(window).height()

    //console.log('Applying StickyNav. offset = ' + stickyNavDisp )

    $(window).on('scroll', function() {
        stickyNav();
    });
    stickyNav();
}

function stickyNav() {
    if ($(window).scrollTop() > stickyNavDisp) {
        //console.log("Adding Fixed to nav")
        $('body').addClass('fixed');
    } else {
        //console.log("Removing Fixed to nav")
        $('body').removeClass('fixed');
    }
}

function applyNavHeightFix() {
    $('a.anchor').css({
      top: -($('#navbar').outerHeight() - 20)
    });
}

function applyResize() {
    $(window).on('resize', function() {
        //console.log('Applying StickyNav. offset = ' + $('.scroll-down').offset().top + $('.scroll-down').outerHeight() )
        stickyNavDisp = $('.scroll-down').offset().top + $('.scroll-down').outerHeight();
        /*$('.jumbotron').css({
            height: ($(window).height()) + 'px'
        });*/
        applyHeader();
        applyNavHeightFix();
    });
}

function decodeEmail() {
    $('a[href*=mailto]').on('click', function(e) {
        var lstrEmail = $(this).attr('href').replace('mailto:', '');
        //console.log('found email: ' + lstrEmail)
        lstrEmail = rot13(lstrEmail)
        //console.log('replacing with: ' + lstrEmail)
        $(this).attr('href', 'mailto:' + lstrEmail);
    });
}

function rot13(str) {
    return str.replace(/([a-zA-Z])/g,
        function(m) {
            var num = m.toUpperCase().charCodeAt(0) + 13;
            var ch = (num > 90) ? 64 + (num - 90) : num;
            var character = String.fromCharCode(ch);
            return (m == m.toUpperCase()) ? character : character.toLowerCase();
        });
}
