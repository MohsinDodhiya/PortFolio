import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

const ReactJS = ({
  modelConfig = {
    color: 0x61dafb,
    autoRotate: true,
    initialScale: 1.0,
  },
  containerClassName = "w-full h-full",
  aspectRatio = "1 / 1",
  mobileZOffset = 8,
  desktopZOffset = 6,
  mobileBreakpoint = 768,
}) => {
  // Refs for DOM elements and Three.js objects
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const modelGroupRef = useRef(null);
  const materialsRef = useRef(null);
  const electronsRef = useRef([]);
  const animationRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  // State for interaction and sizing
  const [isInteracting, setIsInteracting] = useState(false);
  const [modelScale, setModelScale] = useState(modelConfig.initialScale);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Refs for tracking interaction state
  const targetRotationRef = useRef(new THREE.Vector2());
  const interactionStateRef = useRef({
    isDragging: false,
    prevTouchPos: { x: 0, y: 0 },
    prevMousePos: { x: 0, y: 0 },
  });
  const isInitializedRef = useRef(false);

  // Initialize the Three.js scene
  const initializeScene = useCallback(() => {
    if (!mountRef.current || isInitializedRef.current) return null;

    // Create scene with transparent background
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Get container dimensions
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    setDimensions({ width: containerWidth, height: containerHeight });

    // Set up camera with proper aspect ratio
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );

    // Set camera position based on screen size
    const isMobile = window.innerWidth < mobileBreakpoint;
    camera.position.z = isMobile ? mobileZOffset : desktopZOffset;
    cameraRef.current = camera;

    // Create renderer with high quality settings
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
  }, [mobileBreakpoint, mobileZOffset, desktopZOffset]);

  // Create electron particle
  const createElectron = useCallback((position, material, glowMaterial) => {
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
  }, []);

  // Create model - using React logo as an example model
  const createModel = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return null;

    // Materials setup
    const mainColor = modelConfig.color;
    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: mainColor,
      metalness: 0.5,
      roughness: 0.1,
      emissive: mainColor,
      emissiveIntensity: 0.3,
      clearcoat: 0.8,
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: mainColor,
      transparent: true,
      opacity: 0.3,
    });

    materialsRef.current = { mainMaterial, glowMaterial };

    // Create model group
    const modelGroup = new THREE.Group();
    modelGroup.scale.set(modelScale, modelScale, modelScale);
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Create nucleus (center sphere)
    const nucleusGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const nucleus = new THREE.Mesh(nucleusGeometry, mainMaterial);
    modelGroup.add(nucleus);

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(0.8, 24, 24);
    const nucleusGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    modelGroup.add(nucleusGlow);

    // Create orbital rings
    const createRing = (radiusX, radiusY, rotation) => {
      const curve = new THREE.EllipseCurve(
        0,
        0, // center
        radiusX,
        radiusY, // x radius, y radius
        0,
        2 * Math.PI, // start angle, end angle
        false // clockwise
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

      const ring = new THREE.Mesh(tubeGeometry, mainMaterial);
      ring.rotation.x = rotation.x || 0;
      ring.rotation.y = rotation.y || 0;
      ring.rotation.z = rotation.z || 0;

      return ring;
    };

    // Add three rings at different orientations
    const ring1 = createRing(2.5, 1, { x: 0, y: 0, z: 4 });
    const ring2 = createRing(2.5, 1, { x: 0, y: 0, z: -1 });
    const ring3 = createRing(2.5, 1, {
      x: Math.PI / 60,
      y: Math.PI / 45,
      z: 0,
    });
    modelGroup.add(ring1, ring2, ring3);

    // Add electrons (orbiting particles)
    const positions = [
      new THREE.Vector3(3, 0, 0),
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(2.6, 1.5, 0),
      new THREE.Vector3(-2.6, -1.5, 0),
      new THREE.Vector3(0, 1, 2.8),
      new THREE.Vector3(0, -1, -2.8),
    ];

    const electrons = positions.map((pos, i) => {
      const electron = createElectron(pos, mainMaterial, glowMaterial);
      if (i >= 2 && i < 4) {
        electron.rotation.z = Math.PI / 3;
      } else if (i >= 4) {
        electron.rotation.x = Math.PI / 2;
        electron.rotation.y = Math.PI / 6;
      }
      modelGroup.add(electron);
      return {
        mesh: electron,
        initialPos: pos.clone(),
        speed: 0.01 + (i % 3) * 0.005,
        angle: i * (Math.PI / 3),
        ringIndex: Math.floor(i / 2),
      };
    });
    electronsRef.current = electrons;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(mainColor, 0.7);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    const centerLight = new THREE.PointLight(mainColor, 2, 10);
    centerLight.position.set(0, 0, 0);
    modelGroup.add(centerLight);

    return { modelGroup, mainMaterial, glowMaterial, electrons };
  }, [modelConfig.color, modelScale, createElectron]);

  // Set up user interaction handlers
  const setupInteraction = useCallback(() => {
    const renderer = rendererRef.current;
    if (!renderer) return () => {};

    // Handle mouse/touch movement
    const handleMove = (deltaX, deltaY) => {
      const rotationSpeed = 0.008;
      targetRotationRef.current.y += deltaX * rotationSpeed;
      targetRotationRef.current.x += deltaY * rotationSpeed;

      // Prevent model from flipping by clamping rotation
      targetRotationRef.current.x = THREE.MathUtils.clamp(
        targetRotationRef.current.x,
        -Math.PI / 3,
        Math.PI / 3
      );
    };

    // Touch handlers
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

    // Mouse handlers
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

    // End interaction handler for both mouse and touch
    const handleEnd = () => {
      setIsInteracting(false);
      interactionStateRef.current.isDragging = false;
    };

    // Add event listeners with passive: false to prevent default behaviors
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

    // Return cleanup function
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

  // Animation loop
  const animate = useCallback(() => {
    const modelGroup = modelGroupRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    const electrons = electronsRef.current;

    if (!modelGroup || !renderer || !camera || !scene || !electrons) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const delta = clockRef.current.getDelta();

    // Apply smooth rotation with easing
    const rotationEasing = 0.08;
    modelGroup.rotation.y +=
      (targetRotationRef.current.y - modelGroup.rotation.y) * rotationEasing;
    modelGroup.rotation.x +=
      (targetRotationRef.current.x - modelGroup.rotation.x) * rotationEasing;

    // Auto-rotation when not being interacted with
    if (!interactionStateRef.current.isDragging && modelConfig.autoRotate) {
      targetRotationRef.current.y += delta * 0.1;
    }

    // Apply current scale
    modelGroup.scale.set(modelScale, modelScale, modelScale);

    // Update electron positions (orbiting particles)
    electrons.forEach((electronData) => {
      electronData.angle += electronData.speed * delta * 70;
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
  }, [modelConfig.autoRotate, modelScale]);

  // Handle window resize
  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;

    if (!container || !renderer || !camera) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    setDimensions({ width: containerWidth, height: containerHeight });

    // Update camera aspect ratio and position based on screen size
    camera.aspect = containerWidth / containerHeight;
    const isMobile = window.innerWidth < mobileBreakpoint;
    camera.position.z = isMobile ? mobileZOffset : desktopZOffset;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, [mobileBreakpoint, mobileZOffset, desktopZOffset]);

  // Scale controls
  const increaseScale = () => {
    setModelScale((prev) => Math.min(prev + 0.1, 2.0));
  };

  const decreaseScale = () => {
    setModelScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const resetScale = () => {
    setModelScale(modelConfig.initialScale);
  };

  // Setup and cleanup effect
  useEffect(() => {
    if (isInitializedRef.current) return;

    const sceneSetup = initializeScene();
    if (!sceneSetup) return;

    isInitializedRef.current = true;
    createModel();
    const cleanupEvents = setupInteraction();

    clockRef.current.start();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);

    // Cleanup function
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

      // Dispose of materials
      if (materialsRef.current) {
        Object.values(materialsRef.current).forEach((material) => {
          if (material) material.dispose();
        });
      }

      // Dispose of renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mountRef.current && rendererRef.current.domElement) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [
    initializeScene,
    createModel,
    setupInteraction,
    animate,
    handleResize,
    modelConfig.initialScale,
  ]);

  return (
    <div ref={containerRef} className={containerClassName}>
      {/* 3D Model Container */}
      <div
        className="relative w-full h-full"
        style={{
          aspectRatio: aspectRatio,
        }}
      >
        {/* Three.js mount point */}
        <motion.div
          ref={mountRef}
          className={`absolute inset-0 flex justify-center items-center overflow-hidden
                     ${isInteracting ? "cursor-grabbing" : "cursor-grab"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            touchAction: "none",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
          }}
        />

        {/* Controls Overlay */}
        {/* <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button
            onClick={increaseScale}
            className="bg-gray-800 bg-opacity-60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all"
            aria-label="Increase size"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          <button
            onClick={decreaseScale}
            className="bg-gray-800 bg-opacity-60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all"
            aria-label="Decrease size"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 12H6"
              />
            </svg>
          </button>
          <button
            onClick={resetScale}
            className="bg-gray-800 bg-opacity-60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all"
            aria-label="Reset size"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div> */}

        {/* Info text overlay - optional */}
        {/* <div className="absolute bottom-4 left-4 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
          {dimensions.width.toFixed(0)} x {dimensions.height.toFixed(0)} |
          Scale: {modelScale.toFixed(1)}
        </div> */}
      </div>
    </div>
  );
};

export default ReactJS;
