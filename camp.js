var camp;
var date_input;
var date;
var nights;
var results;
var locations = [];
var arr;

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
   		for (var i=0; i < 10; i++){
        if (results.result[i].availabilityStatus === "Y") {
        	console.log(results.result[i].facilityName);
        	console.log(results.result[i].latitude);
        	console.log(results.result[i].longitude);
        	arr = [];
        	arr.push(results.result[i].facilityName);
        	arr.push(results.result[i].latitude);
        	arr.push(results.result[i].longitude);
        	locations.push(arr);
        }

        // console.log(results.result[i].latitude);
        // console.log(results.result[i].longitude);
      };

      //build map
      var map = new google.maps.Map($("#map")[0], {
      	zoom: 8,
      	center: new google.maps.LatLng(37.8311, -122.3855),
      	mapTypeId: google.maps.MapTypeId.ROADMAP
    	});

    	var infowindow = new google.maps.InfoWindow();

    	//place markers at locations
    	var marker, i;

    	for (i = 0; i < locations.length; i++) {
    		marker = new google.maps.Marker({
    		position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    		map: map
    	});

    	google.maps.event.addListener(marker, 'click', (
    		function(marker, i) {
    		return function() {
    			infowindow.setContent(locations[i][0]);
    			infowindow.open(map, marker);
    		}
    	})(marker, i));
    }


		});

		
		return false;
	});


});


	//old API get request
		// $.get('http://api.amp.active.com/camping/campgrounds?pstate=CA&siteType=2003&arvdate=12/15/2014&lengthOfStay=2&api_key=6gxhb929yg7ez8u3cr9mj9gj', function(xml) {
		// 	camp = $.xml2json(xml);
		// 	console.log(camp);
		// })