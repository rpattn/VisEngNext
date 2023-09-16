"use client"
import React from "react";
import * as d3 from "d3";

function drawChart(svgRef, data) {
  const h = 300;
  const w = 300;
  const svg = d3.select(svgRef.current);
  
  //Set up svg
  svg                                     
  .attr("width", w)
  .attr("height", h)
   
  // Create SVG and padding for the chart
  const margin = { top: 0, bottom: 30, left: 30, right: 30 };
  const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;
  const grp = chart
  .append("g")
  .attr("transform", `translate(-${margin.left},-${margin.top})`)
  .attr("stroke", "white")
   
  // Create scales
  const yScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain(d3.extent(data, dataPoint => dataPoint.y));
  const xScale = d3
  .scaleLinear()
  .range([0, width])
  .domain(d3.extent(data, dataPoint => dataPoint.x));
   
  const line = d3
  .line()
  .x(dataPoint => xScale(dataPoint.x))
  .y(dataPoint => yScale(dataPoint.y));
   
  // Add path
  const path = grp
  .append("path")
  .attr("transform", `translate(${margin.left},0)`)
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 1.5)
  .attr("d", line);
  
  const pathLength = path.node().getTotalLength();
  // D3 provides lots of transition options, have a play around here:
  // https://github.com/d3/d3-transition
  const transitionPath = d3
  .transition()
  .ease(d3.easeSin)
  .duration(5000);
   
  path
  .attr("stroke-dashoffset", pathLength)
  .attr("stroke-dasharray", pathLength)
  .transition(transitionPath)
  .attr("stroke-dashoffset", 0)
  .on('end', () => {
    path
      .interrupt()
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      drawChart(svgRef, data)
    });
   
  // Add the X Axis
  chart
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale).ticks(data.length/10));
  // Add the Y Axis
  chart
  .append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(yScale));
}

function generateData() {
  var data = []
  for (var i = 0; i<100; i++) {
    data.push({x: i, y: (30*Math.sin(i/10))})
  }
  return data
}


const LineChartComp = () => {
  const svg = React.useRef(null);

  var data = generateData()

  React.useEffect(() => {
    drawChart(svg, data)
  }, [svg]);


  return (
    <div id="chart" className="chartTestComp m-6">
      <svg ref={svg} className="svg1"/>
    </div>
  );
};

export default LineChartComp;