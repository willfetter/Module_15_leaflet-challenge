// Create the 'basemap' tile layer that will be the background of our map.
var defaultMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // greyscale layer
    var grayscale = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png'
    });

    // worldimagery layer
    var aerial = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      minZoom: 0,
      maxZoom: 20,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Topo layer
    var topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Watercolor Layer
    var waterColor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
      minZoom: 1,
      maxZoom: 16,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'jpg'
    });

//make a basemap object
let basemaps = {
  Default: defaultMap,
  Grayscale: grayscale,
  Aerial: aerial,
  TopMap: topoMap,
  "Water Color": waterColor
};

// Create the map object with center and zoom options. 
//center on california as this is where many earthquakes happen in US
var myMap = L.map("map", {
  center: [36.7783, -119.4179],
  zoom: 5,
layers: [grayscale, aerial, topoMap, waterColor, defaultMap]
});
  
//add default tile layer to the map.
defaultMap.addTo(myMap);

// get data for the tectonic plates and draw on the map
//variable to hold the textonic plates layers
let tectonicplates = new L.layerGroup();

//call the api to get ther infor for the tectonic plates
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
.then(function(plateData){
    //console log to see if data loads
    //console.log(plateData);

    // load the data using geoJson and add to the tectonic plates using layer group
    L.geoJson(plateData,{
      // add stylingf to make the lines visible
      color: "yellow",
      weight: 1
    }).addTo(tectonicplates);
});

// add the tectonic plates to the map
tectonicplates.addTo(myMap);


//variable to hold the earthquake data layer
let earthquakes = new L.layerGroup();

// get the data for the earthquakes and populates the layergroup
// make a call to USGS GeoJson API
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(
  function(earthquakeData){
    //console log to see if data loads
    // console.log(earthquakeData);
    // plot circles where radius is dependent on magnitude
    // circle color is dependent on depth

    // make a function that chooses the color of the data point
    function dataColor(depth){
      if (depth > 90)
        return "red";
      else if(depth > 70)
        return "#fc4903";
      else if(depth > 50)
        return "#fc8403";
      else if(depth > 30)
        return "#fcad03"
      else if(depth > 10)
        return "#cafc03"
      else 
        return "green";
    } 

    // make a function that detgermines the size of the radius
    function radiusSize(mag){
      if (mag == 0)
        return 1; // makes sure that a 0 mag earthquake shows up
      else
        return mag * 5; // makes sure that the circle is pronounced in the map
    }

    // add on the style for each data point
    function dataStyle(feature)
    {
      return{
        opacity: 0.5,
        fillOpacity: 0.5,
        fillColor: dataColor(feature.geometry.coordinates[2]), // use index 2 for the depth
        color: "00000", // black outline

        radius: radiusSize(feature.properties.mag), // grabs magnitude 
        weight: 0.5,
        stroke: true
      }
    }

    // add the geoJson Data
    L.geoJson(earthquakeData, {
      // make each feature a marker that is on the map, each marker is a circle
      pointToLayer: function(feature, latLng) {
        return L.circleMarker(latLng);
      },
      // set the style for each marker
      style: dataStyle, // calls the data style function and passes in the earthquake data 
      // add popups
      onEachFeature: function(feature, layer) {
        layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                        Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                        Location: <b>${feature.properties.place}</b>`);
      }

    }).addTo(earthquakes);
  }
  
);

// add the earthquake layer to the map
earthquakes.addTo(myMap);

// add the overlay for the tectonic plates
let overlays = {
  "Tectonic Plates": tectonicplates,
  "Earthquake Data": earthquakes
};

//Add layer control
L.control
  .layers(basemaps, overlays)
  .addTo(myMap);

// add the depth legend to the map
var legend = L.control({
  position: "bottomright"
});

// add the properties for the legend
legend.onAdd = function(map) {
  // div for the legend to appear in the page
  var div = L.DomUtil.create("div", "info legend");

  // set up the intervals
  var intervals = [-10, 10, 30, 50, 70, 90];
  // set the olors for the intervals
  var colors = [
    "green", 
    "#caffc03",
    "#fcad03",
    "#fc8403",
    "#fc4903",
    "red"
  ];

  // Loop through the depth intervals to associate a color with each interval.
  for (var i = 0; i < intervals.length; i++) {
    div.innerHTML += '<i style="background:'
    + colors[i]
    + '"></i> ' 
    + intervals[i] 
    + (intervals[i + 1] ? "&ndash;" + intervals[i + 1] + " km" + "<br>" : "+ km");}
    return div;};
  
// add the legend to the map 
legend.addTo(myMap);
  
  
/*
for (var i = 0; i < intervals.length; i++) {
  div.innerHTML += '<i style="background:'
  + colors[i]
  + '"></i> ' 
  + intervals[i] 
  + (intervals[i + 1] ? "&ndash;" + intervals[i + 1] + " km" + "<br>" : "+ km");}
  return div;};
  */
  
  
  /*
  // loop through the intervals and the colors to generate a lable with colored square for each inteval
  for(var i = 0; i < intervals.length; i++)
  {
    // iner html that sets the square for each interval and label
    div.innerHTML += '<i style="background:'
      + colors[i]
      + '"></i> '
      + intervals[i]
      + (intervals[i + 1] ? 'km &ndash km;' + intervals[i + 1] + 'km<br>' : '+');
  }

  return div;
};

// add the legend to the map 
legend.addTo(myMap);
*/
