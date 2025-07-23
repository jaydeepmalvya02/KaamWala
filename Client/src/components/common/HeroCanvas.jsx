import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useProgress } from "@react-three/drei";

// Animated stars component with gentle rotation
const AnimatedStars = () => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });
  return (
    <Stars
      ref={ref}
      radius={90}
      depth={60}
      count={9000}
      factor={4.5}
      saturation={0.23}
      fade
    />
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-sm bg-black bg-opacity-60 px-4 py-2 rounded">
        Loading... {progress.toFixed(0)}%
      </div>
    </Html>
  );
};

const HeroCanvas = () => (
  <div className="absolute inset-0 z-0">
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 7]} intensity={1.2} />
      <Suspense fallback={<Loader />}>
        <AnimatedStars />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  </div>
);

export default HeroCanvas;
