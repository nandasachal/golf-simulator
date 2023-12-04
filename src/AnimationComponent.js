import * as THREE from 'three';
import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function AnimationComponent(props) {
  useEffect(() => {

    // Three.js code here
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, props.width / props.height, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer();

    // Set up renderer
    renderer.setSize(props.width, props.height);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Add objects, lights, and animations to the scene
    
    // Create arrow components
    const arrowGeometry = new THREE.ConeGeometry(0.1, 0.5, 32); // Cone for arrowhead
    const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const arrowCone = new THREE.Mesh(arrowGeometry, arrowMaterial);

    // Create a curved line for the arrow's path
    const curve = new THREE.LineCurve3(new THREE.Vector3(-2, 0, 0), new THREE.Vector3(2, 0, 0));
    const points = curve.getPoints(50);
    const arrowLineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const arrowLine = new THREE.Line(arrowLineGeometry, arrowMaterial);

    // Combine arrow components
    const arrow = new THREE.Group();
    arrow.add(arrowCone);
    arrow.add(arrowLine);

    // Add arrow to the scene
    scene.add(arrow);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update animations or object positions here

      // Rotate the arrow
      arrow.rotation.y += 0.01;

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup and remove Three.js scene when component unmounts
      document.getElementById('three-container').removeChild(renderer.domElement);
    };
  }, [props.width, props.height]);

  return (
    <div id="three-container">
    </div>
  );
};

export default AnimationComponent;






// // Create a scene
// const scene = new THREE.Scene();

// // Create a camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// // Create a renderer
// const renderer = new THREE.WebGLRenderer();
// const container = document.getElementById('scene-container'); // Get the container div by its ID
// renderer.setSize(container.clientWidth, container.clientHeight);
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create arrow components
// const arrowGeometry = new THREE.ConeGeometry(0.1, 0.5, 32); // Cone for arrowhead
// const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const arrowCone = new THREE.Mesh(arrowGeometry, arrowMaterial);

// // Create a curved line for the arrow's path
// const curve = new THREE.LineCurve3(new THREE.Vector3(-2, 0, 0), new THREE.Vector3(2, 0, 0));
// const points = curve.getPoints(50);
// const arrowLineGeometry = new THREE.BufferGeometry().setFromPoints(points);
// const arrowLine = new THREE.Line(arrowLineGeometry, arrowMaterial);

// // Combine arrow components
// const arrow = new THREE.Group();
// arrow.add(arrowCone);
// arrow.add(arrowLine);

// // Add arrow to the scene
// scene.add(arrow);

// // Animation function
// const animate = () => {
//   requestAnimationFrame(animate);

//   // Rotate the arrow
//   arrow.rotation.y += 0.01;

//   // Render the scene
//   renderer.render(scene, camera);
// };

// // Start the animation loop
// animate();


