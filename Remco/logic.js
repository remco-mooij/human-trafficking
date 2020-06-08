var map = L.map("map", {
  center: [40.86666667, 0.86666667],
  zoom: 2
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var countries = "ht_countries.geojson";

function init() {
  function colorCountry(cases) {
    if (cases < 50) {
      return "#fea0a0"
    }
    else if (cases < 100) {
      return "#e38080"
    }
    else if (cases < 500) {
      return "#c86060"
    }
    else if (cases < 1000) {
      return "#ad3f3f"
    }
    else if (cases < 5000) {
      return "#921f1f"
    }
    else if (cases > 5000) {
      return "#770000"
    }
  }

  d3.json(countries, function(data) {
    L.geoJson(data, {
      style: function(feature) {
        return {
          fillColor: colorCountry(feature.properties.cases),
          color: "white",
          fillOpacity: 0.8,
          weight: 1.5
        };
      }
    }).addTo(map);
  });

}

init();

d3.selectAll("#selectMap").on("change", displayMap);

function colorPoverty(pct) {
  if (pct < 1) {
    return "#fea0a0"
  }
  else if (pct < 5) {
    return "#e38080"
  }
  else if (pct < 10) {
    return "#c86060"
  }
  else if (pct < 25) {
    return "#ad3f3f"
  }
  else if (pct < 50) {
    return "#921f1f"
  }
  else if (pct > 50) {
    return "#770000"
  }
}

function displayMap() {
  var selection = d3.select("#selectMap").property("value");
  console.log(selection)
  
  if (selection === "Human Trafficking") {
    init()    
  }

  else if (selection === "Poverty <$1.90/day") {
    d3.json(countries, function(data) {
      L.geoJson(data, {
        style: function(feature) {
          return {
            fillColor: colorPoverty(feature.properties.poverty_group_1),
            
            color: "white",
            fillOpacity: 0.8,
            weight: 1.5,
       
          };
        }
      }).addTo(map);
    });
  }

else if (selection === "Poverty <$3.20/day") {
  d3.json(countries, function(data) {
    L.geoJson(data, {
      style: function(feature) {
        return {
          fillColor: colorPoverty(feature.properties.poverty_group_2),
          
          // color: colorLines(),
          fillOpacity: 0.8,
          weight: 1.5,
          color: "white"
        };
      }
    }).addTo(map);
  });
}

else if (selection === "Poverty <$5.50/day") {
  d3.json(countries, function(data) {
    L.geoJson(data, {
      style: function(feature) {
        return {
          fillColor: colorPoverty(feature.properties.poverty_group_3),
          
          // color: colorLines(),
          fillOpacity: 0.8,
          weight: 1.5,
          color: "white"
        };
      }
    }).addTo(map);
  });
};

};





