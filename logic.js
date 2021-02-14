// mapbox. calls on map.

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var basicMap = {
    "Light Map": lightmap
};

var map = L.map("map", {
    center: [40, -120],
    zoom: 4.5,
    layers: [lightmap]
});

var legend = L.control({
    position: "bottomright"
});

legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");

// style - pretty colors
    // div.innerHTML += '<i style="background: #ff00ff"></i><span>0-1</span><br>';
    // div.innerHTML += '<i style="background: #8000ff"></i><span>1-2</span><br>';
    // div.innerHTML += '<i style="background: #ff0080"></i><span>2-3</span><br>';
    // div.innerHTML += '<i style="background: #ff4dff"></i><span>3-4</span><br>';
    // div.innerHTML += '<i style="background: #4d4dff"></i><span>4-5</span><br>';
    // div.innerHTML += '<i style="background: #1a1aff"></i><span>5+</span><br>';

//style - more informative colors
    div.innerHTML += '<i style="background: #00ffbf"></i><span>0-1</span><br>';
    div.innerHTML += '<i style="background: #ffff00"></i><span>1-2</span><br>';
    div.innerHTML += '<i style="background: #ff8000"></i><span>2-3</span><br>';
    div.innerHTML += '<i style="background: #ff0000"></i><span>3-4</span><br>';
    div.innerHTML += '<i style="background: #868679"></i><span>4-5</span><br>';
    div.innerHTML += '<i style="background: #000000"></i><span>5+</span><br>';
    
    return div;
};

legend.addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(response){
    var datapts = response.features
    
//color categories
    var mags = [1,2,3,4,5,6]
    var circles = d3.scaleOrdinal().domain(mags)
    
    //style - pretty colors
    // .range(["#ff00ff","#8000ff","#ff0080","#ff4dff","#4d4dff","#1a1aff"]);

    //style - more informative colors
    .range(["#00ffbf","#ffff00","#ff8000","#ff0000","#868679","#000000"]);
    
var sizeCircle = d3.scaleLinear().domain([0,9]).range([4000,120000]);

    function returnMag(mag){
        if (mag < 1) {
            return 1;
        }   else if(mag < 2){
            return 2;
        }   else if(mag < 3){
            return 3;
        }   else if(mag < 4){
            return 4;
        }   else if(mag < 5){
            return 5;
        }   else {
            return 6;
        }
    };

    //gets rid of negative magnitude earthquake
    function returnSize(mag){
        if (mag < 0.1){
            return 0.1;
        } else{
            return mag;
        }
    }

    datapts.forEach(function(earthquake){
        var color = circles(returnMag(earthquake.properties.mag))
        var size = sizeCircle(returnSize(earthquake.properties.mag))
        console.log(size)

        var newCircle = L.circle([earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]],{
            color: "black",
            weight: 0.5,
            fillColor: color,
            fillOpacity:0.6,
            radius: size
        }).addTo(map);

        newCircle.bindTooltip(`Magnitude: ${earthquake.properties.mag}<br/>Lat:${earthquake.geometry.coordinates[1]}<br/>Long:${earthquake.geometry.coordinates[0]}`)

    });

});