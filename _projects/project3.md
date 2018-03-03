---
title: Project 3
layout: projects
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum sit amet magna ut ullamcorper. 


<div id="example"></div>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script>

function drawChart() {

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


var numbers = {{ site.data.numbers | jsonify }};
console.log('numbers', numbers);
  
drawChart();




</script>



Suspendisse a convall
