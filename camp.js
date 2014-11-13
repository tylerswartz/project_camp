var camp;
var date_input;
var date;
var nights;

$(document).ready(function() {
		
	function formatDate(p){
		var dateAr = [];
		dateAr = p.split('-');
		var year = dateAr[0];
		var month = dateAr[1];
		var day = dateAr[2];
		date = month + "/" + day + "/" + year;
		return date;

		// input: 2014-11-19 
		// proper format: 12/15/2014
	};

	$("form").submit(function(){
		date_input = ($(".depart-input").val());
		date = formatDate(date_input);
		console.log(date);
		nights = ($(".form-nights-input option:selected").text());
		console.log(nights);
		
		$.get("https://d9d20ed6-bb51eeb318dd.my.apitools.com/?pstate=CA&siteType=2003&arvdate="+ date +"&lengthOfStay="+ nights + "&api_key=6gxhb929yg7ez8u3cr9mj9gj", function(response) { 
   		console.log(response);
		});



		// $.get('http://api.amp.active.com/camping/campgrounds?pstate=CA&siteType=2003&arvdate=12/15/2014&lengthOfStay=2&api_key=6gxhb929yg7ez8u3cr9mj9gj', function(xml) {
		// 	camp = $.xml2json(xml);
		// 	console.log(camp);
		// })

		return false;
	});

});
