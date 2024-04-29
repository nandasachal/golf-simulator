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

let shot = null;
function App() {
  const navigate = useNavigate();
  const location = useLocation();

<<<<<<< HEAD
  const [side, setSide] = useQueryState("side", "Right", false);
  // InitHorizontalAngle
  const [clubFaceAngleSliderValue, setClubFaceAngleSliderState] = useQueryState(
    "face",
    0.0,
    true
  );
  // InitSpinAngle
  const [clubPathAngleSliderValue, setClubPathAngleSliderState] = useQueryState(
    "path",
    0.0,
    true
  );
  // InitSpeedMPH
  const [swingSpeedSliderValue, setSwingSpeedSliderState] = useQueryState(
    "speed",
    80.0,
    true
  );

=======
  const background = "In the diagram, the target is straight, at 0° Club Path Angle. When using the toggles, " 
    + "a negative angle means pointing to the left more, and a positive angle means pointing to the right. "
    + "Club Path Angle is the direction of your swing in relation to the target. Club Face Angle is the direction of the "
    + "actual club face in relation to the target. The simulation is created assuming you are an amateur right-handed golfer, "
    + "carrying a driver about 250 yards. The results are estimates intended for conveying an idea and educating, not actuals.";

  const [clubFaceAngleSliderValue, setClubFaceAngleSliderState] = useState(0.0);
  const [clubPathAngleSliderValue, setClubPathAngleSliderState] = useState(0.0);
  const [ballCurve, setBallCurveState] = useState([]);
  const [clubPathDirection, setClubPathDirectionState] = useState("straight");

  //Calculate description. Pass in integers
  const updateDescription = (CFAngle, CPAngle) => {
    var difference = CPAngle - CFAngle;

    var curveMagnitude = "";
    if (CPAngle < CFAngle) {
      if (Math.abs(difference) > 6) {
        curveMagnitude = "slice";
      } else {
        curveMagnitude = "fade";
      }
      setBallCurveState(["less than", "out-to-in", "open", "left-to-right", "fade", "slice", curveMagnitude]);
    } else if (CPAngle > CFAngle) {
      if (Math.abs(difference) > 6) {
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
>>>>>>> 781e78dd60d2194ba9915f175ae0705e536271d9
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
        initHorizontalAngleDegrees:
          clubFaceAngleSliderValue * (side === "Left" ? -1 : 1),
        initSpinAngle: clubPathAngleSliderValue * (side === "Left" ? -1 : 1),
      });
    }
  }, []);

  const handleClick = () => {
    if (shot) {
      shot.shotControl.initSpeedMPH = swingSpeedSliderValue;
      shot.shotControl.initHorizontalAngleDegrees =
        clubFaceAngleSliderValue * (side === "Left" ? -1 : 1);
      shot.shotControl.initSpinAngle =
        clubPathAngleSliderValue * (side === "Left" ? -1 : 1);
      shot.beginShot();
    }
  };

  return (
    <div className="relative pb-20">
      <div>
<<<<<<< HEAD
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

            <ButtonRow handleReset={handleReset} simulate={handleClick} />

            {/* <div className="text-center text-xl my-1 rounded">
              Understanding the Ball Flight
            </div>
            <div className="text-justify mb-1">
=======
        <nav className="navbar navbar-expand-lg navbar-default border-bottom border-2 border-dark">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Golf Swing Simulator</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <div className="navbar-nav">
                <a className="nav-link" href="https://docs.google.com/forms/d/e/1FAIpQLSfR6vP8GLaPvjIRF9qY8NDl5em_JxNO10pJcJrR03tU-B0YIw/viewform">Feedback</a>
              </div>
            </div>
          </div>
        </nav>
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-sm">
              <div className="text-center text-xl mb-1 rounded">
                Background
              </div>
              <div className="text-justify px-1 mb-1">
                {background}
              </div>
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
              <div className="text-justify px-1 mb-1">
>>>>>>> 781e78dd60d2194ba9915f175ae0705e536271d9
              <DescriptionComponent
                ballCurve={ballCurve}
                clubPathDirection={clubPathDirection}
              />
<<<<<<< HEAD
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
            <div className="min-h-[500px]">
              <div id="display-container">
                <div id="status-display">
                  <canvas
                    id="golf-course"
                    className="min-h-[500px] bg-white"
                  ></canvas>
                  <ul className="hidden">
                    <li id="status-time"></li>
                    <li id="status-distance"></li>
                    <li id="status-speed"></li>
                    <li id="status-height"></li>
                    <li id="status-spin"></li>
                  </ul>
                </div>
=======
              </div>
            </div>
            <div className="col-xl-8">
              <div className="golf-visual-container">
                <GolfRangeComponent/>
                <GolfBallPathComponent 
                  clubFaceAngle={clubFaceAngleSliderValue} 
                  clubPathAngle={clubPathAngleSliderValue}
                />
>>>>>>> 781e78dd60d2194ba9915f175ae0705e536271d9
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
