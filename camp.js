var camp;

$(document).ready(function() {
		
	$("form").submit(function(){
		console.log($(".depart-input").val());
		console.log($(".form-nights-input").val());

		$.get("http://api.amp.active.com/camping/campgrounds?pstate=CA&siteType=2003&arvdate=12/15/2014&lengthOfStay=2&api_key=6gxhb929yg7ez8u3cr9mj9gj", function(response) { 
    	console.log(response);
		});

		// $.get('http://api.amp.active.com/camping/campgrounds?pstate=CA&siteType=2003&arvdate=12/15/2014&lengthOfStay=2&api_key=6gxhb929yg7ez8u3cr9mj9gj', function(xml) {
		// 	camp = $.xml2json(xml);
		// 	console.log(camp);
		// })

		return false;
	});

});
