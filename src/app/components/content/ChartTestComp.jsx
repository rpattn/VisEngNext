"use client"
import React from "react";
import * as d3 from "d3";

function drawChart(svgRef) {
  const data = [12, 5, 6, 6, 10, 10];
  const h = 300;
  const w = 300;
  const svg = d3.select(svgRef.current);

  svg
    .attr("width", w)
    .attr("height", h)
    .style("margin-top", 50)
    .style("margin-left", 50);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 40)
    .attr("y", (d, i) => h - 10 * d)
    .attr("width", 20)
    .attr("height", (d, i) => d * 10)
    .attr("fill", "steelblue");
}

const ChartTestComp = () => {
  const svg = React.useRef(null);

  React.useEffect(() => {
    drawChart(svg);
  }, [svg]);

  return (
    <div id="chart" className="chartTestComp m-6">
      <svg ref={svg} className="svg1"/>
    </div>
  );
};

export default ChartTestComp;