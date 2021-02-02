var map = L.map('map').setView([0, 0], 1);

//I didn't use mapbox, I used maptiler. I couldn't make mapbox to work.

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=5r2i4wMCCG7RMctvDMfT', {
attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

var marker = L.marker([51.5, -0.09], {
draggable: true,
title: "marker"})
.addTo(map);

// geojson online link: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson
// i cannot get it to work though
var link = "earthquake.geojson";

// I got an error: Uncaught ReferenceError: d3 is not defined
d3.json(link, function(data){
console.log(data)
L.geoJSON(data).addTo(map);
});
