import React, { useRef } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Person() {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "../../person/scene.gltf");

  return (
    <group ref={group}>
      <primitive object={nodes.Scene} />
    </group>
  );
}

export default Person;
