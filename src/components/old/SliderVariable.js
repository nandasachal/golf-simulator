import React from "react";

function SliderVariable(props) {
  const handleSliderChange = (event) => {
    props.handleValueChange(event.target.value);
  };

  return (
    <div className="my-2 w-full">
      <p htmlFor="customRange1" className="font-bold">
        {props.name} ({props.value}
        {props.units}){" "}
      </p>
      <input
        type="range"
        className="form-range cursor-pointer w-full"
        min={props.minValue}
        max={props.maxValue}
        step={props.steps}
        id="customRange1"
        value={props.value}
        onChange={handleSliderChange}
      />
    </div>
  );
}

export default SliderVariable;
