'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function EarthSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, '/cosmic/detailed-earth-map.png');

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.07;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} roughness={0.65} metalness={0.05} />
    </mesh>
  );
}

export default function HeroEarth() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 36, near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color(0x000000), 0);
      }}
    >
      <ambientLight intensity={0.12} />
      <directionalLight position={[-5, 4, 4]} intensity={1.8} color="#d8eeff" />
      <directionalLight position={[5, -1, -4]} intensity={0.35} color="#4477bb" />
      <React.Suspense fallback={null}>
        <EarthSphere />
      </React.Suspense>
    </Canvas>
  );
}
