import React from "react";
import SliderVariable from "../old/SliderVariable";
import Form from "react-bootstrap/Form";

const ParameterSelection = ({
  handleClubFaceAngleSliderChange,
  handleClubPathAngleSliderChange,
}) => {
  return (
    <>
      <div>
        <Form.Check
          inline
          label="Left Handed"
          name="hit-side"
          type={"radio"}
          className="cursor-pointer"
        />
        <Form.Check
          inline
          label="Right Handed"
          name="hit-side"
          type={"radio"}
          className="cursor-pointer"
        />
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
