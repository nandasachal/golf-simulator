import React from "react";
import SliderVariable from "../old/SliderVariable";
import { classNames } from "../../utils/functions";
import {
  CLUB_FACE_ANGLE_VALUES,
  CLUB_PATH_ANGLE_VALUES,
  SWING_SPEED_VALUES,
} from "../../utils/constant";

const ParameterSelection = ({ values, handleValueChange }) => {
  return (
    <>
      <div className=" mt-4">
        <p className="font-bold">Dominant Side</p>
        <div className="grid grid-cols-2">
          <div
            className={classNames(
              "px-2 lg:px-6 py-1.5 text-sm md:text-base rounded-l-lg cursor-pointer text-center",
              values.side === "Left"
                ? "bg-primary-600 text-white font-bold"
                : "bg-gray-200"
            )}
            onClick={() => handleValueChange("side", "Left")}
          >
            Left-Handed
          </div>
          <div
            className={classNames(
              "px-2 lg:px-6 py-1.5 text-sm md:text-base rounded-r-lg cursor-pointer text-center",
              values.side === "Right"
                ? "bg-primary-600 text-white font-bold"
                : "bg-gray-200"
            )}
            onClick={() => handleValueChange("side", "Right")}
          >
            Right-Handed
          </div>
        </div>
      </div>

      <SliderVariable
        name={"Club Face Angle"}
        minValue={CLUB_FACE_ANGLE_VALUES.MIN}
        maxValue={CLUB_FACE_ANGLE_VALUES.MAX}
        steps={CLUB_FACE_ANGLE_VALUES.STEP}
        defaultValue={CLUB_FACE_ANGLE_VALUES.DEFAULT}
        units={"°"}
        value={values.clubFaceAngleSliderValue}
        handleValueChange={(value) => {
          handleValueChange("clubFaceAngle", value);
        }}
        tooltipText="The angle of your club head, where negative is a closed club face and a positive is a open club face."
      />
      <SliderVariable
        name={"Club Path Angle"}
        minValue={CLUB_PATH_ANGLE_VALUES.MIN}
        maxValue={CLUB_PATH_ANGLE_VALUES.MAX}
        steps={CLUB_PATH_ANGLE_VALUES.STEP}
        defaultValue={CLUB_PATH_ANGLE_VALUES.DEFAULT}
        units={"°"}
        value={values.clubPathAngleSliderValue}
        handleValueChange={(value) => {
          handleValueChange("clubPathAngle", value);
        }}
        tooltipText={
          values.side === "Right"
            ? "The direction you are swinging in relation to the straight line, where negative is pointing left and positive is pointing right."
            : "The direction you are swinging in relation to the straight line, where negative is pointing right and positive is pointing left."
        }
      />
      <SliderVariable
        name={"Swing Speed"}
        minValue={SWING_SPEED_VALUES.MIN}
        maxValue={SWING_SPEED_VALUES.MAX}
        steps={SWING_SPEED_VALUES.STEP}
        defaultValue={SWING_SPEED_VALUES.DEFAULT}
        value={values.swingSpeedSliderValue}
        units={"miles per hour"}
        handleValueChange={(value) => {
          handleValueChange("swingSpeed", value);
        }}
        tooltipText="The speed at which the ball is moving upon launch, where higher number mean hitting the ball further."
      />
    </>
  );
};

export default ParameterSelection;
