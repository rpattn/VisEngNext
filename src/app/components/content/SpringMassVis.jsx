"use client"
import React from "react";
import LineChartComp from "./LineChartComp";
import Visual1Comp from "./Visual1Comp";

const SpringMassVis = () => {
    const slider = React.useRef(null);
    const [sliderVal, sliderUpdateVal] = React.useState(50);
    var sliderUpdating = false;

    function sliderUpdate() {
        console.log(sliderVal)
        if (!sliderUpdating) {
            sliderUpdating = true
            setTimeout(()=>{
                sliderUpdateVal(slider.current.value)
                sliderUpdating = false
            },500)
        }
    }

    return (
        <div>
            <input type="range" min="30" max="200" ref={slider} onChange={sliderUpdate}></input>
        <div className="lg:grid lg:grid-cols-2">
            {sliderVal}
            <div className="lg:col-span-1 lg:col-start-1">
                <LineChartComp value={sliderVal}></LineChartComp>
            </div>
            <div className="lg:col-span-1 lg:col-start-2">
                <Visual1Comp value={sliderVal}></Visual1Comp>
            </div>
        </div>
        </div>
    );
};
    
export default SpringMassVis;