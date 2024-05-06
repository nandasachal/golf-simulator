import * as dat from "dat.gui";
import DrawLib from "./draw-lib";
import { Shot } from "./shot";
import { toMPH, toRPM, toYards } from "./conversions-lib";

export const StartBall = (THREE, options) => {
  // Note: coordinate unit of 1 = 1 meter

  // three framework components
  var renderer;
  var scene;
  var camera;
  var controls;
  var stats;
  var gui;
  var container;
  var containerWidth;
  var containerHeight;

  // project-specific logic
  var points;
  var shot;
  var line;
  var particles;
  var shotControl = {
    dt: 0.001, //seconds
    displaySpeed: 2.0, // display time multiplier
    initSpeedMPH: options?.initSpeedMPH ?? 100,
    initVerticalAngleDegrees: 20,
    initHorizontalAngleDegrees: options?.initHorizontalAngleDegrees ?? 9,
    initBackspinRPM: 6000,
    initSpinAngle: options?.initSpinAngle ?? 45,
    shoot: beginShot,
  };
  var sceneZOffset;
  var displayStartTime;
  var displaySpeed;
  // var statusElementTime;
  // var statusElementSpeed;
  // var statusElementHeight;
  // var statusElementDistance;
  // var statusElementSpin;
  var distanceDisplay;

  function init() {
    // add renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff);

    // add container
    container = document.getElementById("display-container");
    container.appendChild(renderer.domElement);
    calculateContainerWidthHeight();

    // status elements
    // statusElementTime = document.getElementById("status-time");
    // statusElementSpeed = document.getElementById("status-speed");
    // statusElementHeight = document.getElementById("status-height");
    // statusElementDistance = document.getElementById("status-distance");
    // statusElementSpin = document.getElementById("status-spin");
    distanceDisplay = document.getElementById("distance-display");

    // add stats
    // stats = new Stats();
    // container.appendChild(stats.domElement);

    // add scene
    scene = new THREE.Scene();

    // add camera: field of view, aspect ratio, start distance, max distance
    camera = new THREE.PerspectiveCamera(
      45,
      containerWidth / containerHeight,
      0.1,
      20000
    );
    camera.lookAt(scene.position);

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // add dat.gui
    // gui = new dat.GUI({ autoPlace: false });
    // container.appendChild(gui.domElement);
    // gui.add(shotControl, "initSpeedMPH", 50, 150);
    // gui.add(shotControl, "initVerticalAngleDegrees", 0, 90);
    // gui.add(shotControl, "initHorizontalAngleDegrees", -45, 45);
    // gui.add(shotControl, "initBackspinRPM", 0, 6000);
    // gui.add(shotControl, "initSpinAngle", -45, 45);
    // gui.add(shotControl, "displaySpeed", 0, 5);
    // gui.add(shotControl, "shoot");

    // window sizing
    onWindowResize(); // set initial size
    window.addEventListener("resize", onWindowResize, false); // add handlers

    addInitialElements();

    beginShot();
  }

  function animate() {
    requestAnimationFrame(animate);

    controls.update();
    // stats.update();
    renderer.render(scene, camera);

    if (shot) {
      updateShot();
    }
  }

  function calculateContainerWidthHeight() {
    var comStyle = window.getComputedStyle(container, null);
    containerWidth = parseInt(comStyle.getPropertyValue("width"), 10);
    containerHeight = parseInt(comStyle.getPropertyValue("height"), 10);
  }

  function onWindowResize() {
    calculateContainerWidthHeight();
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(containerWidth, containerHeight);
  }

  function addInitialElements() {
    var gridWidth = 70;
    var gridHeight = 400;

    sceneZOffset = -gridHeight / 2.0;

    // adjust camera position
    camera.position.x = 0;
    camera.position.y = 70;
    camera.position.z = (-gridHeight / 2.0) * 1.6;

    // add ground grid
    var gridColor = new THREE.Color(0x00bbbb);
    var grid = DrawLib.getGrid(THREE, gridWidth, gridHeight, 10, gridColor);
    grid.position.z = sceneZOffset + gridHeight / 2.0;

    var gridGeometry = new THREE.PlaneGeometry(
      gridWidth,
      gridHeight,
      gridWidth / 10,
      gridHeight / 10
    );
    var cellColor = new THREE.Color(0x4c8435); // Green color for cells
    var gridMaterial = new THREE.MeshBasicMaterial({
      color: cellColor,
      side: THREE.DoubleSide,
    });
    var gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    gridMesh.rotation.x = -Math.PI / 2; // Rotate the grid to align with the scene
    scene.add(gridMesh);

    scene.add(grid);

    // add marker indicators
    var markerColor = 0x00ffff;
    var textMesh = new THREE.MeshNormalMaterial({ color: markerColor });
    var markerYardage = 0;
    while (markerYardage < gridHeight) {
      // text
      markerYardage += 50;
      var textGeometry = new THREE.TextGeometry(markerYardage + "yd", {
        size: 4,
        height: 0.1,
        curveSegments: 1,
        font: "helvetiker",
      });
      textGeometry.computeBoundingBox();
      textGeometry.computeVertexNormals();
      var words = new THREE.Mesh(textGeometry, textMesh);
      words.position.x = gridWidth / 2.0 + 5;
      words.position.z =
        markerYardage +
        sceneZOffset -
        0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
      words.rotation.y = (-1 * Math.PI) / 2;
      scene.add(words);

      // line across grid
      var pointA = new THREE.Vector3(
        -gridWidth / 2.0,
        0,
        markerYardage + sceneZOffset
      );
      var pointB = new THREE.Vector3(
        gridWidth / 2.0,
        0,
        markerYardage + sceneZOffset
      );
      var lineGeometry = new THREE.Geometry();
      lineGeometry.vertices = [pointA, pointB];
      var lineMaterial = new THREE.LineBasicMaterial({
        color: markerColor,
        linewidth: 2,
      });
      var markerLine = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(markerLine);
    }
  }

  function beginShot() {
    points = [];
    shot = new Shot(shotControl, THREE);
    points.push(shot.points[0]);
    displaySpeed = shotControl.displaySpeed;
    displayStartTime = Date.now();
  }

  var particlePoints = [];

  function updateShot() {
    var now = Date.now();
    var rawTimeElapsed = now - displayStartTime;
    var displayTimeElapsed = Math.floor(displaySpeed * rawTimeElapsed);
    var initPoint = new THREE.Vector3(0, 0, sceneZOffset);
    var lineColor = new THREE.Color(0x0000ff);
    var splineInterpolationNum = 2;

    if (displayTimeElapsed <= shot.points.length) {
      var point = shot.points[displayTimeElapsed];
      if (point == null) {
        return;
      }
      var convertedPosition = point.position.clone().multiplyScalar(toYards(1)); // convert meters to yards
      points.push(convertedPosition);

      // draw interpolated line
      var newline = DrawLib.getSplinedLine(
        THREE,
        points,
        splineInterpolationNum,
        lineColor
      );
      scene.remove(line);
      line = newline;
      line.position = initPoint;
      scene.add(line);

      // statusElementTime.innerHTML =
      //   (displayTimeElapsed / 1000).toFixed(1) + " s";
      // statusElementSpeed.innerHTML =
      //   toMPH(point.velocity.length()).toFixed(1) + " mph";
      // statusElementHeight.innerHTML = convertedPosition.y.toFixed(0) + " yds";
      // statusElementDistance.innerHTML = convertedPosition.z.toFixed(0) + " yds";
      // statusElementSpin.innerHTML =
      //   toRPM(point.angularVelocity.length()).toFixed(0) + " rpm";
      distanceDisplay.innerHTML = convertedPosition.z.toFixed(0);

      // for adding particles
      // if (points.length % 10 == 0) {
      //     particlePoints.push(position);
      //     var newParticles = DrawLib.getBallParticles(THREE,particlePoints);
      //     scene.remove(particles);
      //     particles = newParticles;
      //     particles.position = initPoint;
      //     scene.add(particles);
      //     lastParticleTime = now;
      // }
    }
  }

  // begin
  init();
  animate();

  return {
    beginShot,
    shotControl,
  };
};
