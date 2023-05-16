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

function Box({ position }) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 0, 0] }));

  useFrame(() => {
    if (api && api.velocity) {
      const { forward, backward, left, right } = api.velocity;
      const speed = 0.2;
      if (forward && forward[2] > 0)
        api.velocity.set(forward[0], forward[1], 0);
      if (backward && backward[2] < 0)
        api.velocity.set(backward[0], backward[1], 0);
      if (left && left[0] < 0) api.velocity.set(0, left[1], left[2]);
      if (right && right[0] > 0) api.velocity.set(0, right[1], right[2]);
    }
  });

  return (
    <group>
      <mesh ref={ref} position={[0, 2, 0]} castShadow>
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="hotpink" />
      </mesh>
      <Text
        position={[0, 1.2, 0.6]} // Position the text slightly in front of the box
        rotation={[0, 0, 0]} // Adjust the rotation of the text if needed
        fontSize={0.4} // Adjust the font size of the text
        color="white" // Set the color of the text
      >
        go forward!
      </Text>
      <Button />
    </group>
  );
}

const Button = () => {
  const texture = useLoader(
    THREE.TextureLoader,
    "https://cdn-icons-png.flaticon.com/512/149/149125.png"
  );
  const buttonRef = useRef();
  const [isHovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  // useFrame(() => {
  //   buttonRef.current.rotation.y += 0.01;
  // });

  return (
    <mesh
      ref={buttonRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={[-1, 0, 0]}
      castShadow
    >
      <boxBufferGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial map={texture} color={isHovered ? "red" : "blue"} />
    </mesh>
  );
};

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

//이건 유튭브 예제 + 키보드 컨트롤
// export default function GalleryCanvas() {
//   return (
//     <KeyboardControls
//       map={[
//         { name: "forward", keys: ["ArrowUp", "w", "W"] },
//         { name: "backward", keys: ["ArrowDown", "s", "S"] },
//         { name: "left", keys: ["ArrowLeft", "a", "A"] },
//         { name: "right", keys: ["ArrowRight", "d", "D"] },
//         { name: "jump", keys: ["Space"] },
//       ]}
//     >
//       <Canvas>
//         {/* <OrbitControls /> */}
//         <FirstPersonControls
//           minDistance={0} // 최소 거리
//           maxDistance={50} // 최대 거리
//         />
//         <ambientLight intensity={0.5} />
//         <Stars />
//         <spotLight position={[0, 15, 10]} angle={0.3} />
//         <Physics gravity={[0, -30, 0]}>
//           <Box />
//           <PlaneBottom />
//         </Physics>
//         <PlaneRight />
//       </Canvas>
//     </KeyboardControls>
//   );
// }

export default function GalleryCanvas() {
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
          <Box />
          {/* <Box position={[-40, 0, -40]} /> */}
          <PlaneLeft />
          <PlaneRight />
          <PlaneFront />
        </Physics>
      </Canvas>
      <div className="absolute centered cursor">+</div>
    </>
  );
}
