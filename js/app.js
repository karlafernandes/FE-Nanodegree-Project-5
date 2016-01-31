var escapes = [];
var windowDetails = [];
var istanbul = {lat: 41.0099973, lng: 28.9830769};

/** MODEL **/
var escapeRooms = [
	{
		id: "istrapped",
		name: "Is Trapped",
		coordinates: {lat: 41.030416, lng: 28.974064},
		phone: "+90 (212) 244 25 46",
		site: "http://www.istrapped.com",
	},
	{
		id: "cage404",
		name: "Cage 404",
		coordinates: {lat: 41.033301, lng: 28.979367},
		phone: "+90 (212) 243 97 22",
		site: "http://www.cage404.com",
	},
	{
		id: "defusebomb",
		name: "Defuse Bomb",
		coordinates: {lat: 40.987339, lng: 29.027853},
		phone: "+90 (216) 418 95 16",
		site: "http://www.defusebomb.com",
	},
	{
		id: "enigmaroomscape",
		name: "Enigma Room Scape",
		coordinates: {lat: 41.034194, lng: 28.981124},
		phone: "+90 0212 963 01 47",
		site: "http://enigmaroomescape.com",
	},
	{
		id: "beeescape",
		name: "Bee Escape",
		coordinates: {lat: 41.034508, lng: 28.9795373},
		phone: "+90 (212) 243 05 73",
		site: "http://beeescape.com",
	},
	{
		id: "escapeplanet",
		name: "Escape Planet",
		coordinates: {lat: 41.039167, lng: 28.9821393},
		phone: "+90 (212) 235 37 58",
		site: "http://www.escapeplanet.com",
	},
	{
		id: "lockhunt",
		name: "Lock Hunt",
		coordinates: {lat: 41.0464073, lng: 29.0048375},
		phone: "+90 (212) 227 77 47",
		site: "http://lockhunt.com",
	},
	{
		id: "escapeistanbul",
		name: "Escape Istanbul",
		coordinates: {lat: 40.9881588, lng: 29.0314334},
		phone: "+90 (532) 392 0317",
		site: "http://escapeistanbul.com.tr",
	},
	{
		id: "mazeup",
		name: "MazeUp",
		coordinates: {lat: 41.033063, lng: 28.9817593},
		phone: "+90 (212) 243 7645",
		site: "http://www.mazeup.com",
	},
	{
		id: "escapist",
		name: "Escapist",
		coordinates: {lat: 41.068075, lng: 28.9901813},
		phone: "+90 (212) 272 71 50",
		site: "http://www.escapist.com.tr",
	},
	{
		id: "odadankacis",
		name: "Odadan KAÇIŞ",
		coordinates: {lat: 41.0358513, lng: 28.9808805},
		phone: "+90 (546) 865 20 14",
		site: "http://odadankacis.com",
	},
	{
		id: "panichouse",
		name: "Panic House",
		coordinates: {lat: 41.03463, lng: 28.9429093},
		phone: "+90 (216) 346 61 97",
		site: "http://thepanichouse.com",
	},
	{
		id: "tuzakoyunu",
		name: "Tuzak Oyunu",
		coordinates: {lat: 40.9882028, lng: 29.0193094},
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
			id: escapeRooms[i].id,
			position: escapeRooms[i].coordinates,
			map: map,
			title: escapeRooms[i].name,
			animation: google.maps.Animation.DROP,
			icon: "images/marker.png"
    	});
		
		var phone = "<a href='tel:" + escapeRooms[i].phone + "' target='_top' class='phone'>" + escapeRooms[i].phone + "</a>";
		var site = "<a href='" + escapeRooms[i].site + "' target='_blank' class='site'>" + escapeRooms[i].site + "</a>";
		
		var streetView = "https://maps.googleapis.com/maps/api/streetview?size=280x100&location=";
		streetView += escapeRooms[i].coordinates.lat + ", " + escapeRooms[i].coordinates.lng;
		streetView += "&heading=100&pitch=28&scale=2";
		
    	var infoWindow = new google.maps.InfoWindow({
			content: "<div class='infoWindow'><h2 class='title'>"+ escapeRooms[i].name +"</h2>"+ phone + site + "<img src='" + streetView + "' /></div>",
    	});

/*
	    var buttons = document.getElementById('buttons');
		button = document.createElement('button');
	    button.textContent = escapeRooms[i].name;
		button.id = escapeRooms[i].id;
		button.name = 'inactive';	
		button.classList.add('btn', 'btn-default', 'btn-lg');
		var buttonSelected = null;
		*/
		
		var itemSelected = null;
		var listButtons = document.getElementById("listButtons");
				
		var itemList = document.createElement('li');
		itemList.id = 'list-'+escapeRooms[i].id;
		
		var itemListA = document.createElement("a");
        itemListA.textContent = escapeRooms[i].name;
        
		var itemListB = document.createElement("li");
        itemListB.classList.add('divider');
		
		itemList.appendChild(itemListA);
		
		/*
		var node = document.createElement("li");
		
		var itemList = document.createElement("a");
        itemList.textContent = escapeRooms[i].name;
		itemList.id = 'list'+escapeRooms[i].id;
		itemList.classList.add('list-group-item');
		
		node.appendChild(itemList); 
		document.getElementById("myList").appendChild(node);
		*/
		
		/*
        itemList.textContent = escapeRooms[i].name;
		itemList.id = 'list'+escapeRooms[i].id;
		itemList.classList.add('list-group-item');
		*/
		
		var itemSelected = null;
		
        itemList.addEventListener('click', (function(currentMarker, infoWindowCopy){
        	return function(){
				if (itemSelected !== null) {
					itemSelected.classList.remove('active');
				}
				itemSelected = document.getElementById('list-'+currentMarker.id);
				itemSelected.classList.add('active');
				
          		closeDetails();
          		infoWindowCopy.open(map, currentMarker);
          		stopAnimations();
          		startAnimation(currentMarker);
        	};
      		})(marker, infoWindow));

        // finally, add the element to the list
        this.listButtons.appendChild(itemList);
        this.listButtons.appendChild(itemListB);



/*
		button.addEventListener('click', (function(currentMarker, infoWindowCopy, buttonCopy) {
            return function() {	
				if (buttonSelected !== null) {
					buttonSelected.classList.remove('active');
				}
				buttonCopy.classList.add('active');
				buttonSelected = document.getElementById(buttonCopy.id);
				
          		closeDetails();
          		infoWindowCopy.open(map, currentMarker);
          		stopAnimations();
          		startAnimation(currentMarker);
            };
        })(marker, infoWindow, button));

		this.buttons.appendChild(button);
		
		*/

    	marker.addListener('click', (function(currentMarker, infoWindowCopy){
        	return function(){
				console.log(currentMarker);
				if (itemSelected !== null) {
					itemSelected.classList.remove('active');
				}
				itemSelected = document.getElementById('list-'+currentMarker.id);
				itemSelected.classList.add('active');
				console.log("E " + itemSelected);
				
				/*
				var buttonSelected = document.getElementById(currentMarker.id);
				buttonSelected.classList.add('active');
				*/
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