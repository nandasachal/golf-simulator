import React from "react";
import SliderVariable from "../old/SliderVariable";
import { classNames } from "../../utils/functions";

const ParameterSelection = ({ values, handleValueChange }) => {
  return (
    <>
      <div className=" mt-4">
        <p className="font-bold">Dominant Side</p>
        <div className="grid grid-cols-2">
          <div
            className={classNames(
              "px-6 py-1.5 rounded-l-lg cursor-pointer text-center",
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
              "px-6 py-1.5 rounded-r-lg cursor-pointer text-center",
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
        minValue={-45}
        maxValue={45}
        steps={1}
        defaultValue={0}
        units={"°"}
        value={values.clubFaceAngleSliderValue}
        handleValueChange={(value) => {
          handleValueChange("clubFaceAngle", value);
        }}
        tooltipText="The angle of your club head, where negative is a closed club face and a positive is a open club face."
      />
      <SliderVariable
        name={"Club Path Angle"}
        minValue={-45}
        maxValue={45}
        steps={1}
        defaultValue={0}
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
        minValue={50}
        maxValue={140}
        steps={1}
        defaultValue={140}
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
