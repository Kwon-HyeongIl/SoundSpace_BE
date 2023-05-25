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

function Box({ box_position, url }) {
  const texture = useLoader(THREE.TextureLoader, url);
  const [ref, api] = useBox(() => ({ mass: 1, position: box_position }));

  const [isHovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  // 상자 움직임 조작(Frame마다)
  //   useFrame(() => {
  //     if (api && api.velocity) {
  //       const { forward, backward, left, right } = api.velocity;
  //       const speed = 0.2;
  //       if (forward && forward[2] > 0)
  //         api.velocity.set(forward[0], forward[1], 0);
  //       if (backward && backward[2] < 0)
  //         api.velocity.set(backward[0], backward[1], 0);
  //       if (left && left[0] < 0) api.velocity.set(0, left[1], left[2]);
  //       if (right && right[0] > 0) api.velocity.set(0, right[1], right[2]);
  //     }
  //   });

  return (
    <group>
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        ref={ref}
        position={box_position}
        castShadow
      >
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial map={texture} attach="material" color="white" />
      </mesh>
      <Text
        position={[0, 1.2, 0.6]} // Position the text slightly in front of the box
        rotation={[0, 0, 0]} // Adjust the rotation of the text if needed
        fontSize={0.4} // Adjust the font size of the text
        color="white" // Set the color of the text
      >
        go forward!
      </Text>
      {isHovered && <Button boxPosition={box_position} />}
    </group>
  );
}

//+버튼
const Button = ({ boxPosition }) => {
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
  const navigate = useNavigate();

  // useFrame(() => {
  //   buttonRef.current.rotation.y += 0.01;
  // });

  return (
    <mesh
      ref={buttonRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={[boxPosition[0], boxPosition[1] - 1.5, boxPosition[2] + 1]}
      castShadow
      onClick={() => navigate("/MusicInfo")} //임시로 /LikePage 넘어가도록
    >
      <boxBufferGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial map={texture} color={isHovered ? "red" : "blue"} />
    </mesh>
  );
};

export default Box;
