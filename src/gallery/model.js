import React, { useRef, useEffect, useState } from "react";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/person.glb");
  const ref = useRef();

  return (
    <group ref={ref}>
      <primitive
        rotation={[-0.2, 0, 0]}
        mass={1}
        position={[-6.7, -0.45, 6]}
        object={scene}
      />
    </group>
  );
}

function Model1() {
  const { scene } = useGLTF("/person_president.glb");
  const ref = useRef();

  return (
    <group ref={ref}>
      <primitive
        rotation={[0.2, -Math.PI, 0]}
        mass={1}
        position={[-4, 0.5, -6]}
        object={scene}
      />
    </group>
  );
}
function Model2() {
  const { scene } = useGLTF("/woman.glb");
  const ref = useRef();

  return (
    <group ref={ref}>
      <primitive
        scale={[0.001, 0.001, 0.001]}
        rotation={[0, Math.PI / 2, 0]}
        mass={1}
        position={[4, 0.5, -2]}
        object={scene}
      />
    </group>
  );
}

function EmojiMusic() {
  const { scene } = useGLTF("/emoji_music.glb");
  const ref = useRef();

  return (
    <group ref={ref}>
      <primitive
        rotation={[0.5, 0, 0]}
        mass={1}
        position={[0, 1.5, -7]}
        object={scene}
      />
    </group>
  );
}

// function EmojiDevil() {
//   const { scene } = useGLTF("/emoji_devil.glb");
//   const ref = useRef();

//   return (
//     <group ref={ref}>
//       <primitive
//         scale={[0.01, 0.01, 0.01]}
//         mass={1}
//         position={[0, 1, -7]}
//         object={scene}
//       />
//     </group>
//   );
// }

function EmojiHeart() {
  const { scene } = useGLTF("/emoji_heart.glb");
  const ref = useRef();

  return (
    <group ref={ref}>
      <primitive
        scale={[0.25, 0.25, 0.25]}
        mass={1}
        position={[-4, 1.5, -5]}
        object={scene}
      />
    </group>
  );
}

function Crazy() {
  const { scene } = useGLTF("/space_boi.glb");
  const ref = useRef();

  return (
    <group ref={ref}>
      <primitive
        scale={[1.5, 1.5, 1.5]}
        mass={5}
        position={[0, -3, 0]}
        object={scene}
      />
    </group>
  );
}

function SpaceShip() {
  const { scene } = useGLTF("/space_ship.glb");
  const ref = useRef();

  return (
    <group ref={ref}>
      <primitive
        scale={[50, 50, 50]}
        mass={5}
        position={[4, -4, -11]}
        object={scene}
      />
    </group>
  );
}

export { Model, Model1, Model2, EmojiMusic, EmojiHeart, Crazy, SpaceShip };
