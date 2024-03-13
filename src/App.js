import React, { useState } from "react";
import "./App.css";
import GolfRangeComponent from "./components/old/GolfRangeComponent";
import GolfBallPathComponent from "./components/old/GolfBallPathComponent";

// import DescriptionComponent from "./components/old/DescriptionComponent";
import Navbar from "./components/navbar";
import FloatingFeedbackButton from "./components/common/floating-feedback-button";
import ParameterSelection from "./components/simulator/parameter-selection";

function App() {
  // const background =
  //   "In the diagram, the target is straight, at 0° Club Path Angle. When using the toggles, " +
  //   "a negative angle means pointing to the left more, and a positive angle means pointing to the right. " +
  //   "Club Path Angle is the direction of your swing in relation to the target. Club Face Angle is the direction of the " +
  //   "actual club face in relation to the target. The simulation is created assuming you are an amateur right-handed golfer, " +
  //   "carrying a driver about 250 yards. The results are estimates intended for conveying an idea and educating, not actuals.";

  const [clubFaceAngleSliderValue, setClubFaceAngleSliderState] = useState(0.0);
  const [clubPathAngleSliderValue, setClubPathAngleSliderState] = useState(0.0);
  // const [ballCurve, setBallCurveState] = useState([]);
  // const [clubPathDirection, setClubPathDirectionState] = useState("straight");

  //Calculate description. Pass in integers
  // const updateDescription = (CFAngle, CPAngle) => {
  //   var difference = CPAngle - CFAngle;

  //   var curveMagnitude = "";
  //   if (CPAngle < CFAngle) {
  //     if (difference > 6) {
  //       curveMagnitude = "slice";
  //     } else {
  //       curveMagnitude = "fade";
  //     }
  //     setBallCurveState([
  //       "less than",
  //       "out-to-in",
  //       "open",
  //       "left-to-right",
  //       "fade",
  //       "slice",
  //       curveMagnitude,
  //     ]);
  //   } else if (CPAngle > CFAngle) {
  //     if (difference > 6) {
  //       curveMagnitude = "hook";
  //     } else {
  //       curveMagnitude = "draw";
  //     }
  //     setBallCurveState([
  //       "greater than",
  //       "in-to-out",
  //       "closed",
  //       "right-to-left",
  //       "draw",
  //       "hook",
  //       curveMagnitude,
  //     ]);
  //   } else {
  //     setBallCurveState([]);
  //   }

  //   var pathDirection = "straight";
  //   if (CPAngle < 0) {
  //     pathDirection = "left";
  //   } else if (CPAngle > 0) {
  //     pathDirection = "right";
  //   }
  //   setClubPathDirectionState(pathDirection);
  // };

  const handleClubFaceAngleSliderChange = (newValue) => {
    setClubFaceAngleSliderState(newValue);
    // updateDescription(parseInt(newValue), parseInt(clubPathAngleSliderValue));
  };

  const handleClubPathAngleSliderChange = (newValue) => {
    setClubPathAngleSliderState(newValue);
    // updateDescription(parseInt(clubFaceAngleSliderValue), parseInt(newValue));
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm">
            {/* <div className="text-center text-xl mb-1 rounded">Background</div>
            <div className="text-justify mb-1">{background}</div> */}
            <div className="text-center text-xl mb-1 rounded">
              Golf Swing Toggles
            </div>

            <ParameterSelection
              handleClubFaceAngleSliderChange={handleClubFaceAngleSliderChange}
              handleClubPathAngleSliderChange={handleClubPathAngleSliderChange}
            />

            {/* <div className="text-center text-xl my-1 rounded">
              Understanding the Ball Flight
            </div>
            <div className="text-justify mb-1">
              <DescriptionComponent
                ballCurve={ballCurve}
                clubPathDirection={clubPathDirection}
              />
            </div> */}
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
      <FloatingFeedbackButton />
    </div>
  );
}

export default App;
