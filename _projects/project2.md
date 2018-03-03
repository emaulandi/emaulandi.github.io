---
title: Project 2
layout: projects
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum sit amet magna ut ullamcorper. 
Aenean convallis risus ac laoreet euismod. Maecenas efficitur metus eu interdum euismod. Proin sodales lorem a feugiat semper. 
Proin facilisis lorem a justo vulputate, quis accumsan nisi pellentesque. Nunc porta dictum convallis. Morbi fringilla ligula vel ultricies mollis. 
Suspendisse a convallis nulla. Vestibulum nec ullamcorper est. Curabitur a tortor et orci venenatis pharetra.

Source
* [Wikipedia : List of elected and appointed female heads of state and government](https://en.wikipedia.org/wiki/List_of_elected_and_appointed_female_heads_of_state_and_government)

<div id ="continentDropdown"></div>
<div id="example"></div>

<style>
.tooltip {
	position: absolute;
	width: 230px;
	height: 40px;
	stroke: black;
	pointer-events: none;
	font-size: 12px;			
    padding: 5px;				
    background: white;
    border: 1px solid gray;
    border-radius: 10px;	
    padding: 5px;	
}
</style>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-time.v1.min.js" charset="utf-8"></script>
<script>


// DEFINE DRAWING AREA SIZING
var height = 500;
var width = 800;
var marginTop = 10;
var marginBottom = 150;
var marginSide = 30;

var timeFormat = d3.timeFormat("%d/%m/%Y");
var timeParser = d3.timeParse("%d/%m/%Y");

/// TOOLTIP ///
// Add a div that will go wherever in the body 
var tooltip = d3.select("div#example").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);


// CREATE DRAWING PART MOVED 30,30 FROM SVG
var svg = d3.select("div#example").append("svg")
	.attr("width", width + 2*marginSide)
	.attr("height", height + marginSide + marginBottom)
		.append("g")
		.attr("transform", "translate(" + marginSide + "," + marginSide + ")");


var womendata = {{ site.data.womenlight | jsonify }};
//console.log(womendata);

// Nesting to group data by continent
var nestWomen = d3.nest()
	.key(function(d){
		return d.continent;
	})
	.entries(womendata)

console.log('nestWomen:',nestWomen);

//Double Nesting to know list of countries for each continent
var nestContCountry = d3.nest()
	.key(function(d){ 
		return d.continent; 
	})
	.key(function(d){ 
		return d.dataCountry; 
	})
	.entries(womendata)
	
console.log('nestContCountry:',nestContCountry); 

var countCountryByContinent = [] ;

// Compute # of countries for each continent
nestContCountry.forEach( (e) => {
	countCountryByContinent.push({'continent':e.key,'countCountry':e.values.length});
});

console.log('countCountryByContinent:',countCountryByContinent);

// A DROPDOWN SELECTION FOR THE CONTINENT
var continentMenu = d3.select("#continentDropdown");

continentMenu.append("select")
  .selectAll("option")
	  .data(nestWomen)
	  .enter()
	  .append("option")
	  .attr("value", function(d){
	      return d.key;
	  })
	  .text(function(d){
	      return d.key;
	  })

continentMenu.on('change', () => {
	var selectedContinent = d3.select("select").property("value");
	console.log("selectedContinent",selectedContinent);
	updateDrawContinent(nestWomen,selectedContinent);
});

drawContinent(nestWomen,'Africa');



function drawContinent(nest, continent) {

	// Select Data for continent
  	var selectedWomen = nest.filter( (d) => {
  		return d.key == continent;
  	});
  	console.log('selectedWomen:',selectedWomen);
  	
  	var data = selectedWomen[0].values;
  	console.log('data:',data);
  	
  	// Creating scales //
    var minStartDate = d3.min(data, function(d) { return timeParser(d.mandateStart) ; }); 
	var maxEndDate = d3.max(data, function(d) { return timeParser(d.mandateEnd) ; });
    var daysTotal = d3.timeDay.count(minStartDate,maxEndDate);
    //console.log("daysTotal:",daysTotal);

	var yScale = d3.scaleTime()
		.range([height,0]);
			
	// AVANT DE BINDER LES DATA !!! SINON LE SCALE EST FAUX 
	// Pourquoi ??
	
	yScale.domain([minStartDate,maxEndDate]);
	
	// CALL Y AXIS
	svg.append("g").attr("class", "yaxis").call(d3.axisRight(yScale));

	//USING COUNTRY NAME AS X SCALE
	var xScale = d3.scaleBand().range([0, width]);
	xScale.domain(data.map(function(d) { return d.dataCountry; }));
	
	var xAxis = d3.axisBottom(xScale);
	var xAxisSelector = svg.append("g")
		.attr("class", "xaxis")
		.attr("transform", "translate(" + 0 + "," + height + ")")
		.call(xAxis)
			.selectAll("text")  
			.style("text-anchor", "end")
			.style("font-size", "9px")
			.attr("dx", "-10px")
			.attr("dy", "-6px")
			.attr("transform", "rotate(-90)");
		
		
	//CALL HERE THE DRAWING FUNCTION
    // WOMENDATA IS NOT DEFINED OUTSIDE
    // Bind data
    var selection = svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		// PAS BESOIN de faire une fonction RATIO, on peut appliquer direct les scales!
		.attr("x", 
			(d,i) => {return xScale(d.dataCountry);})
		.attr("y", 
			(d,i) => {return yScale(timeParser(d.mandateEnd));})
		.attr("width", 10)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("height",
			(d,i) => {
				return rectHeight(d.mandateStart,d.mandateEnd,daysTotal,height);
			}
		)
		.style("fill", (d,i) => {return color(d.continent);})
		.on("mouseover", function(d) {
			handleOnTooltip(d,tooltip);
		})
		.on("mouseout", function(d) {
			handleOutTooltip(d,tooltip);
		});
}

function updateDrawContinent(nest, continent) {
	// Select Data for continent
  	var selectedWomen = nest.filter( (d) => {
  		return d.key == continent;
  	});
  	console.log('selectedWomen:',selectedWomen);
  	
  	var data = selectedWomen[0].values;
  	console.log('data:',data);
  	
  	// Creating scales //
    // Creating scales //
    var minStartDate = d3.min(data, function(d) { return timeParser(d.mandateStart) ; }); 
	var maxEndDate = d3.max(data, function(d) { return timeParser(d.mandateEnd) ; });
    var daysTotal = d3.timeDay.count(minStartDate,maxEndDate);
    //console.log("daysTotal:",daysTotal);

	var yScale = d3.scaleTime()
		.range([height,0]);
		
	// AVANT DE BINDER LES DATA !!! SINON LE SCALE EST FAUX 
	// Pourquoi ??
	yScale.domain([minStartDate,maxEndDate]);
	// RE-CALL Y AXIS
	svg.select('.yaxis').transition().call(d3.axisRight(yScale));

	//USING COUNTRY NAME AS X SCALE
	var xScale = d3.scaleBand().range([0, width]);
	xScale.domain(data.map(function(d) { return d.dataCountry; }));
	
	var xAxis = d3.axisBottom(xScale);
	
	var xAxisSelector = svg.select('.xaxis')
		.transition()
		.call(xAxis)
		.selectAll("text")  
			.style("text-anchor", "end")
			.style("font-size", "9px")
			.attr("dx", "-10px")
			.attr("dy", "-6px")
			.attr("transform", "rotate(-90)");
	
	
		
	//CALL HERE THE DRAWING FUNCTION
    // WOMENDATA IS NOT DEFINED OUTSIDE
    // Bind data
    var selection = svg.selectAll("rect")
    	.remove()
    	.exit()
    	.data(data);
    
    selection.enter()
	.append("rect")
	// PAS BESOIN de faire une fonction RATIO, on peut appliquer direct les scales!
	.on("mouseover", function(d) {
		handleOnTooltip(d,tooltip);
	})
	.on("mouseout", function(d) {
		handleOutTooltip(d,tooltip);
	})
	.attr("x", 
		(d,i) => {return xScale(d.dataCountry);})
	.attr("y", 
		(d,i) => {return yScale(timeParser(d.mandateEnd));})
	.transition(3000)
	.attr("width", 10)
	.attr("rx", 5)
	.attr("ry", 5)
	.attr("height",
		(d,i) => {
			return rectHeight(d.mandateStart,d.mandateEnd,daysTotal,height);
		}
	)
	.style("fill", (d,i) => {return color(d.continent);});
}


function rectHeight(start, end, totalDays, height){
	return (d3.timeDay.count(timeParser(start),timeParser(end)) * height) / totalDays ;
}

function color(continent){
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
   		.duration(500)
   		.style("opacity", .9);

   	// $(selector).html(content) >> ici on utilise pas $ > car sélecteur d3 : on a déjà fait var tooltip = d3.select("body").append("div") ...
	tooltip.html(printWomen(d))
		// On utilise style pour définir l'endroit d'affichage
	   .style("left", (d3.event.pageX) + "px")
	   .style("top", (d3.event.pageY) + "px");
	   /* => Comment faire pour référencer le centre du rond : eg les attributs cx et cy de l'élément circle
	   .style("left", (this.attr("cx") + "px"))
	   .style("top", (this.attr("cy") + "px")); 
	   */ 
}

function handleOutTooltip(d, tooltip) {
	tooltip.transition()
       .duration(500)
       .style("opacity", 0);
}

function printWomen(women) {
	// trouver comment on fait la break ligne
	var timeFormat = d3.timeFormat("%d/%m/%Y");
	
	// later to include link '<a href= "http://google.com">' + formatTime(d.date) + 	"</a>" 
	return '<b>Name: </b>' + women.name 
			+ '<br/> <b> Country: </b>' + women.dataCountry
			+ '<br/> <b> Mandate: </b>' + women.mandateStart + '-' + women.mandateEnd;
	
}

</script>



Suspendisse a convall
