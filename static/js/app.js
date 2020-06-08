function makeResponsive() {
	var svgArea = d3.select("body").select("svg");

	if (!svgArea.empty()) {
		svgArea.remove();
	}

	var svgWidth = window.innerWidth / 1.05,
		svgHeight = window.innerHeight / 1.2;

	var margin = {
		t: 50,
		r: 200,
		b: 150,
		l: 100,
	};

	var width = svgWidth - margin.l - margin.r,
		height = svgHeight - margin.t - margin.b;

	var svg = d3.select('#scatter')
		.classed('chart', true)
		.append('svg')
		.attr('width', svgWidth)
		.attr('height', svgHeight)

	var chartGroup = svg.append('g')
		.attr('transform', `translate(${margin.l},${margin.t})`)

	// =================================================================
	// Create chart
	// =================================================================

	var chosenXAxis = 'Life Expectancy',
		chosenYAxis = 'Human Trafficking Events';

	d3.csv("Output/merge_dataset.csv").then(data => {
		data.forEach(d => {
			d['Human Trafficking Events'] = +d['Human Trafficking Events'];
			d['Battles Fought'] = +d['Battles Fought'];
			d['Population'] = +d['Global Population'];
			d['Asylum Seekers'] = +d['Asylum Seekers'];
			d['Aids Related Death'] = +d['Aids Related Death'];
			d['Life Expectancy'] = +d['Life Expectancy'];
			d['Death From Smoking'] = +d['Death From Smoking'];
		});

		var xScale = getXScaleForAxis(data, chosenXAxis),
			yScale = getYScaleForAxis(data, chosenYAxis);


		var xAxis = d3.axisBottom(xScale),
			yAxis = d3.axisLeft(yScale);

		var xAxis = chartGroup.append('g')
			.attr('transform', `translate(0,${height})`)
			.call(xAxis);
		var yAxis = chartGroup.append('g')
			.call(yAxis);

		chartGroup.append("text")
			.attr("transform", `translate(${width - 5},${height - 5})`)
			.attr("class", "axis-text-main")
			.text("2018")

		// chartGroup.append("text")
		//     .attr("transform", `translate(15,60 )rotate(270)`)
		//     .attr("class", "axis-text-main")
		//     .text("Y-Axis")

		var countryCircles = chartGroup.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.classed('countryCircle', true)
			.attr('cx', d => xScale(d[chosenXAxis]))
			.attr('cy', d => yScale(d[chosenYAxis]))
			.attr('r', 10)
			.attr('fill', "#e3e3e3")

		var countryText = chartGroup.append('g').selectAll('text')
			.data(data)
			.enter()
			.append('text')
			.classed('countryText', true)
			.attr('x', d => xScale(d[chosenXAxis]))
			.attr('y', d => yScale(d[chosenYAxis]))
			.attr('transform', 'translate(0,4.5)')
			.text(d => d.country_code)
			.attr('font-size', "small")
			.attr('font-weight', 300)

		var xLabelsGroup = chartGroup.append('g')
			.attr('transform', `translate(${width / 2}, ${height + 20})`);

		var battlesLabel = xLabelsGroup.append('text')
			.attr('x', 0)
			.attr('y', 20)
			.attr('value', 'Battles Fought')
			.classed('aText inactive', true)
			.text('Battles Fought');

		var populationLabel = xLabelsGroup.append('text')
			.attr('x', 0)
			.attr('y', 40)
			.attr('value', 'Population')
			.classed('aText inactive', true)
			.text('Population');

		var asylumLabel = xLabelsGroup.append('text')
			.attr('x', 0)
			.attr('y', 60)
			.attr('value', 'Asylum Seekers')
			.classed('aText inactive', true)
			.text('Asylum Seekers');

		var aidsLabel = xLabelsGroup.append('text')
			.attr('x', 0)
			.attr('y', 80)
			.attr('value', 'Aids Related Death')
			.classed('aText inactive', true)
			.text('Aids Related Death');

		var lifeExpLabel = xLabelsGroup.append('text')
			.attr('x', 0)
			.attr('y', 100)
			.attr('value', 'Life Expectancy')
			.classed('aText active', true)
			.text('Life Expectancy');

		var smokingDeathLabel = xLabelsGroup.append('text')
			.attr('x', 0)
			.attr('y', 120)
			.attr('value', 'Death From Smoking')
			.classed('aText inactive', true)
			.text('Death From Smoking');

		var yLabelsGroup = chartGroup.append('g')

		var crimesLabel = yLabelsGroup.append('text')
			.attr("transform", `translate(-40,${height / 2})rotate(-90)`)
			.attr('value', 'Human Trafficking Events')
			.classed('aText active', true)
			.text('Human Trafficking Events');

		var countryCircles = updateToolTip(chosenYAxis, chosenXAxis, countryCircles, countryText),
			countryText = updateToolTip(chosenYAxis, chosenXAxis, countryCircles, countryText);


		xLabelsGroup.selectAll('text')
			.on('click', function () {
				var value = d3.select(this).attr('value');
				if (value !== chosenXAxis) {
					chosenXAxis = value;

					xScale = getXScaleForAxis(data, chosenXAxis);

					xAxis.transition()
						.duration(1000)
						.ease(d3.easeBack)
						.call(d3.axisBottom(xScale));

					countryCircles.transition()
						.duration(1000)
						.ease(d3.easeBack)
						.on('start', function () {
							d3.select(this)
								.attr("opacity", 0.50)
								.attr('r', 15);
						})
						.on('end', function () {
							d3.select(this)
								.attr("opacity", 1)
								.attr('r', 10)
						})
						.attr('cx', d => xScale(d[chosenXAxis]));

					d3.selectAll('.countryText').transition()
						.duration(1000)
						.ease(d3.easeBack)
						.attr('x', d => xScale(d[chosenXAxis]));

					countryCircles = updateToolTip(chosenYAxis, chosenXAxis, countryCircles, countryText),
						countryText = updateToolTip(chosenYAxis, chosenXAxis, countryCircles, countryText);

					if (chosenXAxis === 'Battles Fought') {
						battlesLabel
							.classed('active', true)
							.classed('inactive', false);
						populationLabel
							.classed('active', false)
							.classed('inactive', true);
						asylumLabel
							.classed('active', false)
							.classed('inactive', true);
						aidsLabel
							.classed('active', false)
							.classed('inactive', true);
						lifeExpLabel
							.classed('active', false)
							.classed('inactive', true);
						smokingDeathLabel
							.classed('active', false)
							.classed('inactive', true);
					}
					else if (chosenXAxis === 'Population') {
						battlesLabel
							.classed('active', false)
							.classed('inactive', true);
						populationLabel
							.classed('active', true)
							.classed('inactive', false);
						asylumLabel
							.classed('active', false)
							.classed('inactive', true);
						aidsLabel
							.classed('active', false)
							.classed('inactive', true);
						lifeExpLabel
							.classed('active', false)
							.classed('inactive', true);
						smokingDeathLabel
							.classed('active', false)
							.classed('inactive', true);
					}
					else if (chosenXAxis === 'Asylum Seekers') {
						battlesLabel
							.classed('active', false)
							.classed('inactive', true);
						populationLabel
							.classed('active', false)
							.classed('inactive', true);
						asylumLabel
							.classed('active', true)
							.classed('inactive', false);
						aidsLabel
							.classed('active', false)
							.classed('inactive', true);
						lifeExpLabel
							.classed('active', false)
							.classed('inactive', true);
						smokingDeathLabel
							.classed('active', false)
							.classed('inactive', true);
					}
					else if (chosenXAxis === 'Aids Related Death') {
						battlesLabel
							.classed('active', false)
							.classed('inactive', true);
						populationLabel
							.classed('active', false)
							.classed('inactive', true);
						asylumLabel
							.classed('active', false)
							.classed('inactive', true);
						aidsLabel
							.classed('active', true)
							.classed('inactive', false);
						lifeExpLabel
							.classed('active', false)
							.classed('inactive', true);
						smokingDeathLabel
							.classed('active', false)
							.classed('inactive', true);
					}
					else if (chosenXAxis === 'Life Expectancy') {
						battlesLabel
							.classed('active', false)
							.classed('inactive', true);
						populationLabel
							.classed('active', false)
							.classed('inactive', true);
						asylumLabel
							.classed('active', false)
							.classed('inactive', true);
						aidsLabel
							.classed('active', false)
							.classed('inactive', true);
						lifeExpLabel
							.classed('active', true)
							.classed('inactive', false);
						smokingDeathLabel
							.classed('active', false)
							.classed('inactive', true);
					}
					else {
						battlesLabel
							.classed('active', false)
							.classed('inactive', true);
						populationLabel
							.classed('active', false)
							.classed('inactive', true);
						asylumLabel
							.classed('active', false)
							.classed('inactive', true);
						aidsLabel
							.classed('active', false)
							.classed('inactive', true);
						lifeExpLabel
							.classed('active', false)
							.classed('inactive', true);
						smokingDeathLabel
							.classed('active', true)
							.classed('inactive', false);
					}
				}
			});

		yLabelsGroup.selectAll('text')
			.on('click', function () {
				var value = d3.select(this).attr('value');
				if (value !== chosenYAxis) {
					chosenYAxis = value;

					yScale = getYScaleForAxis(data, chosenYAxis);

					yAxis.transition()
						.duration(1000)
						.ease(d3.easeBack)
						.call(d3.axisLeft(yScale));

					countryCircles.transition()
						.duration(1000)
						.ease(d3.easeBack)
						.on('start', function () {
							d3.select(this)
								.attr("opacity", 0.50)
								.attr('r', 15);
						})
						.on('end', function () {
							d3.select(this)
								.attr("opacity", 1)
								.attr('r', 10)
						})
						.attr('cy', d => yScale(d[chosenYAxis]));

					d3.selectAll('.countryText').transition()
						.duration(1000)
						.ease(d3.easeBack)
						.attr('y', d => yScale(d[chosenYAxis]));

					countryCircles = updateToolTip(chosenYAxis, chosenXAxis, countryCircles, countryText),
						countryText = updateToolTip(chosenYAxis, chosenXAxis, countryCircles, countryText);

					if (chosenYAxis === 'Human Trafficking Events') {
						crimesLabel
							.classed('active', true)
							.classed('inactive', false);
					}
				}
			});
	});


	function getXScaleForAxis(data, chosenXAxis) {
		var xScale = d3.scaleLinear()
			.domain([d3.min(data, d => d[chosenXAxis]) * .9,
			d3.max(data, d => d[chosenXAxis]) * 1.1])
			.range([0, width]);
		return xScale;
	}

	function getYScaleForAxis(data, chosenYAxis) {
		var yScale = d3.scaleLinear()
			.domain([d3.min(data, d => d[chosenYAxis]) * .9 - 50,
			d3.max(data, d => d[chosenYAxis]) * 1.1])
			.range([height, 0]);
		return yScale;
	}

	function updateToolTip(chosenYAxis, chosenXAxis, countryCircles, countryText) {
		var toolTip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([80, -60])
			.html(d => {
				if (chosenXAxis === "Battles Fought")
					return (`<strong>${d.country}</strong><br>${chosenYAxis}: ${d[chosenYAxis]} 
										<br>${chosenXAxis}: ${d[chosenXAxis]}`)
				else if (chosenXAxis === 'Population')
					return (`<strong>${d.country}</strong><br>${chosenYAxis}: ${d[chosenYAxis]} 
										<br>${chosenXAxis}: ${d[chosenXAxis]}`)
				else if (chosenXAxis === 'Asylum Seekers')
					return (`<strong>${d.country}</strong><br>${chosenYAxis}: ${d[chosenYAxis]} 
										<br>${chosenXAxis}: ${d[chosenXAxis]}`)
				else if (chosenXAxis === 'Aids Related Death')
					return (`<strong>${d.country}</strong><br>${chosenYAxis}: ${d[chosenYAxis]} 
										<br>${chosenXAxis}: ${d[chosenXAxis]}`)
				else if (chosenXAxis === 'Life Expectancy')
					return (`<strong>${d.country}</strong><br>${chosenYAxis}: ${d[chosenYAxis]} 
										<br>${chosenXAxis}: ${d[chosenXAxis]}`)
				else
					return (`<strong>${d.country}</strong><br>${chosenYAxis}: ${d[chosenYAxis]} 
										<br>${chosenXAxis}: ${d[chosenXAxis]}`)
			});

		countryCircles.call(toolTip);
		countryCircles.on('mouseover', toolTip.show).on('mouseout', toolTip.hide);

		d3.selectAll('.countryText').call(toolTip);
		d3.selectAll('.countryText').on('mouseover', toolTip.show).on('mouseout', toolTip.hide);

		return countryCircles;
		return countryText;
	}
}

makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);