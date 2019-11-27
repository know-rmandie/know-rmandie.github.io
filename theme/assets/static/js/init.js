jQuery(function($) {
   // Toggle Sidedrawer
   /* from https://www.muicss.com/examples/v1/example-layouts/responsive-side-menu/index.html */
   var $bodyEl = $('body'),
      $sidedrawerEl = $('#sidedrawer');
   function showSidedrawer() {
      // show overlay
      var options = {
         onclose: function() {
            $sidedrawerEl
            .removeClass('active')
            .appendTo(document.body);
         }
      };
      var $overlayEl = $(mui.overlay('on', options));
      // show element
      $sidedrawerEl.appendTo($overlayEl);
      setTimeout(function() {
         $sidedrawerEl.addClass('active');
      }, 20);
   }
   function hideSidedrawer() {
      $bodyEl.toggleClass('hide-sidedrawer');
   }
   $('.js-show-sidedrawer').on('click', showSidedrawer);
   $('.js-hide-sidedrawer').on('click', hideSidedrawer);
   hideSidedrawer();

   // Animate menu
   var $titleEls = $('strong', $sidedrawerEl);
   /*$titleEls
      .next()
      .hide();*/
   $titleEls.on('click', function() {
      $(this).next().slideToggle(200);
   });
   /* end Toggle Sidedrawer */

   /* function that get width of #content-wrapper element */
	getWidth=function(usage) {
		switch(usage) {
			case 'map' :
				rW=$('#content-wrapper').width();
				rH=$(window).height()-104;
				break;
			case 'graph' :
				rW=$('#content-wrapper').width();
				rH=rW/2;
				break;
			case 'full' :
				rW=$('#content-wrapper').width();
				rH=$(window).height();
				break;
			/*case 'illus' :
				rW=$('#main').width();
				if(rW>730) rW=rW/2;
				rH=rW/2;
				if(rWi==null) rWi=rW;
				break;*/
			default :
				rW=$('#content-wrapper').width();
				rH=$(window).height();
				if(rW0==null) rW0=rW;
			}
	}
   /* end of getWidth tool */
});
