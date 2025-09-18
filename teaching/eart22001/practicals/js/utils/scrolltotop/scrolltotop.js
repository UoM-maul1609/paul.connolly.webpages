// JavaScript Document
$(function () {
	
	// Insert anchors and scroll to top link
	$(document.body).prepend("<div id='top'></div>");
	$(document.body).append("<div id='top-message'><a href='#top'>Scroll to top</a></div>");
	
	// Set the scroll to top action to scroll gracefully to top
	$("#top-message a").click( function(e) {
		e.preventDefault();
		scrollToElement("#top", 500);
	});
	
	
	/* set variables locally for increased performance */
	var scroll_timer, 
		displayed = false,
		$message = $('#top-message a'),
		$window = $(window),
		top = $(document.body).children(0).position().top;
	
	/* react to scroll event on window */
	$window.scroll(function () {
		window.clearTimeout(scroll_timer);
		scroll_timer = window.setTimeout(function () {
			if($window.scrollTop() <= (top+200))
			{
				displayed = false;
				$message.fadeOut(500);
			}
			else if(displayed == false)
			{
				displayed = true;
				$message.stop(true, true).show().click(function () { $message.fadeOut(500); });
			}
		}, 100);
	});
	
	// Add extra length to document body to acommodate the scroll to top link
	var messageOffset = $message.outerHeight() + 20;
	$(document.body).css( {"marginBottom" : messageOffset });
	
	
	
	// A function to scroll the page to the target gracefully
	function scrollToElement( target, duration ) {
		// Set a default duration value if missing
		duration = ( duration ? duration : 500 );
		
		var elem = $( target ),
			dest = 0;
		if( elem.offset().top > $(document).height()-$(window).height() ){
			dest = $(document).height()-$(window).height();
		}
		else{
			dest = elem.offset().top;
		}
		//go to destination
		$('html,body').animate({scrollTop:dest}, duration,'swing');
	}
});