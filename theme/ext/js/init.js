var $window, $body, getWidth, rW = 10,
  rH = 5,
  rW0, rWg, rWi;
! function(a) {
  a(function() {
    $window = a(window), $body = a("body"), $body.addClass("is-loading"), $window.on("load", function() {
      $body.removeClass("is-loading")
    }), a("#navIcon").click(function() {
      a("#nav").toggleClass("active")
    }), getWidth = function(b) {
      switch (b) {
        case "map":
          rW = a(".md-content__inner").width() - 10, rH = a(window).height() - 340;
          break;
        case "graph":
          rW = a(".md-content__inner").width(), rH = rW / 2;
          break;
        case "full":
          rW = a(".md-content__inner").width(), rH = a(window).height();
          break;
        default:
          rW = a(".md-content__inner").width(), rH = a(window).height(), null == rW0 && (rW0 = rW)
      }
    }
  })
}(jQuery);
