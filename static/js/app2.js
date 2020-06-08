// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
var Data = " "

d3.json("Output/Complete_dataset.json").then((importedData) => {

	Data = importedData;

	init();
	
});


function init() {
	// Add dropdown menu options from imported data
	var names = Object.keys(Data);

	names.forEach((data) => {
	// for (let i = 0; i < names.length; i++) {

		var drop = d3.select("#selDataset").append("option");

		// Append text and value
		drop.text(data.toUpperCase());

		drop.property("value", data);
		
	});

	showmetadata("Afghanistan"); //Show metadata

	create_map("Afghanistan");

	add_intro("Afghanistan");

	add_traffick("Afghanistan");

	add_efforts("Afghanistan");

	word_cloud("Afghanistan");

	plotbar("Afghanistan"); // Add barchart

	drawLinearGauge("Afghanistan"); // Add gauge chart

	buildGauge("Afghanistan"); // Show gauge plot

	add_tier("Afghanistan");

};


// On change to the DOM, call optionChanged()
d3.selectAll("#selDataset").on("change", optionChanged);

// Function called by DOM changes
function optionChanged() {

	var dropdownMenu = d3.select("#selDataset");

	// Assign the value of the dropdown menu option to a variable
	var n = dropdownMenu.property("value");
	
	if (n) {

		console.log(n);

		plotbar(n); // Add barchart

		buildGauge(n);

		showmetadata(n); //Show metadata

		add_intro(n);

		add_efforts(n);

		add_traffick(n);

		word_cloud(n);

		drawLinearGauge(n); // Add gauge chart

		add_tier(n);

		create_map(n);

	}

	else {

		init();

	};

};



function create_map(n) {

	document.querySelector('.map-container').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>"
	
	var name = Data[n];
	
	var location = name["location"];
	
	var latitude = name["latitude"];
	
	var longitude = name["longitude"];

	var fatalities = name["fatalities"];
	
	var location_details = [];
	
	for (let i = 0; i < location.length; i++) {
		
		location_details.push({

			location: location[i],
			
			cordinates: [parseFloat(latitude[i]), parseFloat(longitude[i])],
			
			fatalities: parseInt(fatalities[i])
		
		})
	
	}

	console.log(location_details);

	var min = d3.min(location_details, d => d["fatalities"]);

	var max = d3.max(location_details, d => d["fatalities"]);

	var myMap = L.map("map", {

		center: location_details[0]["cordinates"],
		
		zoom: 5
	
	});

	L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {

		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		
		maxZoom: 16,
		
		id: "mapbox.streets-basic",
		
		accessToken: API_KEY

	}).addTo(myMap);

	// Loop through the cities array and create one marker for each city object
	for (let i = 0; i < location_details.length; i++) {

		// Conditionals for countries points
		var color = "";

		if (location_details[i].fatalities > max/2) {
			
			color = "red";
		
		}

		else if (location_details[i].fatalities > max/4) {

			color = "orange";

		}
		
		else {
			
			color = "yellow";
		
		}

		// Add circles to map
		L.circle(location_details[i].cordinates, {
			
			fillOpacity: 0.6,
			
			color: color,
			
			fillColor: "red",
			// Adjust radius
			radius: location_details[i].fatalities * 1000
		
		}).bindPopup("<strong><h6>" + location_details[i].location + "</strong></h6> <hr> <strong>Fatalities: </strong>" + location_details[i].fatalities).addTo(myMap);
	
	}

};



function plotbar(n) {

	var data = [
		
		parseInt(Data[n]["January"]), parseInt(Data[n]["February"]),
		
		parseInt(Data[n]["March"]), parseInt(Data[n]["April"]),
		
		parseInt(Data[n]["May"]), parseInt(Data[n]["June"]),
		
		parseInt(Data[n]["July"]), parseInt(Data[n]["August"]),
		
		parseInt(Data[n]["September"]), parseInt(Data[n]["October"]),
		
		parseInt(Data[n]["November"]), parseInt(Data[n]["December"])
	
	];

	var week_day = [
		
		"January", "February", "March", "April", "May", "June",
		
		"July","August", "September", "October", "November", "December"
	
	];

	var trace1 = {
		
		x: week_day,
		
		y: data,
		
		marker: {
		
			color: [
		
				'rgba(141, 180, 216 ,.5)','rgba(65, 130, 190, .5)', 
		
				'rgba(39, 78, 114, .5)','rgba(13, 26, 38, .5)', 
		
				'rgba(20, 30, 65, 10)','rgba(141, 180, 216 ,.5)',
		
				'rgba(65, 130, 190, .5)', 'rgba(39, 78, 114, .5)',
		
				'rgba(13, 26, 38, .5)', 'rgba(20, 30, 65, 10)',
		
				'rgba(141, 180, 216 ,.5)','rgba(65, 130, 190, .5)'
		
			]
		
		},
		
		type: 'bar'
	
	};

	var data = [trace1];

	var layout = {
		
		title: `<span style="color: #212529; font-size: 15px">TRAFFICKING EVENTS FREQUENCY BY MONTH </span>`
	
	};

	var config = { responsive: true }

	Plotly.newPlot('bar', data, layout, config);

};



function drawLinearGauge(n) {

	d3.select("#linearGauge").text("")

	var data = [
		
		parseInt(Data[n]["Monday"]), parseInt(Data[n]["Tuesday"]), 
		
		parseInt(Data[n]["Wednesday"]), parseInt(Data[n]["Thursday"]), 
		
		parseInt(Data[n]["Friday"]), parseInt(Data[n]["Saturday"]), 
		
		parseInt(Data[n]["Sunday"])
	
	];

	var week_day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	// Set gauge type
	var gauge = anychart.gauges.linear();

	// Creates data set on our data
	gauge.data(data);

	// Set Chart Title
	gauge.title()
		
		.enabled(true)
		
		.useHtml(true)
		
		.padding([0, 0, 15, 0])
		
		.text(`<span style="color: #212529; font-size: 15px">TRAFFICKING EVENTS FREQUENCY BY WEEK DAY </span>`);

	// Helper function to create Tank Series
	function createTank(i, name, offset, color) {
		// Create tank pointer of the data index
		gauge.tank(i)
			// Set pointer name
			.name(name)
			// Set pointer color fill
			.color(color)
			// Set pointer offset of the width gauge
			.offset(offset)
			// Set pointer width
			.width('10%');
	}

	// Create series
	createTank(0, week_day[0], '0%', 'rgba(141, 180, 216,.5)');
	
	createTank(1, week_day[1], '13%', 'rgba(39, 78, 50, .5)');
	
	createTank(2, week_day[2], '26%', 'rgba(65, 130, 190, .5)');
	
	createTank(3, week_day[3], '39%', 'rgba(13, 26, 38, .5)');
	
	createTank(4, week_day[4], '52%', 'rgba(20, 30, 65, 10)');
	
	createTank(5, week_day[5], '65%', 'rgba(65, 130, 190, .5)'); 
	
	createTank(6, week_day[6], '78%', 'rgba(141, 180, 216 ,.5)');

	// Turn on legend and sets some padding
	gauge.legend()
		
		.enabled(true)
	
		.padding([0, 0, 30, 0]);

	// Set axis scale settings
	var scale = gauge.scale();
	
	scale.minimum(0)
	
		.maximum(parseInt(d3.max(data, d => d)*1.2))
		// Set axis tick intervals
		.ticks({ 'interval': 1 })
		
		.minorTicks({ 'interval': .5 });

	// Enable axis minor ticks and sets axis offset
	var axis = gauge.axis();
	
	axis.minorTicks(true)
		
		.width('0')
		
		.offset('-1%');

	// Set axis labels formatter
	axis.labels()
		
		.useHtml(true)
		
		.format('{%Value}');

	// Set tooltip formatter
	gauge.tooltip().format('Count:{%Value}');

	// Set container id and initiate drawing
	gauge.container('linearGauge');
	
	gauge.draw();

};



function add_intro(n) {

	d3.select("#intro").text("")

	var intro= d3.select("#intro");

	var cell = intro.append("p");

	cell.text(Data[n]["prevention"]);

};



function add_efforts(n) {

	d3.select("#efforts").text("")

	var intro = d3.select("#efforts");

	var cell = intro.append("p");

	cell.text(Data[n]["introduction"]);

};



function add_traffick(n) {

	d3.select("#trafficking_profile").text("")

	var intro = d3.select("#trafficking_profile");

	var cell = intro.append("p");

	cell.text(Data[n]["traffick_profile"].replace(/Š/g, ''));

};



function add_tier(n) {

	d3.select("#tier").text("")

	var tier_intro = d3.select("#tier");

	var cell = tier_intro.append("p");

	var tier = Data[n].tier;

	if (tier === "TIER 1") {
		
		cell.text(tier + ": Countries whose governments fully meet the Trafficking Victims Protection Act’s(TVPA) minimum standards");
	
	}
	
	else if (tier === "TIER 2") {
		
		cell.text(tier + ": Countries whose governments do not fully meet the TVPA’s minimum standards, but are making significant efforts to bring themselves into compliance with those standards.");
	
	}
	
	else if (tier === "TIER 2 WATCH LIST") {
		
		cell.text(tier + ": Countries whose governments do not fully meet the TVPA’s minimum standards, but are making significant efforts to bring themselves into compliance with those standards AND: a) The absolute number of victims of severe forms of trafficking is very significant or is significantly increasing; b) There is a failure to provide evidence of increasing efforts to combat severe forms of trafficking in persons from the previous year; or c) The determination that a country is making significant efforts to bring itself into compliance with minimum standards was based on commitments by the country to take additional future steps over the next year.");
	
	}
	
	else if (tier === "TIER 3") {
		
		cell.text(tier + ": Countries whose governments do not fully meet the minimum standards and are not making significant efforts to do so.");
	
	}
	
	else {
		
		cell.text(tier + ": Countries where the civil conflict and humanitarian crisis make gaining information difficult; and where geological factors such as devastation caused by Hurricanes and Earth quakes has made reporting difficult.")
	
	}

};



function showmetadata(n) {

	d3.select("#country-metadata").text("")
	
	var metadata = { 
		
		"COUNTRY NAME": n.toUpperCase(), "ISO CODE": Data[n]["iso3"],
		
		"POPULATION (THOUSANDS)": Data[n]["Population"],
		
		"LIFE EXPECTANCY (YEARS)": Data[n]["Life Expectancy"],
		
		"POPULATION (< $1.90 DAILY)": Data[n]["Population below $1.90 a day"],
		
		"HUMAN TRAFFICKING EVENTS": Data[n]["Violence against civilians"],
		
		"ASYLUM SEEKERS": Data[n]["Asylum Seekers"]
	
	};

	Object.entries(metadata).forEach(([key, value]) => {

		var meta = d3.select("#country-metadata");

		var cell = meta.append("p").append("h6").append("strong");

		cell.text(key + ": " + value);

	});

};



function word_cloud(n) {
	
	am4core.ready(function () {

		// Themes begin
		am4core.useTheme(am4themes_spiritedaway);
		// Themes end

		var chart = am4core.create("word_cloud", am4plugins_wordCloud.WordCloud);
		
		var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

		series.accuracy = 4;
		
		series.step = 15;
		
		series.rotationThreshold = 0.7;
		
		series.maxCount = 200;
		
		series.minWordLength = 2;
		
		series.labels.template.tooltipText = "{word}: {value}";
		
		series.fontFamily = "Courier New";
		
		series.maxFontSize = am4core.percent(30);

		series.text = Data[n]["traffick_profile"]
			
			.replace(/were/g, '').replace(/was/g, '').replace(/and/g, '')
			
			.replace(/after/g, '').replace(/another/g, '').replace(/who/g, '')
			
			.replace(/they/g, '').replace(/then/g, '').replace(/2018/g, '')
			
			.replace(/their/g, '').replace(/them/g, '').replace(/from/g, '')
			
			.replace(/with/g, '').replace(/that/g, '').replace(/while/g, '')
			
			.replace(/the/g, '');
	
	});

};



function buildGauge(n) {
	// // Enter the index of the dataset with corresponding freq
	var tier = Data[n].tier;

	console.log(tier);

	var level = " ";
	
	if (tier === "TIER 1") {
		
		level = 1;
	
	}

	else if (tier === "TIER 2") {
		
		level = 2;
	
	}
	
	else if (tier === "TIER 2 WATCH LIST") {
		
		level = 3;
	
	}
	
	else if (tier === "TIER 3") {
		
		level= 4;
	
	}
	
	else {
		
		level = 5;
	
	}

	// Trig to calc meter point
	var degrees = 180 - level * 36 + 18,
		
		radius = .5;

	var radians = degrees * Math.PI / 180;

	var x = radius * Math.cos(radians);

	var y = radius * Math.sin(radians);

	// // Path: may have to change to create a better triangle
	var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
		
		pathX = String(x),
		
		space = ' ',
		
		pathY = String(y),
		
		pathEnd = ' Z';

	var path = mainPath.concat(pathX, space, pathY, pathEnd);

	var data = [{
		
		type: 'scatter',
		
		x: [0], y: [0],
		
		marker: { size: 28, color: '850000' },
		
		showlegend: false,
		
		name: `${tier}`,
		
		text: tier,
		
		hoverinfo: "name"},

		{ values: [50 / 5, 50 / 5, 50 / 5, 50 / 5, 50 / 5, 50],
		
		rotation: 90,
			
			text: ['\u{1F641}', '\u{1F610}', '\u{1F642}', '\u{1F603}', '\u{1F929}', ''],
		
		textinfo: "text",
		
		textposition: 'inside',
		
		textfont: {
				
			size: 35,
		
		},
		
		marker: {
			
			colors: ['rgba(217, 50, 50, .5)', 'rgba(141, 180, 216 ,.5)',
			
				'rgba(65, 130, 190, .5)', 'rgba(39, 78, 114, .5)',
				
				'rgba(13, 26, 38, .5)', 'rgba(255, 255, 255, 0)'
			
			]
		
		},
		 
		hoverinfo: 'text',
		
		hole: .5,
		
		type: 'pie',
		
		showlegend: false
	
	}];

	var layout = {
		
		shapes: [{
			
			type: 'path',
			
			path: path,
			
			fillcolor: '850000',
			
			line: {
				
				color: '850000'
			
			}
		
		}],

		title: `<b>TIER RANKING: ${tier}</b> `,
		
		height: 500,
		
		width: 500,

		xaxis: {
			
			zeroline: false, showticklabels: false,
			
			showgrid: false, range: [-1, 1]
		
		},

		yaxis: {
			
			zeroline: false, showticklabels: false,
			
			showgrid: false, range: [-1, 1]
		
		},

		plot_bgcolor: 'rgba(0, 0, 0, 0)',
		
		paper_bgcolor: 'rgba(0, 0, 0, 0)',

	};

	Plotly.newPlot('gauge', data, layout, { responsive: true });

};