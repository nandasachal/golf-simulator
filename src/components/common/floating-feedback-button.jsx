import React from "react";
import { Question } from "react-bootstrap-icons";

const FloatingFeedbackButton = () => {
  return (
    <a
      className="fixed bottom-6 right-6 p-2 z-[1000] border border-gray-50 h-[50px] w-[50px] flex items-center justify-center shadow-md rounded-full bg-white"
      href="https://docs.google.com/forms/d/e/1FAIpQLSfR6vP8GLaPvjIRF9qY8NDl5em_JxNO10pJcJrR03tU-B0YIw/viewform"
      target="_blank"
      rel="noreferrer"
    >
      <Question size={30} color="#444" />
    </a>
  );
};

export default FloatingFeedbackButton;
