var map = L.map("map", {
    center: [40.86666667, 40.86666667],
    zoom: 11
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);


d3.json("human_trafficking.json").then((data) => {
  var traffickingCountries = data.yearOfRegistration;
  console.log(traffickingCountries);
});



// function colorCountry(id) {
//   for (var i = 0; i < human_trafficking.length; i++) {
//     var countryList = human_trafficking.citizenship;
//     console.log(countryList);
//   };


//   traffickingCountries.forEach((country) => {
//     switch (id) {
//     case country:
//       return "yellow";
//     default:
//       return "black";
//     }
//   });
// };


var countries = "countries.geojson"

// d3.json(countries, function(data) {
//   L.geoJson(data, {
//     style: function(feature) {
//       return {
//         color: "white",
//         fillcolor: colorCountry(feature.id),
//         fillOpacity: 0.5,
//         weight: 1.5
//       };
//     }
//   }).addTo(map);
// });