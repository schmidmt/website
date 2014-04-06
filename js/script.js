var stickyNavDisp;

$(document).ready(function() {
    applyHeader();
    applyNavigation();
    applyNavHeightFix();
    applyResize();

    $("img.lazy").lazyload({
      threshold : 200
    });

    $("div.lazy").lazyload({
      effect : "fadeIn"
    });

})


function applyHeader() {
    $('.jumbotron').css({
        height: ($(window).height()) + 'px'
    });
}

function applyNavigation() {
    applyClickEvent();
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
    stickyNavDisp = $(window).height()
    $(window).on('scroll', function() {
        stickyNav();
    });
    stickyNav();
}

function stickyNav() {
    if ($(window).scrollTop() > stickyNavDisp) {
        $('body').addClass('fixed');
    } else {
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
        stickyNavDisp = $('.scroll-down').offset().top + $('.scroll-down').outerHeight();
        applyHeader();
        applyNavHeightFix();
    });
}
