"use client"
import React from "react";
import * as d3 from "d3";

function drawChart(svgRef,period) {
    const h = 300;
    const w = 300;
    const svg = d3.select(svgRef.current);
    svg.selectAll("path").remove(); 

    svg
    .attr("width", w)
    .attr("height", h)
   
    const width = +svg.attr("width")
    const height = +svg.attr("height")

    const animationLength = (10*period);

    function drawLine() {
        var lineData = [
            {x:150,y:180}, {x:190, y:180},
            {x:170,y:180}, {x:170, y:300},
            {x:50, y:300}, {x:50, y:280},
            {x:50, y:300}, {x:50, y:280},
            {x:20, y:260},{x:80, y:240},  
            {x:20, y:220},{x:80, y:200},
            {x:20, y:180},{x:80, y:160},
            {x:50, y:140},{x:50, y:80}]
        const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0,height]);
        const xScale = d3
        .scaleLinear()
        .range([0, width])
        .domain([0,width]);
        const line = d3
        .line()
        .x(dataPoint => xScale(dataPoint.x))
        .y(dataPoint => yScale(dataPoint.y));

        const chart = svg.append("g")
        const grp = chart.append("g")
        const path = grp
        .append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

        //const pathLength = path.node().getTotalLength();
        // D3 provides lots of transition options, have a play around here:
        // https://github.com/d3/d3-transition
        const transitionPath2 = d3
            .transition()
            .ease(d3.easeSin)
            .duration(animationLength);

        path
        .attr("transform", "scale(1,0.4)")
        .transition(transitionPath2)
        .attr("transform", "scale(1,1)")
        .on('end', () => {
            path
            .transition()
            .ease(d3.easeSin)
            .duration(animationLength)
            .attr("transform", "scale(1,0.4)")
            });
            

            //{x:270,y:300}, {x:270, y:200},
            //{x:250,y:200}, {x:290, y:200},


        const chart3 = svg.append("g")
        const grp3 = chart3.append("g")
        const damperTube = grp3
        .append("path")
        .datum([
            {x:200,y:30}, {x:0, y:30},
            {x:170,y:30}, {x:170, y:150},
            {x:150,y:150}, {x:190, y:150},
            {x:190,y:270}, {x:190, y:150},
            {x:150,y:150}, {x:150, y:270}
        ])
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

        const chart2 = svg.append("g")
        const grp2 = chart2.append("g")
        const topLine = grp2
        .append("path")
        .datum([
            {x:200,y:300}, {x:0, y:300},
        ])
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    /*path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath2)
        .attr("stroke-dashoffset", 0)
        .on('end', () => {
        path
        .transition()
        .ease(d3.easeSin)
        .duration(animationLength)
            .attr("stroke-dashoffset", pathLength)
            .attr("stroke-dasharray", pathLength)
        });*/
    }

    function drawCircle() {

        const radius = 30
        const dx = 100
    
        var circle = svg
        .append("circle")
        .attr("cx", 50)    //dst from left edge
        .attr("cy", 100) //dst from top
        .attr("r", radius) //radius 
        .attr("fill", "steelblue")
       
        const transitionPath = d3
        .transition()
        .ease(d3.easeSin)
        .duration(animationLength)
    
        circle.transition(transitionPath)
        .attr("transform", `translate(0,${dx})`)
        .on('end', () => {
            circle
            .transition()
            .ease(d3.easeSin)
            .duration(animationLength)
            .attr("transform", `translate(0,${0})`)
            .on('end', () => {
                svg.select("circle").remove();
                svg.select("path").remove(); 
                drawChart(svgRef, period)})
           });
    
    }

    drawLine()
    drawCircle()

   
}


const Visual1Comp = ({value}) => {
  const svg = React.useRef(null);

  React.useEffect(() => {
    d3.select(svg.current).selectAll("*").interrupt(); 
    d3.select(svg.current).selectAll("*").remove(); 
    drawChart(svg, value)
  }, [svg, value]);


  return (
    <div id="chart" className="chartTestComp m-6">
      <svg ref={svg} className="svg1"/>
    </div>
  );
};

export default Visual1Comp;