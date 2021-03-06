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
      scrollTop: $(".about").offset().top - 60
    }, 1500);
	});

	$(".header").click(function(){
		$('html, body').animate({
      scrollTop: $(".upper").offset().top - 55
    }, 1500);
	});

	$("#credits").click(function(){
		$("#credit-dialog").toggle("slow");
	})

	$("#close-credits").click(function(){
		$("#credit-dialog").slideUp("slow");
	});

	$("form").submit(function(){
		//send search goal to google analytics
		ga('send', 'event', 'button', 'click', 'search-button', 1);

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
        scrollTop: $("#map").offset().top - 55
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
	      	arr.push(results.result[i].contractID);
	      	arr.push(results.result[i].facilityID);
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
	    	infowindow.setContent("<h4 style='margin-bottom:5px;margin-top:5px;'>" + locations[i][0] + "</h4>" + 
                  						"<a href='http://www.reserveamerica.com/facilityDetails.do?contractCode=" +
                  						locations[i][3] + "&parkId=" + locations[i][4] +"'" +
                  						"target='_blank'>Book On ReserveAmerica</a>");
	    	infowindow.open(map, marker);
	    }
	   })(marker, i));
	}
	});
};
