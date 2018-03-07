// WOMEN HEAD JAVASCRIPT


// DEFINE DRAWING AREA SIZING
var height = 550;
var width = 550;
var VOTEchartSize = 400;
var marginTop = 10;
var marginBottom = 150;
var marginSide = 35;


/// TOOLTIP ///
// Add a div that will go wherever in the body 

var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);	
	
// CREATE DRAWING PART MOVED 30,30 FROM SVG
var selection = d3.select("#vote")
	.attr("width", VOTEchartSize + 2*marginSide)
	.attr("height", VOTEchartSize + 2*marginSide)
		.append("g")
		.attr("transform", "translate(" + marginSide + "," + marginSide + ")");

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
  	
  	// ADD World as option
  	nestContinent.unshift({"key": "World", "values": []});

	// A DROPDOWN SELECTION FOR THE CONTINENT
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
  
    continentMenu.on('change', () => {
    	var selectedContinent = d3.select("select").property("value");
    	console.log("selectedContinent",selectedContinent);
    	updateDraw(selectedContinent, nestContinent, data);
    });

	//DRAWING
    draw(data); 

    //updateDraw('World', nestContinent, data);

});

function draw(data){
    
	console.log("VOTE draw function");
	var yScale = d3.scaleLinear()
		.range([VOTEchartSize,0])
		.domain([0,0.6]);
		
	var xScale = d3.scaleLinear()
		.range([0, VOTEchartSize])
		.domain([1860,2017]);
	
	var xAxis = d3.axisBottom(xScale);
	var yAxis = d3.axisLeft(yScale);
	

	var xAxisSelector = selection.append("g")
		.attr("transform", "translate(" + 0 + "," + VOTEchartSize + ")")
		.attr("class","ax")
		.call(xAxis
			.ticks(5)
			.tickFormat(d3.format("d"))
		);

	selection.append("g")
		.attr("class","ax")
		.call(yAxis
			.ticks(5)
			.tickFormat(d3.format(".0%"))
		);

	//BINDING DATA
	selection.selectAll("circle")
	.data(data)
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
		handleOnTooltip(d.country,tooltip);
	})
	.on("mouseout", function(d,i) {
		handleOutTooltip(d,tooltip);
	});

}

function updateDraw(continent, nestContinent, data){

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
  	
	
	var yScale = d3.scaleLinear()
		.range([VOTEchartSize,0])
		.domain([0,0.6]);
		
	var xScale = d3.scaleLinear()
		.range([0, VOTEchartSize])
		.domain([1860,2017]);
	
	//BINDING DATA
	selection.selectAll("circle")
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
		handleOnTooltip(d.country,tooltip);
	})
	.on("mouseout", function(d,i) {
		handleOutTooltip(d,tooltip);
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








