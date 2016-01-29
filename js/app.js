var escapes = [];
var windowDetails = [];
var istanbul = {lat: 41.0099973, lng: 28.9830769};

/** MODEL **/
var escapeRooms = [
	{
		name: "Is Trapped",
		cordinates: {lat: 41.030416, lng: 28.974064},
		phone: "+90 (212) 244 25 46",
		site: "http://www.istrapped.com",
	},
	{
		name: "Cage 404",
		cordinates: {lat: 41.033301, lng: 28.979367},
		phone: "+90 (212) 243 97 22",
		site: "http://www.cage404.com",
	},
	{
		name: "Defuse Bomb",
		cordinates: {lat: 40.987339, lng: 29.027853},
		phone: "+90 (216) 418 95 16",
		site: "http://www.defusebomb.com",
	},
	{
		name: "Enigma Room Scape",
		cordinates: {lat: 41.034194, lng: 28.981124},
		phone: "+90 0212 963 01 47",
		site: "http://enigmaroomescape.com",
	},
	{
		name: "Bee Escape",
		cordinates: {lat: 41.034508, lng: 28.9795373},
		phone: "+90 (212) 243 05 73",
		site: "http://beeescape.com",
	},
	{
		name: "Escape Planet",
		cordinates: {lat: 41.039167, lng: 28.9821393},
		phone: "+90 (212) 235 37 58",
		site: "http://www.escapeplanet.com",
	},
	{
		name: "Lock Hunt",
		cordinates: {lat: 41.0464073, lng: 29.0048375},
		phone: "+90 (212) 227 77 47",
		site: "http://lockhunt.com",
	},
	{
		name: "Escape Istanbul",
		cordinates: {lat: 40.9881588, lng: 29.0314334},
		phone: "+90 (532) 392 0317",
		site: "http://escapeistanbul.com.tr",
	},
	{
		name: "MazeUp",
		cordinates: {lat: 41.033063, lng: 28.9817593},
		phone: "+90 (212) 243 7645",
		site: "http://www.mazeup.com",
	},
	{
		name: "Escapist",
		cordinates: {lat: 41.068075, lng: 28.9901813},
		phone: "+90 (212) 272 71 50",
		site: "http://www.escapist.com.tr",
	},
	{
		name: "Odadan KAÇIŞ",
		cordinates: {lat: 41.0358513, lng: 28.9808805},
		phone: "+90 (546) 865 20 14",
		site: "http://odadankacis.com",
	},
	{
		name: "Panic House",
		cordinates: {lat: 41.03463, lng: 28.9429093},
		phone: "+90 (216) 346 61 97",
		site: "http://thepanichouse.com",
	},
	{
		name: "Tuzak Oyunu",
		cordinates: {lat: 40.9882028, lng: 29.0193094},
		phone: "+90 (216) 336 11 00",
		site: "http://tuzak.com",
	}
];

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: istanbul
	});
	google.maps.event.addListener(map, 'click', function(e) {
		closeDetails();
		stopAnimations();
	});

	for (var i=0; i < escapeRooms.length; i++) {
    	var marker = new google.maps.Marker({
			position: escapeRooms[i].cordinates,
    		map: map,
    		title: escapeRooms[i].name,
			animation: google.maps.Animation.DROP,
			icon: "images/marker.png"
    	});

    	var infoWindow = new google.maps.InfoWindow({
      		content: "<h2 class='title'>"+ escapeRooms[i].name +"</h2><p class='description'>"+ escapeRooms[i].phone +"</p><a href='"+ escapeRooms[i].site +"' target='_blank' class='site'>"+ escapeRooms[i].site +"</a>"
    	});

    	marker.addListener('click', (function(currentMarker, infoWindowCopy){
        	return function(){
          		closeDetails();
          		infoWindowCopy.open(map, currentMarker);
          		stopAnimations();
          		startAnimation(currentMarker);
        	};
      		})(marker, infoWindow));

      		escapes.push(marker);
      		windowDetails.push(infoWindow);
    	}
}

// function to close detail windows
var closeDetails = function() {
    for (var i in windowDetails) {
        windowDetails[i].close();
    }
};

// function to Stop animating the markers
var stopAnimations = function() {
    for (var i in escapes) {
        escapes[i].setAnimation(null);
    }
};

// functions to Start animating the markers
var startAnimation = function(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
};