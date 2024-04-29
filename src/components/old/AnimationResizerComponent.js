import React, { useState } from "react";
import AnimationComponent from "./AnimationComponent";

function AnimationResizerComponent() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function handleResize() {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  window.addEventListener("resize", handleResize);

  return (
    <div>
      {/* Your animation component */}
      <AnimationComponent
        width={windowDimensions.width}
        height={windowDimensions.height}
      />
    </div>
  );
  // Rest of your component code...
}

export default AnimationResizerComponent;
