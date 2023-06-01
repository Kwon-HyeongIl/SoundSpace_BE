import React, { useRef, useEffect, useState } from "react";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/person.glb");
  const ref = useRef();

  return (
    <group ref={ref}>
      <primitive mass={1} position={[-6.7, -0.5, 6]} object={scene} />
    </group>
  );
}

function EmojiMusic() {
  const { scene } = useGLTF("/emoji_music.glb");
  const ref = useRef();

  return (
    <group ref={ref}>
      <primitive mass={1} position={[0, 0.5, -7]} object={scene} />
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
  const { scene } = useGLTF("/crazy.glb");
  const ref = useRef();

  return (
    <group ref={ref}>
      <primitive
        scale={[0.5, 0.5, 0.5]}
        mass={1}
        position={[-4, 1.5, -15]}
        object={scene}
      />
    </group>
  );
}

export { Model, EmojiMusic, Crazy, EmojiHeart };
