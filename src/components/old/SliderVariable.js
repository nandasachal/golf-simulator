import React from "react";
import { QuestionCircleFill } from "react-bootstrap-icons";

function SliderVariable(props) {
  const handleSliderChange = (event) => {
    props.handleValueChange(event.target.value);
  };

  return (
    <div className="my-2 w-full">
      <p htmlFor="customRange1" className="font-bold">
        {props.name} ({props.value}
        {props.units}){" "}
        {props.tooltipText && (
          <span
            data-tooltip-id="main-tooltip"
            data-tooltip-content={props.tooltipText}
            className="cursor-pointer"
          >
            <QuestionCircleFill
              size={15}
              className="text-gray-500 ml-1 inline"
            />
          </span>
        )}
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
