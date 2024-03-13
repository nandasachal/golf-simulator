import React from "react";
import { PencilSquare } from "react-bootstrap-icons";

const FloatingFeedbackButton = () => {
  return (
    <a
      className="floating-feedback"
      href="https://docs.google.com/forms/d/e/1FAIpQLSfR6vP8GLaPvjIRF9qY8NDl5em_JxNO10pJcJrR03tU-B0YIw/viewform"
      target="_blank"
      rel="noreferrer"
    >
      <PencilSquare size={20} color="#444" />
    </a>
  );
};

export default FloatingFeedbackButton;
