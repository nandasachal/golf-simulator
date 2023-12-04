import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

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
  }

  return (
    <div class="text-center my-2 px-5">
      <label for="customRange1" className="form-label">{props.name} ({sliderValue}{props.units}) </label>
      <input type="range" className="form-range" min={props.minValue} max={props.maxValue} step={props.steps} id="customRange1" value={sliderValue} onChange={handleSliderChange}/>
    </div>
  );
}

export default SliderVariable;