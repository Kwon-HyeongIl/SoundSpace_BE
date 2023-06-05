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
import { Text } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

function GuestBox({ position }) {
  const [ref, api] = useBox(() => ({ mass: 0, position: [0, 0, 9] }));

  const [isHovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };
  const navigate = useNavigate();

  return (
    <group>
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        ref={ref}
        position={[0, 2, 0]}
        castShadow
        onClick={() => navigate("/guest")}
      >
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="hotpink" />
      </mesh>
      <Text
        position={[0, 1, 9]} // Position the text slightly in front of the box
        rotation={[0, -Math.PI, 0]} // Adjust the rotation of the text if needed
        fontSize={0.2} // Adjust the font size of the text
        color="white" // Set the color of the text
      >
        Write comment!
      </Text>
      {/* {isHovered && <Button />} */}
    </group>
  );
}

//+버튼
// const Button = () => {
//   const texture = useLoader(
//     THREE.TextureLoader,
//     "https://cdn-icons-png.flaticon.com/512/149/149125.png"
//   );
//   const buttonRef = useRef();
//   const [isHovered, setHovered] = useState(false);

//   const handlePointerOver = () => {
//     setHovered(true);
//   };

//   const handlePointerOut = () => {
//     setHovered(false);
//   };
//   const navigate = useNavigate();

//   useFrame(() => {
//     buttonRef.current.rotation.y += 0.01;
//   });

//   return (
//     <mesh
//       ref={buttonRef}
//       onPointerOver={handlePointerOver}
//       onPointerOut={handlePointerOut}
//       position={[-5, 0.5, 1]}
//       castShadow
//       onClick={() => navigate("/guest")} //임시로 /LikePage 넘어가도록
//     >
//       <boxBufferGeometry args={[0.2, 0.2, 0.2]} />
//       <meshStandardMaterial map={texture} color={isHovered ? "red" : "blue"} />
//     </mesh>
//   );
// };

export default GuestBox;
