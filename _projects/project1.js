function drawChart() {

  var svg = d3.select("div#example").append("svg");

  var selection = svg.selectAll("g")
     .data(numbers)
    .enter().append("g")
    .attr("transform", (d,i) => { return "translate(" + 40*i + "," + (200-d) + ")"; });

  selection.append("rect")
    .attr("width", 39)
    .attr("height", (d,i) => { return d; });

   selection.append("text")
    .attr("x", (d,i) => { return 25; })
    .attr("y", (d,i) => { return 10; })
    .text(function(d) { return d/10; });

}


var numbers = [40, 130, 75, 170, 200];
  
drawChart();

