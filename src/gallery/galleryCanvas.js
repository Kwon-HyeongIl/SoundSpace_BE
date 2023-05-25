import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import "./galleryCanvas.css";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  FirstPersonControls,
  Stars,
  PointerLockControls,
  KeyboardControls,
} from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import Player from "./Player.js";
import { Text } from "@react-three/drei";
import { FPV } from "./FPV";
import Box from "./musicBox.js";
import GuestBox from "./guestBox.js";

//바닥
function PlaneBottom() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));
  return (
    // <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[10000, 10000]} />
      <meshLambertMaterial attach="material" color="gray" />
    </mesh>
  );
}

// Wall
function PlaneLeft() {
  const [ref] = usePlane(() => ({
    rotation: [0, Math.PI / 2, 0],
    position: [-4, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshLambertMaterial attach="material" color="yellow" />
    </mesh>
  );
}

function PlaneRight() {
  const [ref] = usePlane(() => ({
    rotation: [0, Math.PI / 2, 0],
    position: [4, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshLambertMaterial attach="material" color="green" />
    </mesh>
  );
}

function PlaneFront() {
  const [ref] = usePlane(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, -5],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshLambertMaterial attach="material" color="purple" />
    </mesh>
  );
}

export default function GalleryCanvas() {
  // const cameraPosition = new THREE.Vector3(0, 50, 0);
  const numBoxes = 10; // Number of boxes
  const boxGap = 2; // Gap between boxes
  const initialBoxPosition = -((numBoxes - 1) * boxGap) / 2;

  return (
    <>
      <Canvas shadows={true} camera={{ fov: 45 }}>
        {/* <OrbitControls /> */}
        <FirstPersonControls
          lookSpeed={0.07}
          minDistance={0} // 최소 거리
          maxDistance={50} // 최대 거리
        />
        <PointerLockControls
        // moveForward={5} moveRight={10}
        />
        <ambientLight intensity={0.5} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Stars />
        <spotLight position={[0, 15, 10]} angle={0.3} castShadow />
        <FPV />
        <Physics gravity={[0, -30, 0]}>
          <Player />
          <PlaneBottom />
          {Array.from({ length: numBoxes }, (_, index) => (
            <Box
              key={index}
              box_position={[
                initialBoxPosition + index * boxGap,
                2 + index * 3, // Adjust the height of each box if needed
                0,
              ]}
              url="https://www.akbobada.com/home/akbobada/archive/akbo/img/202208031533045.jpg"
            />
          ))}
          <GuestBox />
          {/* <PlaneLeft />
          <PlaneRight />
          <PlaneFront /> */}
        </Physics>
      </Canvas>
      <div className="absolute centered cursor">+</div>
    </>
  );
}
