/* global functions and variables */
var $window,$body;		// portent bien leur nom
var getWidth;			// fonction de mise à la bonne largeur (en fonction de l'usage)
var rW=10,rH=5,rW0,rWg,rWi; // largeur et hauteur de la zone de tracé + variables largeurs initiales graphes et illustrations

(function($) {
	$(function() {
		$window = $(window),
		$body = $('body');
	// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');
		$window.on('load', function() {
			$body.removeClass('is-loading');
		});
		
	// removable menu for handeld device
		$('#navIcon').click(function(){
			$('#nav').toggleClass('active')
			});
		
	// function that get width of #main element
	getWidth=function(usage) {
		switch(usage) {
			case 'map' : 
				rW=$('#main').width()-10;	
				rH=$(window).height()-240;
				break;
			case 'graph' :
				rW=$('#main').width();
				rH=rW/2;
				break;
			case 'full' : 
				rW=$('#main').width();	
				rH=$(window).height();
				break;
			/*case 'illus' :
				rW=$('#main').width();
				if(rW>730) rW=rW/2;
				rH=rW/2;
				if(rWi==null) rWi=rW;
				break;*/
			default :
				rW=$('#main').width();
				rH=$(window).height();
				if(rW0==null) rW0=rW;
			}
	}	
		
/* Comments and bug report */
	// require data in ../user/token.js
	// show and hide comments form
	function letsSendComment() {
	   $('#comment-fond').fadeIn('.5s');
	   $('#commentaires').fadeIn('.75s')
	   }
	function letsCloseComment() {
	   $('#commentaires').fadeOut('.5s');
	   $('#comment-fond').fadeOut('.75s');
	   $('#form').show('.77s');
	   $('#thanks').hide('.77s');
	   $('input, textarea').val(function() {
			return($(this).attr('default'));
			});
		$('textarea').text($(this).attr('default'));
	   }
	   
	// add functions to links and buttons
	$('#letsComment').click(letsSendComment);
	$('#comment-close').click(letsCloseComment);
	// add function to submit button
	$('#submit').click(FormSubmit);
	
	// submission function
	function FormSubmit() {
		// define target url
		var formUrl= 'https://'+gitlab+'/api/v3/projects/'+project+'/issues?private_token='+token;
		// set some attributes to form
		var $form=$('#form');
		$form.attr('target','sender');
		$form.attr('action',formUrl);
		$form.attr('method','POST');
		// get form data before posting
		var formData = $form.serialize();
		console.log('FORM DATA:\n' + formData);
		// post data
		$form.submit(function(evt) {
			var titCom=$('#commentaires input[type=text]');
			var comCom=$('#commentaires textarea');
			console.log(titCom.val()+" - "+comCom.text());
			console.log(titCom.attr('default')+" - "+comCom.attr('default'));
			if(titCom.val()===titCom.attr('default')) {titCom.val('');evt.preventDefault();}
			else {
				if(comCom.text()===comCom.attr('default')) {
					comCom.text('');evt.preventDefault();}
				else {
					// hide form, display thanks
					$('#form').fadeOut();
					$('#thanks').fadeIn('slow');
					// close comments
					window.setTimeout(letsCloseComment,3000);
					// clean form : reset to default value
					}
				}
			});
		}	
	})
})(jQuery);