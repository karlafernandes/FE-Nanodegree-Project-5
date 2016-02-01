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

var createMarker = function (data) {
    this.marker = new google.maps.Marker({
        id: data.id,
        position: new google.maps.LatLng(data.coordinates.lat, data.coordinates.lng),
        map: map,
        title: data.name,
        animation: google.maps.Animation.DROP,
        icon: "images/marker.png"
    });
    createInfoWindow(data);
}

var createInfoWindow = function (data) {
    var position = new google.maps.LatLng({lat: data.coordinates.lat, lng: data.coordinates.lng});

    this.phone = "<a href='tel:" + data.phone + "' target='_top' class='phone'>" + data.phone + "</a>";
    this.site = "<a href='" + data.site + "' target='_blank' class='site'>" + data.site + "</a>";
    this.streetView = "https://maps.googleapis.com/maps/api/streetview?size=280x100&location=" + data.coordinates.lat + ", " + data.coordinates.lng + "&heading=100&pitch=28&scale=2";

    infoWindow = new google.maps.InfoWindow({
        content: "<div class='infoWindow'><h2 class='title'>" + data.name + "</h2>" + this.phone + this.site + "<img src='" + this.streetView + "' /></div>",
        position: {lat: (data.coordinates.lat + 0.0065), lng: data.coordinates.lng}
    });

    return infoWindow;
}

var createMap = function (idMap, centerMap) {
    this.map = new google.maps.Map(document.getElementById(idMap, centerMap), {
        zoom: 13,
        center: centerMap
    });
};

var ViewModel = function () {

    var self = this;

    createMap("map", istanbul);

    this.markersList = ko.observableArray();
    this.filteredMarkers = ko.observableArray();
    this.userSearch = ko.observable('');
    this.infoWindow = ko.observable('');
    var itemSelected = null;
    var itemSelected2 = null;

    escapeRooms.forEach(function (marker) {
        self.markersList.push(new createMarker(marker));
        self.filteredMarkers.push(marker);
    });

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

        console.log(marker);
        createInfoWindow(marker).open(map);
        //marker.setAnimation(google.maps.Animation.BOUNCE);
    };

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