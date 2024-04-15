import React, { useEffect } from "react";
import "./App.scss";
import GolfRangeComponent from "./components/old/GolfRangeComponent";
import GolfBallPathComponent from "./components/old/GolfBallPathComponent";
import { useNavigate, useLocation } from "react-router-dom";

// import DescriptionComponent from "./components/old/DescriptionComponent";
import Navbar from "./components/navbar";
import FloatingFeedbackButton from "./components/common/floating-feedback-button";
import ParameterSelection from "./components/simulator/parameter-selection";
import { useQueryState } from "./hooks/use-query";
import ButtonRow from "./components/simulator/button-row";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { StartBall } from "./simulate/main";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleClubFaceAngleSliderChange = (newValue) => {
    setClubFaceAngleSliderState(newValue);
  };

  const handleClubPathAngleSliderChange = (newValue) => {
    setClubPathAngleSliderState(newValue);
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

  const handleReset = () => {
    navigate(`${location.pathname?.split("?")[0]}`);
  };

  useEffect(() => {
    if (window.THREE) {
      StartBall(window.THREE);
    }
  }, []);

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

            <ButtonRow handleReset={handleReset} />

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
        <div className="min-h-[500px]">
          <div id="display-container">
            <div id="status-display">
              <ul>
                <li id="status-time"></li>
                <li id="status-distance"></li>
                <li id="status-speed"></li>
                <li id="status-height"></li>
                <li id="status-spin"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FloatingFeedbackButton />
    </div>
  );
}

export default App;
