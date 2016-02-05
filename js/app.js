/** Google Maps API failure */
var googleError = function() {
    $("main").text("There was a problem conecting with Google Maps, please try again.");
};

/** Google Maps API Succeeds */
var initMap = function () {

    var istanbul = {lat: 41.0189379, lng: 28.9780248};

    /** MODEL */
    var escapeRooms = [
        {
            id: "istrapped",
            name: "Is Trapped",
            coordinates: {lat: 41.030416, lng: 28.974064},
            phone: "+90 (212) 244 25 46",
            site: "http://www.istrapped.com",
            fqId: "534d034b11d2287a6cf0327f"
        },
        {
            id: "cage404",
            name: "Cage 404",
            coordinates: {lat: 41.033301, lng: 28.979367},
            phone: "+90 (212) 243 97 22",
            site: "http://www.cage404.com",
            fqId: "5447bb04498e693166e4a0d9"
        },
        {
            id: "defusebomb",
            name: "Defuse Bomb",
            coordinates: {lat: 40.987339, lng: 29.027853},
            phone: "+90 (216) 418 95 16",
            site: "http://www.defusebomb.com",
            fqId: "5426d6f0498eabdbcf7f28e0"
        },
        {
            id: "beeescape",
            name: "Bee Escape",
            coordinates: {lat: 41.034508, lng: 28.9795373},
            phone: "+90 (212) 243 05 73",
            site: "http://beeescape.com",
            fqId: "5681663d498e9b9cf4c40e3e"
        },
        {
            id: "escapeplanet",
            name: "Escape Planet",
            coordinates: {lat: 41.039167, lng: 28.9821393},
            phone: "+90 (212) 235 37 58",
            site: "http://www.escapeplanet.com",
            fqId: "5433efa1498efb6b9d177e3a"
        },
        {
            id: "lockhunt",
            name: "Lock Hunt",
            coordinates: {lat: 41.0464073, lng: 29.0048375},
            phone: "+90 (212) 227 77 47",
            site: "http://lockhunt.com",
            fqId: "54b3fca9498ebd3314be0c76"
        },
        {
            id: "escapeistanbul",
            name: "Escape Istanbul",
            coordinates: {lat: 40.9881588, lng: 29.0314334},
            phone: "+90 (532) 392 0317",
            site: "http://escapeistanbul.com.tr",
            fqId: "555b33ab498e69da3ac9d868"
        },
        {
            id: "mazeup",
            name: "MazeUp",
            coordinates: {lat: 41.033063, lng: 28.9817593},
            phone: "+90 (212) 243 7645",
            site: "http://www.mazeup.com",
            fqId: "mazeupofficial"
        },
        {
            id: "escapist",
            name: "Escapist",
            coordinates: {lat: 41.068075, lng: 28.9901813},
            phone: "+90 (212) 272 71 50",
            site: "http://www.escapist.com.tr",
            fqId: "54ef96e2498ec36f92eded49"
        },
        {
            id: "odadankacis",
            name: "Odadan KAÇIŞ",
            coordinates: {lat: 41.0358513, lng: 28.9808805},
            phone: "+90 (546) 865 20 14",
            site: "http://odadankacis.com",
            fqId: "53f3d273498eb61039d6c210"
        },
        {
            id: "panichouse",
            name: "Panic House",
            coordinates: {lat: 41.03463, lng: 28.9429093},
            phone: "+90 (216) 346 61 97",
            site: "http://thepanichouse.com",
            fqId: "54bd649f498ea3c0de7a5504"
        },
        {
            id: "tuzakoyunu",
            name: "Tuzak Oyunu",
            coordinates: {lat: 40.9882028, lng: 29.0193094},
            phone: "+90 (216) 336 11 00",
            site: "http://tuzak.com",
            fqId: "53fb33e8498e5ac687b7f4fb"
        }
    ];

    /** Creating Map */
    var createMap = function () {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: istanbul,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            }
        });

        escapeRooms.forEach(function (marker) {
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
        self.FourSqState = ko.observable(true);
        self.photosFourSq = ko.observableArray();
        self.markersList = [];
        self.FourSqUrl = ko.observable();
        self.markerName = ko.observable();

        /** Creating List of markers */
        escapeRooms.forEach(function (marker) {
            //marker.setAnimation(google.maps.Animation.DROP);
            self.filteredMarkers.push(marker);
        });

        /** Selecting item on menu lists */
        self.isSelected = function(marker) {
            if(self.itemSelected()) {
                return self.itemSelected() == marker;
            }
        }

        /** Creating Markers */
        var createMarkers = function (marker) {

            var markersArray = [];
            var position = new google.maps.LatLng({lat: marker.coordinates.lat, lng: marker.coordinates.lng});
            var phone = "<a href='tel:" + marker.phone + "' target='_top' class='phone'>" + marker.phone + "</a>";
            var site = "<a href='" + marker.site + "' target='_blank' class='site'>" + marker.site + "</a>";
            var fqSite = "<a href='" + self.FourSqUrl + "' target='_blank' class='fqSite'>More details in FourSquare &raquo; </a>";
            var streetView = "https://maps.googleapis.com/maps/api/streetview?size=280x100&location=" + marker.coordinates.lat + ", " + marker.coordinates.lng + "&heading=100&pitch=28&scale=2";


            /** Testing active marker to add/remove class at lists */
            if (self.markersList.length !== 0) {
                self.markersList.forEach(function (marker) {
                    marker.setAnimation(null);
                    marker.setIcon("images/marker.png");
                });
            }

            self.markerName(marker.name);
            self.showFourSq(marker.id);

            var infoWindowContent =  "<div class='infoWindow' id='info-" + marker.id + "'><h2 class='title'>" + marker.name + "</h2>"+ phone + site + "<img class='img-responsive' src='" + streetView + "' alt='" + marker.name + "' />"+ fqSite + "</div>";
            infoWindow.setContent(infoWindowContent);


            self.picsFourSq(marker);
            infoWindow.open(map, marker);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            marker.setIcon("images/markerSelected.png");
            map.setCenter(position);

            infoWindow.addListener('closeclick', function () {
                self.hideFourSq();
                marker.setAnimation(null);
                marker.setIcon("images/marker.png");
            });
        };

        self.showFourSq = function (marker) {
            /** Showing Instagram Pictures */
            if (self.FourSqState) {
                $("#foursq").animate({height: 'toggle'}, "slow");
                self.FourSqState = false;

                /** Change CSS on the list */
                self.itemSelected(marker);
            }
        }

        self.hideFourSq = function () {
            /** Hiding Instagram Pictures */
            if (!self.FourSqState) {
                $("#foursq").animate({height: 'toggle'}, "slow");
                self.FourSqState = true;

                /** Change CSS on the list */
                self.itemSelected(null);
            }
        };

        /** Getting pictures from FourSquare */
        self.picsFourSq = function (marker) {
            $.ajax({
                dataType: "json",
                url: "https://api.foursquare.com/v2/venues/" + marker.fqId + "?client_id=QXOXJTGHTYCPXFKPE32Q0RMTBH1F1WH40EJ3MTEQO422IQCJ&client_secret=J4P4DIUPE2SC4MPLDPF2KZYH1IVKT5UJIJZFEGSII3E5P4RA&v=20130815",
                success: function (data) {

                    document.getElementById("foursq").innerHTML = "";

                    var dataFourSq = data.response.venue;

                    self.FourSqUrl = dataFourSq.canonicalUrl;

                    /** Removing pictures from array and adding ones from marker selected */
                    self.photosFourSq.removeAll();
                    var photos = dataFourSq.photos.groups[0].items;
                    for (var i = 0; i < photos.length; i++) {
                        if (photos[i].visibility == "public") {
                            self.photosFourSq.push({ thumb: photos[i].prefix + "250x250" + photos[i].suffix, larger: photos[i].prefix + "830x830" + photos[i].suffix, id: photos[i].suffix.slice(0,-4).replace("/","")});
                        }
                    }
                },
                error: function (e) {
                    document.getElementById("foursq").innerHTML = "<h4>Foursquare photos are unavailable. Please try refreshing later.</h4>";
                }
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

            self.hideFourSq();
            self.filteredMarkers.removeAll();
            self.markersList.forEach(function (marker) {
                marker.setMap(null);
                marker.setAnimation(null);
            });
            map.setCenter(istanbul);
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

            self.hideFourSq();
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