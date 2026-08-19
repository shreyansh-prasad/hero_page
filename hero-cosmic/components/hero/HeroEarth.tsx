'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function EarthSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, '/cosmic/detailed-earth-map.png');
  const cloudyTexture = React.useMemo(() => {
    const tex = texture.clone();
    tex.repeat.set(1, 0.5);
    tex.offset.set(0, 0.5);
    tex.needsUpdate = true;
    return tex;
  }, [texture]);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // Rotating right to left on Y axis (slower)
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={cloudyTexture} roughness={0.65} metalness={0.05} />
    </mesh>
  );
}

export default function HeroEarth() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 38.5, near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%', display: 'block' }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color(0x000000), 0);
      }}
    >
      {/* Deep space ambient - almost zero to create pitch black shadows */}
      <ambientLight intensity={0.02} />
      
      {/* Primary Key Light (The Sun) - Harsh, bright, slightly warm, angled from top right */}
      <directionalLight position={[8, 4, 3]} intensity={3.5} color="#fffcf2" />
      
      {/* Atmospheric Rim Light - Bright cyan/blue light wrapping around the dark edge from behind */}
      <directionalLight position={[-6, 1, -5]} intensity={2.8} color="#60a5fa" />

      {/* Earth Reflection / Starlight Fill - Extremely faint deep blue fill on the dark side */}
      <directionalLight position={[-4, -2, 4]} intensity={0.15} color="#1e3a8a" />
      <React.Suspense fallback={null}>
        <EarthSphere />
      </React.Suspense>
    </Canvas>
  );
}
