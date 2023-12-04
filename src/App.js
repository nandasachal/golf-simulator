import logo from './assets/images/logo.svg';
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import SliderVariable from './SliderVariable';
import GolfRangeComponent from './GolfRangeComponent';
import GolfBallPathComponent from './GolfBallPathComponent';
import AnimationComponent from './AnimationComponent';
import AnimationResizerComponent from './AnimationResizerComponent';
import { MyContext } from './MyContext'; // Import the context
import DescriptionComponent from './DescriptionComponent';

function App() {

  const [clubFaceAngleSliderValue, setClubFaceAngleSliderState] = useState(0.0);
  const [clubPathAngleSliderValue, setClubPathAngleSliderState] = useState(0.0);
  const [ballCurve, setBallCurveState] = useState([]);
  const [clubPathDirection, setClubPathDirectionState] = useState("straight");

  //Calculate description. Pass in integers
  const updateDescription = (CFAngle, CPAngle) => {
    var difference = CPAngle - CFAngle;

    var curveMagnitude = "";
    if (CPAngle < CFAngle) {
      if (difference > 6) {
        curveMagnitude = "slice";
      } else {
        curveMagnitude = "fade";
      }
      setBallCurveState(["less than", "out-to-in", "open", "left-to-right", "fade", "slice", curveMagnitude]);
    } else if (CPAngle > CFAngle) {
      if (difference > 6) {
        curveMagnitude = "hook";
      } else {
        curveMagnitude = "draw";
      }
      setBallCurveState(["greater than", "in-to-out", "closed", "right-to-left", "draw", "hook", curveMagnitude]);
    } else {
      setBallCurveState([]);
    }

    var pathDirection = "straight";
    if (CPAngle < 0) {
      pathDirection = "left";
    } else if (CPAngle > 0) {
      pathDirection = "right";
    }
    setClubPathDirectionState(pathDirection);
  };

  // Step 1: Create a function to handle slider value changes
  const handleClubFaceAngleSliderChange = (newValue) => {
    setClubFaceAngleSliderState(newValue);
    updateDescription(parseInt(newValue), parseInt(clubPathAngleSliderValue));
  };

  // Step 1: Create a function to handle slider value changes
  const handleClubPathAngleSliderChange = (newValue) => {
    setClubPathAngleSliderState(newValue);
    updateDescription(parseInt(clubFaceAngleSliderValue), parseInt(newValue));
  };

  return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-default border-bottom border-2 border-dark">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Golf Swing Simulator</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
              <div class="navbar-nav">
                <a class="nav-link" href="https://docs.google.com/forms/d/e/1FAIpQLSfR6vP8GLaPvjIRF9qY8NDl5em_JxNO10pJcJrR03tU-B0YIw/viewform">Feedback</a>
              </div>
            </div>
          </div>
        </nav>
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-sm">
              <div className="text-center text-xl mb-1 rounded">
                Golf Swing Toggles
              </div>
              <SliderVariable 
                name={"Club Face Angle"} 
                minValue={-6}
                maxValue={6} 
                steps={1} 
                defaultValue={0} 
                units={"°"}
                onClubFaceChange={handleClubFaceAngleSliderChange}
              />
              <SliderVariable 
                name={"Club Path Angle"} 
                minValue={-6} 
                maxValue={6} 
                steps={1} 
                defaultValue={0} 
                units={"°"}
                onClubPathChange={handleClubPathAngleSliderChange}
              />
              {/* <SliderVariable 
                name={"Swing Speed"} 
                minValue={60} 
                maxValue={140} 
                steps={1} 
                defaultValue={100} 
                units={"miles per hour"}
              /> */}
               <div className="text-center text-xl my-1 rounded">
                What is Happening Here?
              </div>
              <div className="text-justify border border-2 mb-1">
              <DescriptionComponent
                ballCurve={ballCurve}
                clubPathDirection={clubPathDirection}
              />
              </div>
            </div>
            <div class="col-sm-8">
              <div className="golf-visual-container">
                <GolfRangeComponent/>
                <GolfBallPathComponent 
                  clubFaceAngle={clubFaceAngleSliderValue} 
                  clubPathAngle={clubPathAngleSliderValue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;