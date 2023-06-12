import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Machinery = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer;
    let cube, escalator;

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

      // Create a cube
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeMaterial = new THREE.MeshNormalMaterial(); // Use MeshNormalMaterial
      cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      scene.add(cube);

      // Create an escalator
      const escalatorWidth = 1.5;
      const escalatorHeight = 0.1;
      const escalatorDepth = 2;
      const escalatorGeometry = new THREE.BoxGeometry(
        escalatorWidth,
        escalatorHeight,
        escalatorDepth
      );
      const escalatorMaterial = new THREE.MeshNormalMaterial(); // Use MeshNormalMaterial
      escalator = new THREE.Mesh(escalatorGeometry, escalatorMaterial);
      escalator.position.y = -1;
      scene.add(escalator);

      // Animate the scene
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        escalator.rotation.y += 0.02; // Rotate the escalator
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

export default Machinery;
