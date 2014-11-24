var camp;
var date;
var nights;
var results;
var locations = [];
var arr;
var zip;
var user_lat;
var user_lng;

$(document).ready(function() {

	$(".arrow-wrap").click(function(){
		$('html, body').animate({
      scrollTop: $(".about").offset().top
    }, 1500);
	});

	$("#credits").click(function(){
		$("#credit-dialog").slideDown("slow");
		$('html, body').animate({
      scrollTop: $("#credit-dialog").offset().top
    }, 2000);
		$("#credit-dialog").removeClass("hidden");
	});

	$("#close-credits").click(function(){
		$("#credit-dialog").slideUp("slow");
	});

	$("form").submit(function(){
		//take input data
		date = ($(".depart-input").val());
		nights = ($(".form-nights-input option:selected").text());
		zip = ($(".zip-input").val());

		//call google geolocation api
		$.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=AIzaSyClJZW1Iy3jK7vRgH2lEJ0LxE6R3wyofmo", function(googleObject){
			user_lat = (googleObject.results[0].geometry.location.lat);
			user_lng = (googleObject.results[0].geometry.location.lng);		
			
			//open map div
			$( "#map" ).slideDown("slow");
			
			callCampApi();

			//scroll to map div
			$('html, body').animate({
        scrollTop: $("#map").offset().top
    	}, 2000);
		
		});
		
		return false;
	});
});

// date picker
$(function() {
  $(".depart-input").datepicker({ minDate: 0, maxDate: "+6M" });
});


function callCampApi(){
	//query api and convert from xml to json
	 	$.get("https://d9d20ed6-bb51eeb318dd.my.apitools.com/?landmarkName=true&landmarkLat="+ user_lat +"&landmarkLong="+ user_lng +"&siteType=2003&arvdate="+ date +"&lengthOfStay="+ nights + "&api_key=6gxhb929yg7ez8u3cr9mj9gj", function(response) { 	
	  	results = $.xml2json(response);
	  	for (var i=0; i < results.result.length; i++){
	     	if (results.result[i].availabilityStatus === "Y") {
	      	arr = [];
	      	arr.push(results.result[i].facilityName);
	      	arr.push(results.result[i].latitude);
	      	arr.push(results.result[i].longitude);
	      	locations.push(arr);
	     	}
	   	};

	   //build map
	   var map = new google.maps.Map($("#map")[0], {
	    zoom: 7,
	    center: new google.maps.LatLng(user_lat, user_lng),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	   });

	   var infowindow = new google.maps.InfoWindow();

	   //place markers at locations
	   var marker, i;

	   for (i = 0; i < locations.length; i++) {
	    marker = new google.maps.Marker({
	    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
	    map: map
	   })
	   google.maps.event.addListener(marker, 'click', (
	    function(marker, i) {
	    return function() {
	    	infowindow.setContent(locations[i][0]);
	    	infowindow.open(map, marker);
	    }
	   })(marker, i));
	}
	});
};
