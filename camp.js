var camp;
var date_input;
var date;
var nights;
var results;

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
		//take input data
		date_input = ($(".depart-input").val());
		date = formatDate(date_input);
		console.log(date);
		nights = ($(".form-nights-input option:selected").text());
		console.log(nights);
		
		//query api and convert from xml to json
		$.get("https://d9d20ed6-bb51eeb318dd.my.apitools.com/?pstate=CA&siteType=2003&arvdate="+ date +"&lengthOfStay="+ nights + "&api_key=6gxhb929yg7ez8u3cr9mj9gj", function(response) { 
   		results = $.xml2json(response);
   		console.log(results);
   		for (var i=0; i < 2; i++){
        console.log(results.result[i].latitude);
        console.log(results.result[i].longitude);
      };
		});

		var map = new google.maps.Map($("#map"), {
      zoom: 10,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

		return false;
	});


});


	//old API get request
		// $.get('http://api.amp.active.com/camping/campgrounds?pstate=CA&siteType=2003&arvdate=12/15/2014&lengthOfStay=2&api_key=6gxhb929yg7ez8u3cr9mj9gj', function(xml) {
		// 	camp = $.xml2json(xml);
		// 	console.log(camp);
		// })