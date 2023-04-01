import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
//import { OrbitControls } from "@react-three/drei";

export default function Hello() {
  return (
    <Canvas>
      <OrbitControls autoRotate={true} autoRotateSpeed={10} />
      <mesh>
        <ambientLight intensity={1} />
        <directionalLight
          position={[-1, 0, 1]}
          color={0xa52a2a}
          intensity={0.5}
        />
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={0xffdeff} />
      </mesh>
    </Canvas>
  );
}
