import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const OfficeFurniture = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, controls;
    let cube, rollerCoaster;

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

      // Add objects to the scene
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      scene.add(cube);

      const rollerCoasterGeometry = new THREE.TorusGeometry(3, 1, 16, 100);
      const rollerCoasterMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
      });
      rollerCoaster = new THREE.Mesh(
        rollerCoasterGeometry,
        rollerCoasterMaterial
      );
      scene.add(rollerCoaster);

      // Add wireframe
      const cubeWireframe = new THREE.WireframeGeometry(cubeGeometry);
      const cubeLines = new THREE.LineSegments(cubeWireframe);
      cubeLines.material.color.set(0xffffff);
      cube.add(cubeLines);

      const rollerCoasterWireframe = new THREE.WireframeGeometry(
        rollerCoasterGeometry
      );
      const rollerCoasterLines = new THREE.LineSegments(rollerCoasterWireframe);
      rollerCoasterLines.material.color.set(0xffffff);
      rollerCoaster.add(rollerCoasterLines);

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);

      // Add controls
      controls = new OrbitControls(camera, renderer.domElement);

      // Animate the scene
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        rollerCoaster.rotation.y += 0.01; // Rotate the roller coaster
        controls.update();
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

export default OfficeFurniture;
