import React from "react";
import "./App.scss";
import GolfRangeComponent from "./components/old/GolfRangeComponent";
import GolfBallPathComponent from "./components/old/GolfBallPathComponent";

// import DescriptionComponent from "./components/old/DescriptionComponent";
import Navbar from "./components/navbar";
import FloatingFeedbackButton from "./components/common/floating-feedback-button";
import ParameterSelection from "./components/simulator/parameter-selection";
import { useQueryState } from "./hooks/use-query";
import ButtonRow from "./components/simulator/button-row";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";

function App() {
  // const background =
  //   "In the diagram, the target is straight, at 0° Club Path Angle. When using the toggles, " +
  //   "a negative angle means pointing to the left more, and a positive angle means pointing to the right. " +
  //   "Club Path Angle is the direction of your swing in relation to the target. Club Face Angle is the direction of the " +
  //   "actual club face in relation to the target. The simulation is created assuming you are an amateur right-handed golfer, " +
  //   "carrying a driver about 250 yards. The results are estimates intended for conveying an idea and educating, not actuals.";

  // const [side, setSide] = useState("Left");
  // const [clubFaceAngleSliderValue, setClubFaceAngleSliderState] = useState(0.0);
  // const [clubPathAngleSliderValue, setClubPathAngleSliderState] = useState(0.0);
  // const [swingSpeedSliderValue, setSwingSpeedSliderState] = useState(140.0);

  const [side, setSide] = useQueryState("side", "Left", false);
  const [clubFaceAngleSliderValue, setClubFaceAngleSliderState] = useQueryState(
    "face",
    0.0,
    true
  );
  const [clubPathAngleSliderValue, setClubPathAngleSliderState] = useQueryState(
    "path",
    0.0,
    true
  );
  const [swingSpeedSliderValue, setSwingSpeedSliderState] = useQueryState(
    "speed",
    140.0,
    true
  );

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

  const handleValueChange = (type, newValue) => {
    if (type === "side") {
      setSide(newValue);
    } else if (type === "clubFaceAngle") {
      setClubFaceAngleSliderState(newValue);
    } else if (type === "clubPathAngle") {
      setClubPathAngleSliderState(newValue);
    } else if (type === "swingSpeed") {
      setSwingSpeedSliderState(newValue);
    }
  };

  return (
    <div className="relative ">
      <div>
        <Toaster />
        <Tooltip id="main-tooltip" style={{ maxWidth: "300px" }} />
      </div>

      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 border-gray-50 border shadow-lg rounded-lg bg-white h-fit order-last md:order-first">
            {/* <div className="text-center text-xl mb-1 rounded">Background</div>
            <div className="text-justify mb-1">{background}</div> */}
            <div className="text-center text-xl text-primary-600 mb-2 rounded-md font-bold py-2">
              Golf Swing Toggles
            </div>
            <hr />

            <ParameterSelection
              values={{
                clubFaceAngleSliderValue,
                clubPathAngleSliderValue,
                swingSpeedSliderValue,
                side,
              }}
              handleValueChange={handleValueChange}
              handleClubFaceAngleSliderChange={handleClubFaceAngleSliderChange}
              handleClubPathAngleSliderChange={handleClubPathAngleSliderChange}
            />

            <ButtonRow />

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
          <div className="md:col-span-2">
            <div className="relative">
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
