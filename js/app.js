var initMap = function() {

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
]

/** Creating marker with data provided **/
var createMarker = function (marker) {
    this.marker = new google.maps.Marker({
        id: marker.id,
        position: new google.maps.LatLng(marker.coordinates.lat, marker.coordinates.lng),
        map: map,
        title: marker.name,
        animation: google.maps.Animation.DROP,
        icon: "images/marker.png"
    });
	//createInfoWindow(marker);
	
	var position = new google.maps.LatLng({lat: marker.coordinates.lat, lng: marker.coordinates.lng});
	
    this.phone = "<a href='tel:" + marker.phone + "' target='_top' class='phone'>" + marker.phone + "</a>";
    this.site = "<a href='" + marker.site + "' target='_blank' class='site'>" + marker.site + "</a>";
    this.streetView = "https://maps.googleapis.com/maps/api/streetview?size=280x100&location=" + marker.coordinates.lat + ", " + marker.coordinates.lng + "&heading=100&pitch=28&scale=2";

    infoWindow = new google.maps.InfoWindow({
        content: "<div class='infoWindow' id='info-" + marker.id + "'><h2 class='title'>" + marker.name + "</h2>" + this.phone + this.site + "<img src='" + this.streetView + "' /></div>",
        position: {lat: (marker.coordinates.lat + 0.0065), lng: marker.coordinates.lng}
    });

	/** Closing infoWindow and opening the one clicked **/
	this.marker.addListener('click', function() {
		if (infoWindow) {
            infoWindow.close();
			//this.currentMarker(marker);
			this.setIcon("images/marker.png"); 
			this.setAnimation(null);
        }
		map.setCenter(this.position);
		createInfoWindow(marker).open(map);
		this.setIcon("images/markerSelected.png"); 
		this.setAnimation(google.maps.Animation.BOUNCE);
		//createAnimation(this.marker);	
	});
}

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

/** Trying to create animation - always an error: Uncaught TypeError: Cannot read property 'setAnimation' of undefined **/
var createAnimation = function (marker) {
	console.log(marker);
	//marker.setAnimation(google.maps.Animation.BOUNCE);
}

/** Creating infoWindows with data from Array and Streetview **/
var createInfoWindow = function (marker) {
    var position = new google.maps.LatLng({lat: marker.coordinates.lat, lng: marker.coordinates.lng});

    this.phone = "<a href='tel:" + marker.phone + "' target='_top' class='phone'>" + marker.phone + "</a>";
    this.site = "<a href='" + marker.site + "' target='_blank' class='site'>" + marker.site + "</a>";
    this.streetView = "https://maps.googleapis.com/maps/api/streetview?size=280x100&location=" + marker.coordinates.lat + ", " + marker.coordinates.lng + "&heading=100&pitch=28&scale=2";

    infoWindow = new google.maps.InfoWindow({
        content: "<div class='infoWindow'><h2 class='title'>" + marker.name + "</h2>" + this.phone + this.site + "<img src='" + this.streetView + "' /></div>",
        position: {lat: (marker.coordinates.lat + 0.0065), lng: marker.coordinates.lng}
    });

	createAnimation(this);
	
    return infoWindow;
}

/** Creating Map **/
var createMap = function (idMap, centerMap) {
    this.map = new google.maps.Map(document.getElementById(idMap, centerMap), {
        zoom: 13,
        center: centerMap,
		mapTypeControl: false
    });
};

var ViewModel = function () {

    var self = this;

    createMap("map", istanbul);

    this.markersList = ko.observableArray();
    this.filteredMarkers = ko.observableArray();
    this.markersData = ko.observableArray();
    this.userSearch = ko.observable('');
    this.infoWindow = ko.observable('');
	this.currentMarker = ko.observable('');

    var itemSelected = null;
    var itemSelected2 = null;

	/** Creating Markers with the escapeRooms list **/
    escapeRooms.forEach(function (marker) {
        self.markersList.push(new createMarker(marker));
        self.filteredMarkers.push(marker);
    });

	/** Closing infoWindown and exchanging Class to style on the lists the marker selected **/
	/*
    this.infoMarker = function (marker) {
        if (infoWindow) {
            infoWindow.close();
        }

        if (itemSelected !== null) {
            itemSelected.classList.remove('active');
        }
        itemSelected = document.getElementById('list-' + marker.id);
        itemSelected.classList.add('active');

        if (itemSelected2 !== null) {
            itemSelected2.classList.remove('active');
        }
        itemSelected2 = document.getElementById('list2-' + marker.id);
        itemSelected2.classList.add('active');

        createInfoWindow(marker).open(map);
    };
	*/
	
	// function to close detail windows
	this.closeDetails = function(marker) {
	    escapeRooms.forEach(function (marker) {
			var markerName = document.getElementById('list-' + marker.id);
			markerName.setIcon("images/marker.png"); 
			markerName.setAnimation(null);
			console.log(markerName);
			if (markerName) {
				markerName.close();
			}
	    });
	};
	
	
	/** Filtering the lists of escape rooms **/
    this.searchMarkers = function () {
        self.filteredMarkers.removeAll();
        var query = this.userSearch().toLowerCase();
        return escapeRooms.filter(function (marker) {
            if (marker.name.toLowerCase().indexOf(query) >= 0) {
                self.filteredMarkers.push(marker);
            }
        });
    };
};

ko.applyBindings(new ViewModel());
};