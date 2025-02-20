"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

// Utility functions
const createMaterials = (reactBlue) => {
  return {
    logoMaterial: new THREE.MeshPhysicalMaterial({
      color: reactBlue,
      metalness: 0.5,
      roughness: 0.1,
      emissive: reactBlue,
      emissiveIntensity: 0.3,
      clearcoat: 0.8,
      transparent: false,
    }),
    glowMaterial: new THREE.MeshBasicMaterial({
      color: reactBlue,
      transparent: true,
      opacity: 0.3,
    }),
  };
};

const createEllipticalRing = (radiusX, radiusY, rotation, material) => {
  const curve = new THREE.EllipseCurve(
    0,
    0, // center
    radiusX,
    radiusY, // x radius, y radius
    0,
    2 * Math.PI, // start angle, end angle
    false, // clockwise
    0 // rotation
  );

  const points = curve.getPoints(100);
  const tubeGeometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(p.x, p.y, 0))
    ),
    100, // tubular segments
    0.1, // radius
    12, // radial segments
    false // closed
  );

  const ring = new THREE.Mesh(tubeGeometry, material);
  ring.rotation.x = rotation.x || 0;
  ring.rotation.y = rotation.y || 0;
  ring.rotation.z = rotation.z || 0;

  return ring;
};

const createElectron = (position, material, glowMaterial) => {
  const electronGeometry = new THREE.SphereGeometry(0.25, 16, 16);
  const electron = new THREE.Mesh(electronGeometry, material.clone());
  electron.material.emissiveIntensity = 0.7;

  if (position) {
    electron.position.copy(position);
  }

  const electronGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 12, 12),
    glowMaterial.clone()
  );
  electron.add(electronGlow);

  return electron;
};

const ReactJS = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const logoGroupRef = useRef(null);
  const materialsRef = useRef(null);
  const electronsRef = useRef([]);
  const animationRef = useRef(null);
  const targetRotationRef = useRef(new THREE.Vector2());
  const clockRef = useRef(new THREE.Clock());
  const timeRef = useRef(0);
  const interactionStateRef = useRef({
    isDragging: false,
    isHovering: false,
    prevTouchPos: { x: 0, y: 0 },
    prevMousePos: { x: 0, y: 0 },
  });

  const [isInteracting, setIsInteracting] = useState(false);
  const isInitializedRef = useRef(false);

  const initializeScene = useCallback(() => {
    if (!mountRef.current || isInitializedRef.current) return null;

    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const containerWidth = mountRef.current.clientWidth;
    const containerHeight = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );

    camera.position.z = 6;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    return { scene, camera, renderer };
  }, []);

  const createLogo = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return null;

    const reactBlue = 0x61dafb;
    const { logoMaterial, glowMaterial } = createMaterials(reactBlue);
    materialsRef.current = { logoMaterial, glowMaterial };

    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    logoGroupRef.current = logoGroup;

    const nucleusGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const nucleus = new THREE.Mesh(nucleusGeometry, logoMaterial);
    logoGroup.add(nucleus);

    const glowGeometry = new THREE.SphereGeometry(0.8, 24, 24);
    const nucleusGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    logoGroup.add(nucleusGlow);

    const ring1 = createEllipticalRing(
      2.5,
      1,
      { x: 0, y: 0, z: 4 },
      logoMaterial
    );
    const ring2 = createEllipticalRing(
      2.5,
      1,
      { x: 0, y: 0, z: -1 },
      logoMaterial
    );
    const ring3 = createEllipticalRing(
      2.5,
      1,
      { x: Math.PI / 60, y: Math.PI / 45, z: 0 },
      logoMaterial
    );

    logoGroup.add(ring1, ring2, ring3);

    const positions = [
      new THREE.Vector3(3, 0, 0),
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(2.6, 1.5, 0),
      new THREE.Vector3(-2.6, -1.5, 0),
      new THREE.Vector3(0, 1, 2.8),
      new THREE.Vector3(0, -1, -2.8),
    ];

    const electrons = positions.map((pos, i) => {
      const electron = createElectron(pos, logoMaterial, glowMaterial);
      if (i >= 2 && i < 4) {
        electron.rotation.z = Math.PI / 3;
      } else if (i >= 4) {
        electron.rotation.x = Math.PI / 2;
        electron.rotation.y = Math.PI / 6;
      }
      logoGroup.add(electron);
      return {
        mesh: electron,
        initialPos: pos.clone(),
        speed: 0.01 + (i % 3) * 0.005,
        angle: i * (Math.PI / 3),
        ringIndex: Math.floor(i / 2),
      };
    });
    electronsRef.current = electrons;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(reactBlue, 0.7);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    const centerLight = new THREE.PointLight(reactBlue, 2, 10);
    centerLight.position.set(0, 0, 0);
    logoGroup.add(centerLight);

    return { nucleus, nucleusGlow, centerLight, logoGroup };
  }, []);

  const setupInteraction = useCallback(() => {
    const renderer = rendererRef.current;
    if (!renderer) return () => {};

    const handleMove = (deltaX, deltaY) => {
      // Adjust rotation sensitivity
      const rotationSpeed = 0.005;
      targetRotationRef.current.y += deltaX * rotationSpeed;
      targetRotationRef.current.x += deltaY * rotationSpeed;

      // Clamp rotation on X axis to prevent flipping
      targetRotationRef.current.x = THREE.MathUtils.clamp(
        targetRotationRef.current.x,
        -Math.PI / 3,
        Math.PI / 3
      );
    };

    const handleTouchMove = (e) => {
      e.preventDefault(); // Prevent scrolling while touching
      if (!interactionStateRef.current.isDragging) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - interactionStateRef.current.prevTouchPos.x;
      const deltaY = touch.clientY - interactionStateRef.current.prevTouchPos.y;

      handleMove(deltaX, deltaY);

      interactionStateRef.current.prevTouchPos = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      if (!interactionStateRef.current.isDragging) return;

      const deltaX = e.clientX - interactionStateRef.current.prevMousePos.x;
      const deltaY = e.clientY - interactionStateRef.current.prevMousePos.y;

      handleMove(deltaX, deltaY);

      interactionStateRef.current.prevMousePos = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
      setIsInteracting(true);
      interactionStateRef.current.isDragging = true;
      interactionStateRef.current.prevMousePos = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      setIsInteracting(true);
      interactionStateRef.current.isDragging = true;
      const touch = e.touches[0];
      interactionStateRef.current.prevTouchPos = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const handleEnd = () => {
      setIsInteracting(false);
      interactionStateRef.current.isDragging = false;
    };

    // Add passive: false to prevent default touch behaviors
    renderer.domElement.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    renderer.domElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    renderer.domElement.addEventListener("touchend", handleEnd);
    renderer.domElement.addEventListener("touchcancel", handleEnd);
    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseup", handleEnd);
    renderer.domElement.addEventListener("mouseleave", handleEnd);

    return () => {
      renderer.domElement.removeEventListener("touchstart", handleTouchStart);
      renderer.domElement.removeEventListener("touchmove", handleTouchMove);
      renderer.domElement.removeEventListener("touchend", handleEnd);
      renderer.domElement.removeEventListener("touchcancel", handleEnd);
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseup", handleEnd);
      renderer.domElement.removeEventListener("mouseleave", handleEnd);
    };
  }, []);

  const animate = useCallback(() => {
    const logoGroup = logoGroupRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    const electrons = electronsRef.current;
    const materials = materialsRef.current;

    if (
      !logoGroup ||
      !renderer ||
      !camera ||
      !scene ||
      !electrons ||
      !materials
    ) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const delta = clockRef.current.getDelta();
    timeRef.current += delta;

    // Smooth rotation with easing
    const rotationEasing = 0.08;
    logoGroup.rotation.y +=
      (targetRotationRef.current.y - logoGroup.rotation.y) * rotationEasing;
    logoGroup.rotation.x +=
      (targetRotationRef.current.x - logoGroup.rotation.x) * rotationEasing;

    // Add slight auto-rotation when not interacting
    if (!interactionStateRef.current.isDragging) {
      targetRotationRef.current.y += delta * 0.1;
    }

    // Update electron positions
    electrons.forEach((electronData) => {
      electronData.angle += electronData.speed * delta * 60;
      const newX =
        electronData.initialPos.x * Math.cos(electronData.angle) -
        electronData.initialPos.y * Math.sin(electronData.angle);
      const newY =
        electronData.initialPos.x * Math.sin(electronData.angle) +
        electronData.initialPos.y * Math.cos(electronData.angle);

      electronData.mesh.position.x = newX;
      electronData.mesh.position.y = newY;
    });

    renderer.render(scene, camera);
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const handleResize = useCallback(() => {
    const container = mountRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;

    if (!container || !renderer || !camera) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Adjust camera based on container size
    camera.aspect = containerWidth / containerHeight;
    camera.position.z = containerWidth < 400 ? 14 : 12;
    camera.updateProjectionMatrix();

    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) return;

    const sceneSetup = initializeScene();
    if (!sceneSetup) return;

    isInitializedRef.current = true;
    createLogo();
    const cleanupEvents = setupInteraction();

    clockRef.current.start();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);

    return () => {
      isInitializedRef.current = false;
      cleanupEvents();
      window.removeEventListener("resize", handleResize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      // Clean up Three.js objects
      if (sceneRef.current) {
        // Dispose of all meshes and materials in the scene
        sceneRef.current.traverse((object) => {
          if (object.isMesh) {
            if (object.geometry) {
              object.geometry.dispose();
            }
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else if (object.material) {
              object.material.dispose();
            }
          }
        });
      }

      // Dispose of materials stored in materialsRef
      if (materialsRef.current) {
        if (materialsRef.current.logoMaterial) {
          materialsRef.current.logoMaterial.dispose();
        }
        if (materialsRef.current.glowMaterial) {
          materialsRef.current.glowMaterial.dispose();
        }
      }

      // Dispose of the renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mountRef.current && rendererRef.current.domElement) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [initializeScene, createLogo, setupInteraction, animate, handleResize]);

  return (
    <div className="flex flex-col items-center justify-center w-full select-none">
      <div
        ref={mountRef}
        className={`w-full h-full flex justify-center items-center overflow-hidden 
                  ${isInteracting ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          aspectRatio: "1 / 1",
          touchAction: "none",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
};

export default ReactJS;
