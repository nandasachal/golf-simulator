import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SliderVariable from "./components/old/SliderVariable";
import GolfRangeComponent from "./components/old/GolfRangeComponent";
import GolfBallPathComponent from "./components/old/GolfBallPathComponent";

import DescriptionComponent from "./components/old/DescriptionComponent";

function App() {
  const background =
    "In the diagram, the target is straight, at 0° Club Path Angle. When using the toggles, " +
    "a negative angle means pointing to the left more, and a positive angle means pointing to the right. " +
    "Club Path Angle is the direction of your swing in relation to the target. Club Face Angle is the direction of the " +
    "actual club face in relation to the target. The simulation is created assuming you are an amateur right-handed golfer, " +
    "carrying a driver about 250 yards. The results are estimates intended for conveying an idea and educating, not actuals.";

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
      setBallCurveState([
        "less than",
        "out-to-in",
        "open",
        "left-to-right",
        "fade",
        "slice",
        curveMagnitude,
      ]);
    } else if (CPAngle > CFAngle) {
      if (difference > 6) {
        curveMagnitude = "hook";
      } else {
        curveMagnitude = "draw";
      }
      setBallCurveState([
        "greater than",
        "in-to-out",
        "closed",
        "right-to-left",
        "draw",
        "hook",
        curveMagnitude,
      ]);
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
      <nav className="navbar navbar-expand-lg navbar-default border-bottom border-2 border-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Golf Swing Simulator</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <div className="navbar-nav">
              <a
                className="nav-link"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfR6vP8GLaPvjIRF9qY8NDl5em_JxNO10pJcJrR03tU-B0YIw/viewform"
              >
                Feedback
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm">
            <div className="text-center text-xl mb-1 rounded">Background</div>
            <div className="text-justify mb-1">{background}</div>
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
              Understanding the Ball Flight
            </div>
            <div className="text-justify mb-1">
              <DescriptionComponent
                ballCurve={ballCurve}
                clubPathDirection={clubPathDirection}
              />
            </div>
          </div>
          <div className="col-xl-8">
            <div className="golf-visual-container">
              <GolfRangeComponent />
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
