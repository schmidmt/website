/*!
 * script.js | Michael T. Schmidt | MIT License | 2014 
 * */

define(['jquery', 'jquery.lazyload', 'jquery.bootstrap'], function($) {
  var stickyNavDisp;

  // Remove .loading cover screen if it's time.
  if (document.readyState == 'complete') {
    $('.loading').fadeOut();
  } else {
    $(window).load(function() {
      $('.loading').fadeOut();
    });
  }

  $(document).ready(function() {
      applyHeader();
      applyNavigation();
      applyNavHeightFix();
      applyResize();
      applyGitHub();

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

  function applyGitHub() {
    // To get the github json file issue
    // `curl "https://api.github.com/users/schmidmt/repos" -o github_schmidmt.json`
    $.getJSON( "github_schmidmt.json", function( data ) {
        var items = [];
        var itemssmall = [];
        items.push( "<thead>" );
        items.push( "<tr>" );
        items.push( "<th data-hide=\"phone\"></th>" );
        items.push( "<th>Project</th>" );
        items.push( "<th data-hide=\"phone\">Description</th>" );
        items.push( "<th data-hide=\"phone\">Language</th>" );
        items.push( "<th data-hide=\"phone\"><i class=\"fa fa-star\"></i></th>" );
        items.push( "<th data-hide=\"phone\"><i class=\"fa fa-eye\"></i></th>" );
        items.push( "</tr>" );
        items.push( "</thead>" );
        items.push( "<tbody>" );

        $.each( data, function( key, val ) {
          items.push( "<tr id='" + key + "'>" );
          if (val["fork"]) {
            items.push( "<td><i class=\"fa fa-code-fork\"></i></td>" );
          } else {
            items.push( "<td></td>" );
          }
          items.push( "<td><a href=" + val["html_url"] + ">" + val["name"] + "</a></td>" );
          items.push( "<td>" + val["description"].split(".")[0] + ".</td>" );
          items.push( "<td>" + val["language"] + "</td>" );
          items.push( "<td>" + val["stargazers_count"] + "</td>" );
          items.push( "<td>" + val["watchers_count"] + "</td>" );
          items.push( "</tr>" );
        });
        items.push( "</tbody>" );
       
        $( "<table/>", {
          "class": "table table-striped table-bordered",
          "id": "github-table",
          html: items.join( "" )
        }).appendTo( ".githubprojects" );
        /*
        $("#github-table").footable({
            breakpoints: {
              phone: 480,
              tablet: 1024
            }
          });
        */
      }).fail(function() {
       console.log("Couldn't Load github json file."); 
       $('#github').remove();
      });
  }
});
