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
        minValue={-6}
        maxValue={6}
        steps={1}
        defaultValue={0}
        units={"°"}
        onClubFaceChange={(value) => {
          handleValueChange("clubFaceAngle", value);
        }}
      />
      <SliderVariable
        name={"Club Path Angle"}
        minValue={-6}
        maxValue={6}
        steps={1}
        defaultValue={0}
        units={"°"}
        onClubPathChange={(value) => {
          handleValueChange("clubPathAngle", value);
        }}
      />
      <SliderVariable
        name={"Swing Speed"}
        minValue={100}
        maxValue={180}
        steps={1}
        defaultValue={140}
        units={"miles per hour"}
      />
    </>
  );
};

export default ParameterSelection;
