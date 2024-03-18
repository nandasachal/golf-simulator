import React, { useState } from "react";

function SliderVariable(props) {
  // const [sliderValue, setSliderValue] = useState(defaultValue);
  const [sliderValue, setSliderValue] = useState(props.defaultValue);

  const handleSliderChange = (event) => {
    // Access event properties, e.g., event.target.value
    // console.log('Input value:', event.target.value);
    setSliderValue(event.target.value); //this updates the state so we can keep track of it

    if (props.onClubFaceChange) {
      console.log("CHANGING CLUB FACE");
      props.onClubFaceChange(event.target.value);
    }

    if (props.onClubPathChange) {
      console.log("CHANGING CLUB PATH");
      props.onClubPathChange(event.target.value);
    }
  };

  return (
    <div class="my-2 w-full">
      <p for="customRange1" className="font-bold">
        {props.name} ({sliderValue}
        {props.units}){" "}
      </p>
      <input
        type="range"
        className="form-range cursor-pointer w-full"
        min={props.minValue}
        max={props.maxValue}
        step={props.steps}
        id="customRange1"
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
}

export default SliderVariable;
