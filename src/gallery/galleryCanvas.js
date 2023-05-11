//learning-threejs 예제 불러오는 코드

//
// function GalleryCanvas() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const renderer = new THREE.WebGLRenderer({ canvas });
//     renderer.setSize(canvas.clientWidth, canvas.clientHeight);

//     const scene = new THREE.Scene();

//     const camera = new THREE.PerspectiveCamera(
//       45,
//       canvas.clientWidth / canvas.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(-30, 40, 30);
//     camera.lookAt(scene.position);

//     const planeGeometry = new THREE.PlaneGeometry(60, 20);
//     const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
//     const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//     plane.receiveShadow = true;
//     plane.rotation.x = -0.5 * Math.PI;
//     plane.position.x = 15;
//     plane.position.y = 0;
//     plane.position.z = 0;
//     scene.add(plane);

//     const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
//     const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
//     const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//     cube.castShadow = true;
//     cube.position.x = -4;
//     cube.position.y = 3;
//     cube.position.z = 0;
//     scene.add(cube);

//     const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
//     const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
//     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//     sphere.castShadow = true;
//     sphere.position.x = 20;
//     sphere.position.y = 4;
//     sphere.position.z = 2;
//     scene.add(sphere);

//     const spotLight = new THREE.SpotLight(0xffffff);
//     spotLight.position.set(-40, 60, -10);
//     spotLight.castShadow = true;
//     scene.add(spotLight);

//     function render() {
//       renderer.render(scene, camera);
//     }

//     function animate() {
//       requestAnimationFrame(animate);
//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;
//       sphere.rotation.x += 0.01;
//       sphere.rotation.y += 0.01;
//       render();
//     }

//     animate();
//   }, []);

//   return <canvas id="gallery-canvas" ref={canvasRef} />;
// }

// export default GalleryCanvas;

//https://www.youtube.com/watch?v=9ZEjSxDRIik&t=5s 예제

// import { createRoot } from "react-dom/client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./galleryCanvas.css";
import { Canvas } from "@react-three/fiber";
import {
  FirstPersonControls,
  Stars,
  PointerLockControls,
  KeyboardControls,
} from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import Ground from "./Ground.js";
import Player from "./Player.js";
// import "./styles.css";

function Box() {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={[0, 2, 0]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function PlaneBottom() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));
  return (
    // <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}
function PlaneRight() {
  // const [ref] = usePlane(() => ({
  //   rotation: [-Math.PI / 2, 0, 0],
  // }));
  return (
    <mesh position={[50, 10, 0]} rotation={[-Math.PI / 2, 90, 0]}>
      <planeBufferGeometry attach="geometry" args={[50, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
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
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas shadows camera={{ fov: 45 }}>
        {/* <OrbitControls /> */}
        <FirstPersonControls
        // minDistance={0} // 최소 거리
        // maxDistance={50} // 최대 거리
        />
        {/* <PointerLockControls /> */}
        <ambientLight intensity={0.5} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Stars />
        <spotLight position={[0, 15, 10]} angle={0.3} />
        <Physics gravity={[0, -30, 0]}>
          {/* <Player /> */}
          <Box />
          {/* <Ground /> */}
          <PlaneBottom />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
