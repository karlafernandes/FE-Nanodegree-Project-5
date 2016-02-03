/** Google Maps API failure */
var googleError = function() {
	$("main").text("There was a problem conecting with Google Maps, please try again.");
};

/** Google Maps API Succeeds */
var initMap = function () {

    var istanbul = {lat: 41.0099973, lng: 28.9830769};

    /** MODEL */
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

    /** Creating Map */
    var createMap = function () {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: istanbul,
        });

        escapeRooms.forEach(function (marker) {
            //console.log(marker);
            marker.map = map;
            marker.id = marker.id;
            marker.name = marker.name;
            marker.icon = "images/marker.png";
            marker.position = new google.maps.LatLng(marker.coordinates.lat, marker.coordinates.lng);
        });

        infoWindow = new google.maps.InfoWindow();
        ko.applyBindings(new ViewModel());
    };

    /** ViewModel */
    var ViewModel = function () {

        var self = this;

        self.userSearch = ko.observable('');
        self.filteredMarkers = ko.observableArray();
		self.itemSelected = ko.observable();
		self.markersList = [];

        /** Creating List of markers */
        escapeRooms.forEach(function (marker) {
			//marker.setAnimation(google.maps.Animation.DROP);
            self.filteredMarkers.push(marker);
        });

		/** Selecting item on menu lists */
		self.isSelected = function(marker) {
	        var selectedMarker = self.itemSelected();
	        if(selectedMarker) {
	            return self.itemSelected() == marker;
	        }
	    }

		/** Creating Markers */
        var createMarkers = function (marker) {

            var markersArray = [];

            /** Testing active marker to add/remove class at lists */
            if (self.markersList.length !== 0) {
                self.markersList.forEach(function (marker) {
                    marker.setAnimation(null);
                    marker.setIcon("images/marker.png");
                });
            }

            marker.setAnimation(google.maps.Animation.BOUNCE);

            var position = new google.maps.LatLng({lat: marker.coordinates.lat, lng: marker.coordinates.lng});
            var phone = "<a href='tel:" + marker.phone + "' target='_top' class='phone'>" + marker.phone + "</a>";
            var site = "<a href='" + marker.site + "' target='_blank' class='site'>" + marker.site + "</a>";
            var streetView = "https://maps.googleapis.com/maps/api/streetview?size=280x100&location=" + marker.coordinates.lat + ", " + marker.coordinates.lng + "&heading=100&pitch=28&scale=2";

            var infoWindowContent = "<div class='infoWindow' id='info-" + marker.id + "'><h2 class='title'>" + marker.name + "</h2>" + phone + site + "<img src='" + streetView + "' /></div>";
            infoWindow.setContent(infoWindowContent);

            infoWindow.open(map, marker);
            marker.setIcon("images/markerSelected.png");
            map.setCenter(position);

            infoWindow.addListener('closeclick', function () {
                marker.setAnimation(null);
                marker.setIcon("images/marker.png");
            });
        };

        /** Setting markers function on click */
        self.setMarkers = function () {
            for (var i = 0; i < self.filteredMarkers().length; i++) {
                var marker = new google.maps.Marker(self.filteredMarkers()[i]);
                marker.addListener('click', (function (marker, i) {
                    return function () {
                        createMarkers(marker);
                    };
                })(marker, i));
                self.markersList.push(marker);
            }
        };
        self.setMarkers();

        /** Displays information of marker selected on the lists */
        self.infoMarker = function (marker) {
            var markerIndex = self.filteredMarkers().indexOf(marker);
            var markerObject = self.markersList[markerIndex];
            createMarkers(markerObject);

			/** Change CSS on the list */
			self.itemSelected(marker.id);

			/** Toggling mobile menu when clicked on the list */
			$(document).on('click','.navbar-collapse.in',function(e) {
			    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
			        $(this).collapse('hide');
			    }
			});
			
        };

        /** Show every marker */
        self.showMarkers = function () {
            self.filteredMarkers.removeAll();
            self.markersList.forEach(function (marker) {
                marker.setMap(null);
				marker.setAnimation(null);
				console.log("1");
            });
            self.markersList = [];
            escapeRooms.filter(function (marker) {
           		self.filteredMarkers.push(marker);
            });
            self.setMarkers();

			document.getElementById('search-markers').value = '';
			document.getElementById('search-button').classList.add('disabled');			
        };

        /** Filtering the lists of escape rooms */
        self.searchMarkers = function () {
            self.filteredMarkers.removeAll();
            var query = this.userSearch().toLowerCase();
            self.markersList.forEach(function (marker) {
                marker.setMap(null);
            });
            self.markersList = [];
            escapeRooms.filter(function (marker) {
                if (marker.name.toLowerCase().indexOf(query) >= 0) {
                    self.filteredMarkers.push(marker);
                }
            });
            self.setMarkers();
		
			document.getElementById('search-button').classList.remove('disabled');			
        };

    };

    /** Calling function to create Map */
    createMap();
};