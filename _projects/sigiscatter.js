// WOMEN HEAD JAVASCRIPT


// DEFINE DRAWING AREA SIZING
var height = 550;
var width = 550;
var chartSize = 250;
var marginTop = 10;
var marginBottom = 150;
var marginSide = 30;


/// TOOLTIP ///
// Add a div that will go wherever in the body 

var tooltip2 = d3.select("body").append("div")
	.attr("class", "tooltip2")
	.style("opacity", 0);
	

// LOADING CSV
d3.csv("../jsdata/sigisubindex.csv", function(inputdata) {

	//console.log("project 2 input sigi scatter",inputdata);
	
	
    dataSIGI = inputdata.map(function(d) {    
        return {
        	"country": d.Country,
        	"parliament2014": +d.parliament2014 / 100,
        	"sigi": +d.SIGI,
        	"Discriminatory family code": +d["Discriminatory family code"],
        	//"Restricted civil liberties": +d.["Discriminatory family code"],
        	"Restricted physical integrity": +d["Restricted physical integrity"],
        	"Restricted resources and assets": +d["Restricted resources and assets"],
        	"Son bias": +d["Son bias"]
        } ;
    });
  
    console.log("project 2 sigi scatter output data:",dataSIGI);
    var subindex = [
			{
				"label": "Discriminatory family code",
				"id": "#sub1"
			},
			{
				"label": "Restricted physical integrity",
				"id": "#sub2"
			},
			{
				"label": "Restricted resources and assets",
				"id": "#sub3"
			},
			{
				"label": "Son bias",
				"id": "#sub4"
			}
    ];  
    
    //COMPUTING % > 0.5 for each
    var percFormat = d3.format(".0%");
    for(var i=0 ; i<subindex.length; i++){
		var number = 0;
		dataSIGI.forEach( (g) => {
			if (g[subindex[i].label] > 0.5) { number++; }
		})
		subindex[i].perc = percFormat(number / dataSIGI.length);
		//console.log(number); 
	}
	//console.log(subindex);
     
    //DRAWING
    for(var i=0 ; i<subindex.length; i++){
    	//console.log(subindex[i]);
    	drawSIGI(dataSIGI,subindex[i]);  
	}
    
	/*
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
    	updateDrawContinent(nestWomen,selectedContinent,nestWomenSumContinent);
    });
    */

});

function drawSIGI(data,index){
    
	// CREATE DRAWING PART MOVED 30,30 FROM SVG
	console.log('index',index);
	var selection = d3.select(index.id)
	.attr("width", chartSize + 2*marginSide)
	.attr("height", chartSize + 2*marginSide)
		.append("g")
		.attr("transform", "translate(" + (marginSide + 10) + "," + marginSide + ")");

	
	var yScale = d3.scaleLinear()
		.range([chartSize,0])
		.domain([0,1]);
		
	var xScale = d3.scaleLinear()
		.range([0, chartSize])
		.domain([0,1]);
	
	var xAxis = d3.axisBottom(xScale);
	var yAxis = d3.axisLeft(yScale);
	

	var xAxisSelector = selection.append("g")
		.attr("transform", "translate(" + 0 + "," + chartSize + ")")
		.attr("class","ax")
		.call(xAxis
			.ticks(5)
		);

	selection.append("g")
		.attr("class","ax")
		.call(yAxis
			.ticks(5)
			.tickFormat(d3.format(".0%"))
		);
	
	//LEGEND
	selection
	.append("text").text(index.label + '\n ' )
	.attr("class","label")
	.attr("transform", "translate(" + 10 + "," + 10 + ")");
	
	selection
	.append("text").text(index.perc + ' of listed countries are above 0.5')
	.attr("class","descr")
	.attr("transform", "translate(" + 10 + "," + 25 + ")");

	//BINDING DATA
	selection.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("class","country")
	// PAS BESOIN de faire une fonction RATIO, on peut appliquer direct les scales!
	.attr("cx", 
		(d,i) => {return xScale(d[index.label]);})
	.attr("cy", 
		(d,i) => {return yScale(d.parliament2014);})
	.attr("r", 5)
	.style("fill",
		(d,i) => {return colorSIGI(d[index.label]);})
	    .on("mouseover", function(d,i) {
		handleOnTooltipSIGI(d.country,tooltip2);
	})
	.on("mouseout", function(d,i) {
		handleOutTooltipSIGI(d,tooltip2);
	});

	
	selection.append("line")  
    .style("stroke", "black")  // colour the line
    .attr("x1", 
    	(d,i) => {return xScale(0.5);})
    .attr("y1", 
    	(d,i) => {return yScale(0);})
    .attr("x2", 
    	(d,i) => {return xScale(0.5);})
    .attr("y2",
    	(d,i) => {return yScale(0.85);})

	/*
	.style("fill", (d,i) => {return color(d.continent);})
	
	*/
}



function colorSIGI(d){
	var color = "LightGray";

	if (d > 0.5) {color = "LightSkyBlue";}	
	return color;
	
}

function handleOnTooltipSIGI(d, tooltip) {
	tooltip.transition()
   		.duration(10)
   		.style("opacity", .9);


	tooltip.html("   "+d)
	   .style("left", (d3.event.pageX) + "px")
	   .style("top", (d3.event.pageY-15) + "px");

}

function handleOutTooltipSIGI(d, tooltip) {
	tooltip.transition()
       .duration(10)
       .style("opacity", 0);
}


function printIndexLegend(subindex) {
	return subindex.label + '\n ' + subindex.perc + ' of listed countries are above 0.5'; 
}








