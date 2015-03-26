/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        $.ajax({
          url: "http://api.meetup.com/2/events?key=242b2548681072d272a6a7a7b1d2f61&sign=true&group_urlname=edgecoders&callback=ecw",
          jsonp: "callback",
          dataType: "jsonp",
          success: function(response) {
            var workshopsHTML = response.results.map(function(event) {
              return $("<li><span class='time'>" + moment(event.time).format("MMM Do") + "</span>, " + "<a target='_blank' href='" + event.event_url + "'>" + event.name + "</a></li>");
            });
            $("#upcoming-workshops").html(workshopsHTML);
          }
        });

        var $obj = $('#engage');
        var top = $obj.offset().top + 300;
        $(window).scroll(function (event) {
          // what the y position of the scroll is
          var y = $(this).scrollTop();
          // whether that's below the form
          if (y >= top) {
            // if so, ad the fixed class
            $obj.addClass('fixed-corner');
          } else {
            // otherwise remove it
            $obj.removeClass('fixed-corner');
          }
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
