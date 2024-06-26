import React, { useEffect } from "react";
import "./App.scss";
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
import {
  CLUB_FACE_ANGLE_VALUES,
  CLUB_PATH_ANGLE_VALUES,
  SWING_SPEED_VALUES,
} from "./utils/constant";

let shot = null;
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [side, setSide] = useQueryState("side", "Right", false);
  // InitHorizontalAngle
  const [clubFaceAngleSliderValue, setClubFaceAngleSliderState] = useQueryState(
    "face",
    CLUB_FACE_ANGLE_VALUES.DEFAULT,
    true
  );
  // InitSpinAngle
  const [clubPathAngleSliderValue, setClubPathAngleSliderState] = useQueryState(
    "path",
    CLUB_PATH_ANGLE_VALUES.DEFAULT,
    true
  );
  // InitSpeedMPH
  const [swingSpeedSliderValue, setSwingSpeedSliderState] = useQueryState(
    "speed",
    SWING_SPEED_VALUES.DEFAULT,
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
      shot = StartBall(window.THREE, {
        initSpeedMPH: swingSpeedSliderValue,
        initSpinAngle: clubFaceAngleSliderValue * (side === "Left" ? -1 : 1),
        initHorizontalAngleDegrees:
          clubPathAngleSliderValue * (side === "Left" ? -1 : 1),
      });
    }
    toggleZoom();
    window.addEventListener("resize", toggleZoom);
  }, []);

  const handleClick = () => {
    if (shot) {
      shot.shotControl.initSpeedMPH = swingSpeedSliderValue;
      shot.shotControl.initSpinAngle =
        clubFaceAngleSliderValue * (side === "Left" ? -1 : 1);
      shot.shotControl.initHorizontalAngleDegrees =
        clubPathAngleSliderValue * (side === "Left" ? -1 : 1);
      shot.beginShot();
    }
  };

  const toggleZoom = () => {
    if (window.THREE && window.THREE.OrbitControls) {
      if (window.innerWidth <= 768) {
        window.gsZoomFeature = false;
      } else {
        window.gsZoomFeature = true;
      }
    }
  };

  return (
    <div className="relative pb-20">
      <div>
        <Toaster />
        <Tooltip id="main-tooltip" style={{ maxWidth: "300px" }} />
      </div>

      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 border-gray-50 border shadow-lg rounded-lg bg-white order-last md:order-first h-full flex flex-col justify-between">
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

            <ButtonRow handleReset={handleReset} simulate={handleClick} />

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
            {/* <div className="relative">
              <GolfRangeComponent />
              <GolfBallPathComponent
                clubFaceAngle={clubFaceAngleSliderValue}
                clubPathAngle={clubPathAngleSliderValue}
              />
            </div> */}
            <div className="h-full">
              <div id="display-container">
                <div className="absolute top-4 right-4 bg-gray-200 p-2 w-[80px] font-semibold text-center aspect-square flex items-center justify-center text-lg flex-col">
                  <p id="distance-display"></p>
                  <p className="text-sm font-normal">Yards</p>
                </div>

                <div id="status-display">
                  <canvas
                    id="golf-course"
                    className=" bg-white shadow-lg rounded-lg min-h-[300px]"
                  ></canvas>
                  <ul className="hidden">
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
        </div>
      </div>
      <FloatingFeedbackButton />
    </div>
  );
}

export default App;
