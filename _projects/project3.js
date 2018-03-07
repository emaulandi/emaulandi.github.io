function drawChart(numbers) {

  var svg = d3.select("div#example").append("svg");

  var selection = svg.selectAll("g")
     .data(numbers)
    .enter().append("g")
    .attr("transform", (d) => { return "translate(" + 40*d.id + "," + (200-d.number) + ")"; });

  selection.append("rect")
    .attr("width", 39)
    .attr("height", (d) => { return d.number; });

   selection.append("text")
    .attr("x", (d,i) => { return 25; })
    .attr("y", (d,i) => { return 10; })
    .text(function(d) { return d.number/10; });

}


//var numbers = {{ site.data.numbers | jsonify }};

d3.csv('../jsdata/numbers.csv', function(numbers) {
	console.log('numbers', numbers);
	  
	drawChart(numbers);
});

