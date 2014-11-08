var camp;

$(document).ready(function() {
		
	$("form").submit(function(){
		console.log($(".depart-input").val());
		console.log($(".form-nights-input").val());

		$.get('http://api.amp.active.com/camping/campgrounds?pstate=CA&siteType=2003&arvdate=12/15/2014&lengthOfStay=2&api_key=2chxq68efd4azrpygt5hh2qu', function(xml) {
			camp = $.xml2json(xml);
			console.log(camp);
		})

		return false;
	});

});
