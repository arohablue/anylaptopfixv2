/*global jQuery:false */
jQuery(document).ready(function($) {
  "use strict";


  (function() {

    var $menu = $('.navigation nav'),
      optionsList = '<option value="" selected>Menu</option>';

    $menu.find('li').each(function() {
        var $this = $(this),
          $anchor = $this.children('a'),
          depth = $this.parents('ul').length - 1,
          indent = '',
          spacing = '';

        if (depth) {
          while (depth > 0) {
            indent = '15px';
            spacing +=' - '
            depth--;
          }

        }
        $(".nav li").parent().addClass("bold");

        optionsList += '<option style="font-size:' + indent + '" value="' + $anchor.attr('href') + '">' + spacing +' '+ $anchor.text() + '</option>';
      }).end()
      .after('<select class="selectmenu">' + optionsList + '</select>');

    $('select.selectmenu').on('change', function() {
      window.location = $(this).val();
    });

  })();


  $('.toggle-link').each(function() {
    $(this).click(function() {
      var state = 'open'; //assume target is closed & needs opening
      var target = $(this).attr('data-target');
      var targetState = $(this).attr('data-target-state');

      //allows trigger link to say target is open & should be closed
      if (typeof targetState !== 'undefined' && targetState !== false) {
        state = targetState;
      }

      if (state == 'undefined') {
        state = 'open';
      }

      $(target).toggleClass('toggle-link-' + state);
      $(this).toggleClass(state);
    });
  });

  //add some elements with animate effect

  $(".big-cta").hover(
    function() {
      $('.cta a').addClass("animated shake");
    },
    function() {
      $('.cta a').removeClass("animated shake");
    }
  );
  $(".box").hover(
    function() {
      $(this).find('.icon').addClass("animated pulse");
      $(this).find('.text').addClass("animated fadeInUp");
      $(this).find('.image').addClass("animated fadeInDown");
    },
    function() {
      $(this).find('.icon').removeClass("animated pulse");
      $(this).find('.text').removeClass("animated fadeInUp");
      $(this).find('.image').removeClass("animated fadeInDown");
    }
  );


  $('.accordion').on('show', function(e) {

    $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
    $(e.target).prev('.accordion-heading').find('.accordion-toggle i').removeClass('icon-plus');
    $(e.target).prev('.accordion-heading').find('.accordion-toggle i').addClass('icon-minus');
  });

  $('.accordion').on('hide', function(e) {
    $(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
    $(this).find('.accordion-toggle i').not($(e.target)).removeClass('icon-minus');
    $(this).find('.accordion-toggle i').not($(e.target)).addClass('icon-plus');
  });



  //Navi hover
  $('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
  });

  // tooltip
  $('.social-network li a, .options_box .color a').tooltip();

  // fancybox
  $(".fancybox").fancybox({
    padding: 0,
    autoResize: true,
    beforeShow: function() {
      this.title = $(this.element).attr('title');
      this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
    },
    helpers: {
      title: {
        type: 'inside'
      },
    }
  });


  //scroll to top
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });
  $('.scrollup').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
    return false;
  });

  $('#mycarousel').jcarousel();
  $('#mycarousel1').jcarousel();

  //flexslider
  $('.flexslider').flexslider();

  //nivo slider
  $('.nivo-slider').nivoSlider({
    effect: 'random', // Specify sets like: 'fold,fade,sliceDown'
    slices: 15, // For slice animations
    boxCols: 8, // For box animations
    boxRows: 4, // For box animations
    animSpeed: 500, // Slide transition speed
    pauseTime: 5000, // How long each slide will show
    startSlide: 0, // Set starting Slide (0 index)
    directionNav: true, // Next & Prev navigation
    controlNav: false, // 1,2,3... navigation
    controlNavThumbs: false, // Use thumbnails for Control Nav
    pauseOnHover: true, // Stop animation while hovering
    manualAdvance: false, // Force manual transitions
    prevText: '', // Prev directionNav text
    nextText: '', // Next directionNav text
    randomStart: false, // Start on a random slide
    beforeChange: function() {}, // Triggers before a slide transition
    afterChange: function() {}, // Triggers after a slide transition
    slideshowEnd: function() {}, // Triggers after all slides have been shown
    lastSlide: function() {}, // Triggers when last slide is shown
    afterLoad: function() {} // Triggers when slider has loaded
  });

  // Da Sliders
  if ($('#da-slider').length) {
    $('#da-slider').cslider();
  }

  //slitslider
  var Page = (function() {

    var $nav = $('#nav-dots > span'),
      slitslider = $('#slider').slitslider({
        onBeforeChange: function(slide, pos) {
          $nav.removeClass('nav-dot-current');
          $nav.eq(pos).addClass('nav-dot-current');
        }
      }),

      init = function() {
        initEvents();
      },
      initEvents = function() {
        $nav.each(function(i) {
          $(this).on('click', function() {
            var $dot = $(this);

            if (!slitslider.isActive()) {
              $nav.removeClass('nav-dot-current');
              $dot.addClass('nav-dot-current');
            }

            slitslider.jump(i + 1);
            return false;

          });

        });

      };

    return {
      init: init
    };
  })();

  Page.init();

});

$(window).on("load",function() {
  $(window).scroll(function() {
    var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".fade").each(function() {
      /* Check the location of each desired element */
      var objectBottom = $(this).offset().top + $(this).outerHeight();
      
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom) { //object comes into view (scrolling down)
        if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
      } else { //object goes out of view (scrolling up)
        if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
      }
    });
  }).scroll(); //invoke scroll-handler on page-load
});

var $animation_elements = $('.animation-element');
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
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function dataShow() {
  var x = document.getElementById("drop-data");
  var y = document.getElementById("myTopnav");
  if(y.className == "topnav responsive"){
    if (x.style.display === "block") {
      x.style.display= "none"
    } else {
      x.style.display = "block";
    }
  } 
}

function repairShow() {
  var x = document.getElementById("drop-repair");
  var y = document.getElementById("myTopnav");
  if(y.className == "topnav responsive"){
    if (x.style.display === "block") {
      x.style.display= "none"
    } else {
      x.style.display = "block";
    }
  } 
}