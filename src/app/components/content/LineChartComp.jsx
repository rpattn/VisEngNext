"use client"
import React from "react";
import * as d3 from "d3";

function drawChart(svgRef, data) {
  const h = 180;
  const w = 250;
  const svg = d3.select(svgRef.current);

  svg
    .attr("width", w)
    .attr("height", h)
    .style("margin-top", 50)
    .style("margin-left", 50);

    // Add X axis and Y axis
    var x = d3.scaleTime().range([0, w]);
    var y = d3.scaleLinear().range([h, 0]);
    //x.domain(d3.extent(data, (d) => { return d.x; }));
    x.domain([0,500])
    //y.domain([0, d3.max(data, (d) => { return d.y; })]);
    y.domain([0,2000])

  svg.append("g")
   .attr("transform", `translate(0, ${h})`)
   .call(d3.axisBottom(x));
  svg.append("g")
   .call(d3.axisLeft(y));

    // add the Line
    var valueLine = d3.line()
    .x((d) => { return x(d.x); })
    .y((d) => { return y(d.y); });

    svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", valueLine)
}

const LineChartComp = () => {
  const svg = React.useRef(null);
  const btn = React.useRef(null);
  var animateBool = true;

  var data = [{x: 1, y: 2},{x: 2, y: 3},{x: 3, y: 2},{x: 4, y: 11}]
  var fullData = [...data]
  for(var i=0; i < 100; i++) {
    fullData.push({x: (5+(4*i)), y:(3*i)})
  }

  React.useEffect(() => {
    animate()
  }, [svg]);

  function animate () {
    if(animateBool) {
        if (data.length < fullData.length) {
            data.push(fullData[data.length])
        } else {
            d3.select(svg.current).selectAll("path").remove()
            data = [fullData[0], fullData[1]]
        }
        drawChart(svg, data)
        setTimeout(()=>{animate()}, 5)
    }
  }

  function stopAnimate() {
    animateBool = !animateBool;
    animate()
  }

  return (
    <div id="chart" className="chartTestComp">
      <svg ref={svg} />
      <button onClick={stopAnimate} ref={btn} className="btn btn-primary">Stop/Start</button>
    </div>
  );
};

export default LineChartComp;