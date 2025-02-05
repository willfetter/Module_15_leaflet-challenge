// choose the past 7 days dataset for all earthquakes
// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// perform a GET request to the query URL
d3.json(queryUrl).then(function(data){
    // once a response is obtained, send data.features object to createFeatures function
    createFeatures(data.features);
});

function createFeatures(quakeData){
    // define function for the features in the array
    // create popup that describes the place, time, magintude, and depth of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<h4> Magnitude: " + feature.properties.mag + "</h4>");
      }
}



// set size of markers for the map

