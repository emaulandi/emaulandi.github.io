// WOMEN HEAD JAVASCRIPT


// DEFINE DRAWING AREA SIZING
var height = 550;
var width = 550;
var VOTEchartSize = 400;
var marginTop = 10;
var marginBottom = 150;
var marginSide = 35;


/// TOOLTIP VOTE QUOTAS ///
// Add a div that will go wherever in the body 

var tooltipQuotas = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);	
	
var tooltipVote = d3.select("body").append("div")
	.attr("class", "tooltip3")
	.style("opacity", 0);	
	
// CREATE DRAWING PART MOVED 30,30 FROM SVG
var selectionQuotas = d3.select("#quotas")
	.attr("width", VOTEchartSize + 2*marginSide)
	.attr("height", VOTEchartSize + 2*marginSide)
		.append("g")
		.attr("transform", "translate(" + marginSide + "," + marginSide + ")");

var selectionVote = d3.select("#vote")
	.attr("width", VOTEchartSize + 2*marginSide)
	.attr("height", VOTEchartSize + 2*marginSide)
		.append("g")
		.attr("transform", "translate(" + marginSide + "," + marginSide + ")");
		
// SAME SCALE FOR ALL
var yScale = d3.scaleLinear()
	.range([VOTEchartSize,0])
	.domain([0,0.6]);
	
var xScale = d3.scaleLinear()
	.range([0, VOTEchartSize])
	.domain([1850,2017]);
	
var quotasLegend = [
	{"value": 0, "descr":"Quotas"},
	{"value": 0.5, "descr":"A little bit qutoas"},
	{"value": 1, "descr":"No quotas"},
	{"value": -1, "descr":"No data"}
];

// LOADING CSV
d3.csv("../jsdata/datawomenclean.csv", function(inputdata) {

    data = inputdata.map(function(d) {    
        return {
        	"country": d.Country,
        	"continent": d.Continent,
        	"parliament2018": +d["% Parliament 2018"] / 100,
        	"whos": +d.WHOS,
        	"yearVote" : +d.Vote,
        	"quotas": +d.Quotas
        } ;
    });
  
  	console.log('project2 - vote scatter data:',data);
           
    // Nesting to group data by continent
    var nestContinent = d3.nest()
  		.key(function(d){
    		return d.continent;
  		})
  		.entries(data)
  	
  	console.log('nestContinent:',nestContinent);
  	
  	//List of continent tab
  	tabContinent = [];
  	nestContinent.forEach((e) => {
  		tabContinent.push(e.key);
  	});
  	console.log('tabContinent',tabContinent);
  	
  	// ADD World as option
  	nestContinent.unshift({"key": "World", "values": []});

  	// ---
  	// VOTE 
  	// ---
  	var state = 0; // init
  	// DRAW VOTE INIT
  	var tabMean = computeMean(data);
	drawVote(tabMean);
	console.log('tabMean',tabMean);

  	// PLAY BUTTON
  	var playbutton = d3.select("#playbutton");
  	playbutton.append("input")
		.attr("type", "button")
		.attr("value", "Play")
		.on("click", function(d) {
			if (state == 0) {
				updatedrawVote(tabMean);
				playbutton.select("g")
					.html("<b>Here you see the average percentage in parliament and vote's right year for each continent</b> <br/> <i>Click play to see the data for each country</i><br/>");
				state++;
			}
			else if (state == 1) {
				playbutton.select("g").html("<b>Percentage in parliament and vote's right year for all countries</b>");
				playbutton.select("input").remove();
				updatedrawVoteCountry(data);
				state++;
			}
		})	
		
	// ---
	// QUOTAS - A DROPDOWN SELECTION FOR THE CONTINENT
	// ---
    var continentMenu = d3.select("#continentDropdown");
	
	continentMenu.append("select")
	  .selectAll("option")
		  .data(nestContinent)
		  .enter()
		  .append("option")
		  .attr("value", function(d){
		      return d.key;
		  })
		  .text(function(d){
		      return d.key;
		  })
  
  	//DRAWING
    drawQuotas(data); 
    
    continentMenu.on('change', () => {
    	var selectedContinent = d3.select("select").property("value");
    	console.log("selectedContinent",selectedContinent);
    	updateDrawQuotas(selectedContinent, nestContinent, data);
    });
});

function drawVote(data){
	console.log("VOTE draw function");
	
	// SAME SCALE FOR MEAN
	var yScaleMean = d3.scaleLinear()
		.range([VOTEchartSize,0])
		.domain([0,0.35]);
	
	var xScaleMean = d3.scaleLinear()
		.range([0, VOTEchartSize])
		.domain([1920,1980]);
		
	var xScaleInit = d3.scaleLinear()
		.range([0, VOTEchartSize])
		.domain([0,1]);
		
	var rScaleMean = d3.scaleSqrt()
		.range([0, VOTEchartSize])
		.domain([10,1000]);
	
	var xAxis = d3.axisBottom(xScaleInit);
	var yAxis = d3.axisLeft(yScaleMean);

	selectionVote.append("g")
		.attr("class","yaxis")
		.call(yAxis
			.ticks(5)
			.tickFormat(d3.format(".0%"))
		)
		
	selectionVote.append('text')
	.text('Percentage of women in parliament in early 2018')
	.attr('class','labelaxis')
	.attr('x',2)
    .attr('y',15)
	.attr('transform','rotate(-90)')
	
	//BINDING DATA
	selectionVote.selectAll("circle.continent")
	.data(data)
	.enter()
	.append("circle")
	.attr("class","continent")
	// PAS BESOIN de faire une fonction RATIO, on peut appliquer direct les scales!
	.attr("cx",xScaleInit(0.15))
		//(d,i) => {return xScaleMean(d.meanYearVote);})
	.attr("cy", 
		(d,i) => {return yScaleMean(d.meanParliament);})
	.attr("r",10)
		//(d,i) => {return rScaleMean(d.countCountries);})
	
	.style("fill",
		(d,i) => {return colorContinent(d.continent);})
	/*
	.on("mouseover", function(d,i) {
		handleOnTooltip(d.continent,tooltipVote);
	})
	.on("mouseout", function(d,i) {
		handleOutTooltip(d,tooltipVote);
	});
	*/
	
	//Text label
	selectionVote.selectAll("text.circleLabel")  		
	.data(data)
	.enter()
	.append("text")
	.attr('class','circleLabel')
	.attr("x", 
		(d,i) => { return xScaleInit(0.15) + 15 ;}	)
	.attr("y", 
		(d,i) => {
					var defau = yScaleMean(d.meanParliament) + 10;
					if (d.continent == 'South America') {
						defau = defau - 15;
					}
					return defau;
				}
	)
	//	(d,i) => {return yScaleMean(d.meanParliament) + 10;})
	.text((d) => { return d.continent; });  
	
}

function updatedrawVote(data){
	
		// SAME SCALE FOR MEAN
	var yScaleMean = d3.scaleLinear()
		.range([VOTEchartSize,0])
		.domain([0,0.35]);

	var xScaleMean = d3.scaleLinear()
		.range([0, VOTEchartSize])
		.domain([1920,1980]);
		
	var rScaleMean = d3.scaleSqrt()
		.range([0, VOTEchartSize])
		.domain([10,1000]);
	
	var xAxis = d3.axisBottom(xScaleMean);
	var yAxis = d3.axisLeft(yScaleMean);

	var xAxisSelector = selectionVote.append("g")
		.attr("transform", "translate(" + 0 + "," + VOTEchartSize + ")")
		.attr("class","xaxis")
		.transition(2000)
		.call(xAxis
			.ticks(5)
			.tickFormat(d3.format("d"))
		);
	
	selectionVote.append('text')
	.text('Year of women\'s right vote')
	.attr('class','labelaxis')
	.attr('y',VOTEchartSize - 10)
    .attr('x',VOTEchartSize)
	
	// DO NOT REDRAW Y AXIS
	
	selectionVote.selectAll("circle.continent")
	.data(data)
	.transition()  // Transition from old to new
    .duration(1000)  // Length of animation
    //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
    .attr("cx", 
    	(d,i) => {return xScaleMean(d.meanYearVote);})
    .attr("cy", 
    	(d,i) => {return yScaleMean(d.meanParliament);})
    //.attr("r",20)
    .on("end", function() {  // End animation
        d3.select(this)  // 'this' means the current element
            .transition(2000)
            .attr("r", 15);  // Change radius
    });
    
    //Text label
    selectionVote.selectAll("text.circleLabel")
	.data(data)
	.transition()  // Transition from old to new
    .duration(1000)  // Length of animation
    //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
    .attr("x", 
    	(d,i) => {return xScaleMean(d.meanYearVote) + 20;})
    .attr("y", 
    	(d,i) => {return yScaleMean(d.meanParliament) + 5;})
    //.attr("r",20)
    .on("end", function() {  // End animation
        d3.select(this)  // 'this' means the current element
            .transition(2000)
            //.attr("r", 15);  // Change radius
    });

}

function updatedrawVoteCountry(data){

	console.log("updatedrawVoteCountry function");
	
	var xAxis = d3.axisBottom(xScale);
	var yAxis = d3.axisLeft(yScale);
	
	// Y AXIS
	selectionVote.select(".xaxis")
		.transition(2000)
		.call(xAxis
			.ticks(5)
			.tickFormat(d3.format("d"))
		);
	
	// Y AXIS
	selectionVote.select(".yaxis")
		.transition(2000)
		.call(yAxis
			.ticks(5)
			.tickFormat(d3.format(".0%"))
		);

	
	//DELETE PREVIOUS
	//Text label
    selectionVote.selectAll("text.circleLabel")
    .remove()
    .exit()
    
	//Circles
	selectionVote.selectAll("circle.continent")
	.remove()
    .exit()
		
	//BINDING DATA
	selectionVote.selectAll("circle.country")
	.data(data)
	.enter()
	.append("circle")
	.attr("class","country")
	// PAS BESOIN de faire une fonction RATIO, on peut appliquer direct les scales!
	.attr("cx",
		(d,i) => {return xScale(d.yearVote);})
	.attr("cy", 
		(d,i) => {return yScale(d.parliament2018);})
	.attr("r",5)
	.transition(2000)
		//(d,i) => {return rScaleMean(d.countCountries);})
	.style("fill",
		(d,i) => {return colorContinent(d.continent);})
		
	selectionVote.selectAll("circle.country")
	.on("mouseover", function(d,i) {
		handleOnTooltip(d.country,tooltipVote);
	})
	.on("mouseout", function(d,i) {
		handleOutTooltip(d,tooltipVote);
	});
	
	// CONTINENT COLOR LEGEND
    selectionVote.selectAll(".voteLegend")
	.data(tabContinent)
	.enter()
	.append("circle")
	.attr("class","voteLegend")
	.attr("cx", 
		(d,i) => {return (VOTEchartSize - 50);})
	.attr("cy", 
		(d,i) => {return (10 + i*15);})
	.attr("r", 4)
	.style("fill",
		(d,i) => {return colorContinent(d);})
		
	selectionVote.selectAll("text.voteLegend")
	.data(tabContinent)
	.enter()
	.append("text")
	.attr("class","voteLegend")
	.attr("x", 
		(d,i) => {return (VOTEchartSize - 40);})
	.attr("y", 
		(d,i) => {return (13 + i*15);})
	.text( (d,i) => {return d;})
}

function drawQuotas(data){
    
	console.log("QUOTAS draw function");
	
	var xAxis = d3.axisBottom(xScale);
	var yAxis = d3.axisLeft(yScale);
	var xAxisSelector = selectionQuotas.append("g")
		.attr("transform", "translate(" + 0 + "," + VOTEchartSize + ")")
		.attr("class","ax")
		.call(xAxis
			.ticks(5)
			.tickFormat(d3.format("d"))
		);
	
	// LABEL Y AXIS
	selectionQuotas.append('text')
	.text('Percentage of women in parliament in early 2018')
	.attr('class','labelaxis')
	.attr('x',2)
    .attr('y',15)
	.attr('transform','rotate(-90)')

	selectionQuotas.append("g")
		.attr("class","ax")
		.call(yAxis
			.ticks(5)
			.tickFormat(d3.format(".0%"))
		);
	// LABEL X AXIS
	selectionQuotas.append('text')
	.text('Year of women\'s right vote')
	.attr('class','labelaxis')
	.attr('y',VOTEchartSize - 10)
    .attr('x',VOTEchartSize)
    
    // QUOTAS COLOR LEGEND
    selectionQuotas.selectAll(".quotasLegend")
	.data(quotasLegend)
	.enter()
	.append("circle")
	.attr("class","quotasLegend")
	.attr("cx", 
		(d,i) => {return (VOTEchartSize - 40);})
	.attr("cy", 
		(d,i) => {return (10 + i*15);})
	.attr("r", 4)
	.style("fill",
		(d,i) => {return color(d.value);})
		
	selectionQuotas.selectAll("text.quotasLegend")
	.data(quotasLegend)
	.enter()
	.append("text")
	.attr("class","quotasLegend")
	.attr("x", 
		(d,i) => {return (VOTEchartSize - 30);})
	.attr("y", 
		(d,i) => {return (13 + i*15);})
	.text( (d,i) => {return d.descr;})

	//BINDING DATA
	//Circle
	selectionQuotas.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("class","country")
	.attr("cx", 
		(d,i) => {return xScale(d.yearVote);})
	.attr("cy", 
		(d,i) => {return yScale(d.parliament2018);})
	.attr("r", 5)
	.style("fill",
		(d,i) => {return color(d.quotas);})
	.on("mouseover", function(d,i) {
		handleOnTooltip(d.country,tooltipQuotas);
	})
	.on("mouseout", function(d,i) {
		handleOutTooltip(d,tooltipQuotas);
	});

}

function updateDrawQuotas(continent, nestContinent, data){

	// Select Data for continent
	var selectedData = data ;
	if (continent == "World") { 
		
	}
	else {
	  	selectedNest = nestContinent.filter( (d) => {
	  		return d.key == continent;
	  	});
	  	
	  	selectedData = selectedNest[0].values
	}
  	console.log('selectedData:',selectedData);
	
	//BINDING DATA
	selectionQuotas.selectAll("circle.country")
	.remove()
    .exit()
	.data(selectedData)
	.enter()
	.append("circle")
	.attr("class","country")
	// PAS BESOIN de faire une fonction RATIO, on peut appliquer direct les scales!
	.attr("cx", 
		(d,i) => {return xScale(d.yearVote);})
	.attr("cy", 
		(d,i) => {return yScale(d.parliament2018);})
	.attr("r", 5)
	.style("fill",
		(d,i) => {return color(d.quotas);})
	.on("mouseover", function(d,i) {
		handleOnTooltip(d.country,tooltipQuotas);
	})
	.on("mouseout", function(d,i) {
		handleOutTooltip(d,tooltipQuotas);
	});
}

function color(d){
	//default for -1 > no data
	var color = "LightGray";

	if (d == 0) {color = "ForestGreen";}	
	else if (d == 0.5){color = "YellowGreen";}
	else if (d == 1){color = "LightCoral";}
	
	return color;
	
}

function colorContinent(continent){
	var color;
	if (continent == "Asia") {color = 'YellowGreen'}
	else if (continent == "South America") {color = 'Peru'}
	else if (continent == "North America") {color = 'Chocolate'}
	else if (continent == "Africa") {color = 'Gold'}
	else if (continent == "Europe") {color = 'DeepSkyBlue'}
	else if (continent == "Oceania") {color = 'Tomato'}
	return color;
	
}

function handleOnTooltip(d, tooltip) {
	tooltip.transition()
   		.duration(10)
   		.style("opacity", .9);

	
	tooltip.html("   "+d)
	   .style("left", (d3.event.pageX) + "px")
	   .style("top", (d3.event.pageY-15) + "px");
	 

}

function handleOutTooltip(d, tooltip) {
	tooltip.transition()
       .duration(10)
       .style("opacity", 0);
}


function printIndexLegend(subindex) {
	return subindex.label + '\n ' + subindex.perc + ' of listed countries are above 0.5'; 
}

function computeMean(data) {
    
    // IL A SUREMENT PLUS EFFICACE !!
    var meanYearVote = d3.nest()
    .key(function(d){
    		return d.continent;
  		})
    .rollup(
    	function(d){
			return d3.mean(d, function(g) { 
      			return g.yearVote;
			});
   	}).entries(data);
   	
   	var meanParliament = d3.nest()
    .key(function(d){
    		return d.continent;
  		})
    .rollup(
    	function(d){
			return d3.mean(d, function(g) { 
      			return g.parliament2018;
			});
   	}).entries(data);
   	
   	var countCountries = d3.nest()
    .key(function(d){
    		return d.continent;
  		})
    .rollup(
    	function(d){ return d.length;}
   	).entries(data);
   	
   	//console.log('meanYearVote:',meanYearVote);
   	//console.log('meanParliament:',meanParliament);
   	//console.log('countCountries:',countCountries);
   	
   	var tabMean = [];
   	var obj ;
   	
   	for (i=0; i<meanYearVote.length; i++) {
   		obj = {
   			"continent": meanYearVote[i].key,
   			"meanYearVote": meanYearVote[i].value,
   			"meanParliament": meanParliament[i].value,
   			"countCountries": countCountries[i].value
   		};
   		tabMean.push(obj);
   	}
   	
   	//console.log('tabMean',tabMean);
   	return tabMean;

}






