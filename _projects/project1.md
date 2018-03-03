---
title: Project 1
layout: projects
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum sit amet magna ut ullamcorper. 
Aenean convallis risus ac laoreet euismod. Maecenas efficitur metus eu interdum euismod. Proin sodales lorem a feugiat semper. 
Proin facilisis lorem a justo vulputate, quis accumsan nisi pellentesque. Nunc porta dictum convallis. Morbi fringilla ligula vel ultricies mollis. 
Suspendisse a convallis nulla. Vestibulum nec ullamcorper est. Curabitur a tortor et orci venenatis pharetra. 

<div id="example"></div>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script>

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




</script>



Suspendisse a convall
