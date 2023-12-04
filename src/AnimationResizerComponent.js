import React, { useState, useEffect } from 'react';
import AnimationComponent from './AnimationComponent';

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
  };

  window.addEventListener('resize', handleResize);

  console.log("this is resizing");
  console.log("this is the width" + windowDimensions.width);
  console.log("this is the height" + windowDimensions.height);
  return (
    <div>
      {/* Your animation component */}
      <AnimationComponent width={windowDimensions.width} height={windowDimensions.height} />
    </div>
  );
  // Rest of your component code...
};

export default AnimationResizerComponent;