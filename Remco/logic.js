var map = L.map("map", {
    center: [30.86666667, -10.86666667],
    zoom: 2.5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);


  var countries = "ht_countries.geojson"








  // return traffickingCountries.indexOf(25) > -1;


  

    
  //     switch (id) {
  //     case countryCode:
  //       return "yellow";
  //     default:
  //       return "black";
  //     }
  //   };
  // };


d3.json(countries, function(data) {
  L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        weight: 1.5,
        fillOpacity: 0.8,
        fillColor: "red"
      };
    }
  }).addTo(map);
});

  // function filterMap(feature) {
  //   d3.json("human_trafficking2.json", function(importedData) {
  //     // Get only unique countries from json file and map them to an array
  //     const traffickingCountries = [...new Set(importedData.map(d => d.citizenship))];
      
  //     for (var i = 0; i < traffickingCountries.length; i++) {
  //       var countryCode = traffickingCountries[i];
  //       console.log(countryCode);
  //       if (feature.id === "USA") return True
  //     };
  //   });
  // };

  // L.geoJson(countries, {
  //   filter: function(feature) {
  //     if (feature.features.id === "USA") return True
  //       }
  // }).addTo(map);
