import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ConveyorBelt = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer;
    let conveyorBelt, cube;

    const init = () => {
      // Create a scene
      scene = new THREE.Scene();

      // Create a camera
      camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Create a renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      containerRef.current.appendChild(renderer.domElement);

      // Create conveyor belt
      const beltWidth = 2;
      const beltHeight = 0.1;
      const beltDepth = 4;
      const beltGeometry = new THREE.BoxGeometry(
        beltWidth,
        beltHeight,
        beltDepth
      );
      const beltMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      conveyorBelt = new THREE.Mesh(beltGeometry, beltMaterial);
      scene.add(conveyorBelt);

      // Create cube
      const cubeSize = 0.5;
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      scene.add(cube);

      // Create outlines
      const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

      const conveyorBeltOutline = new THREE.LineSegments(
        new THREE.EdgesGeometry(beltGeometry),
        outlineMaterial
      );
      conveyorBelt.add(conveyorBeltOutline);

      const cubeOutline = new THREE.LineSegments(
        new THREE.EdgesGeometry(cubeGeometry),
        outlineMaterial
      );
      cube.add(cubeOutline);

      // Animate the scene
      const animate = () => {
        requestAnimationFrame(animate);
        conveyorBelt.rotation.z += 0.01;
        cube.position.x = Math.cos(conveyorBelt.rotation.z) * 1.5; // Orbit the cube around the conveyor belt
        cube.position.z = Math.sin(conveyorBelt.rotation.z) * 1.5;
        cube.rotation.y += 0.01; // Rotate the cube
        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    // Clean up
    return () => {
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "300px" }}>
      {/* Container for the 3D scene */}
    </div>
  );
};

export default ConveyorBelt;
