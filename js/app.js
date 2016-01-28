function initMap() {
  var uluru = {lat: 41.0099973, lng: 28.9830769};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru
  });

  var contentString = '<h1 id="firstHeading" class="firstHeading">Istanbul</h1><h2>Escape Rooms Map</h2>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'Istanbul > Escape Rooms Map',
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}


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
cordinates: {lat: 41.0143, lng: 28.9878494},
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

for ( var i=0; i < escapeRooms.length; i++) {
	console.log(escapeRooms[i]);
};


