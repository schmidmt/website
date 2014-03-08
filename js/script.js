var stickyNavDisp;

$(document).ready(function() {
    applyHeader();
    applyNavigation();
    applyNavHeightFix();
    applyResize();
    decodeEmail();
    applySkills();
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

function applySkills() {
  /*
  var symbol = "glyphicon glyphicon-cog";
  //$('.ability-value').
  //
  console.log("hit applySkills");
  console.log("ability-value elements:")
  var abilityValues = document.getElementsByClassName("ability-value")
  console.log("Found " + abilityValues.length + " objects")
  for ( i = 0 ; i < abilityValues.length ; i++) {
    console.log(i + " " + abilityValues[i].parentNode.firstChild.innerHTML + " -> Classes: " + abilityValues[i].classList);
  }
  */
}
