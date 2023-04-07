import React, { useRef } from "react";
import "./test.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function Hello() {
  return (
    <Canvas className="canvas">
      <OrbitControls autoRotate={false} autoRotateSpeed={10} />
      <mesh>
        <ambientLight intensity={1} />
        <directionalLight
          position={[-1, 0, 1]}
          color={0xa52a2a}
          intensity={0.5}
        />
        <boxGeometry args={[10, 1, 1]} />
        <meshStandardMaterial attach="material" color={0xffdeff} />
      </mesh>
    </Canvas>
  );
}

// export default function Room() {
//   const cameraRef = useRef();
//   const moveForward = useRef(false);
//   const moveBackward = useRef(false);
//   const moveLeft = useRef(false);
//   const moveRight = useRef(false);
//   //오류 해결 해야 함
//   const handleKeyDown = (event) => {
//     switch (event.code) {
//       case "KeyW":
//         moveForward.current = true;
//         break;
//       case "KeyS":
//         moveBackward.current = true;
//         break;
//       case "KeyA":
//         moveLeft.current = true;
//         break;
//       case "KeyD":
//         moveRight.current = true;
//         break;
//       default:
//         break;
//     }
//   };

//   useFrame((state) => {
//     const camera = cameraRef.current;
//     const direction = new THREE.Vector3();
//     const cameraDirection = camera.getWorldDirection(direction);

//     if (moveForward.current) {
//       camera.position.addScaledVector(cameraDirection, -0.1);
//     }
//     if (moveBackward.current) {
//       camera.position.addScaledVector(cameraDirection, 0.1);
//     }
//     if (moveLeft.current) {
//       camera.position.addScaledVector(
//         cameraDirection.cross(new THREE.Vector3(0, 1, 0)),
//         -0.1
//       );
//     }
//     if (moveRight.current) {
//       camera.position.addScaledVector(
//         cameraDirection.cross(new THREE.Vector3(0, 1, 0)),
//         0.1
//       );
//     }
//   });

//   return (
//     <Canvas style={{ height: "100vh" }}>
//       <perspectiveCamera
//         ref={cameraRef}
//         position={[0, 10, 20]}
//         fov={75}
//         aspect={window.innerWidth / window.innerHeight}
//         near={0.1}
//         far={1000}
//       />
//       <OrbitControls />
//       <ambientLight intensity={0.5} />
//       <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} />
//       <mesh>
//         <boxGeometry args={[10, 10, 10]} />
//         <meshStandardMaterial attach="material" color={0xffffff} />
//       </mesh>
//       <mesh position={[0, 5, -5]}>
//         <boxGeometry args={[10, 10, 1]} />
//         <meshStandardMaterial attach="material" color={0xff0000} />
//       </mesh>
//       <mesh position={[0, 5, 5]}>
//         <boxGeometry args={[10, 10, 1]} />
//         <meshStandardMaterial attach="material" color={0x00ff00} />
//       </mesh>
//       <mesh position={[-5, 5, 0]}>
//         <boxGeometry args={[1, 10, 10]} />
//         <meshStandardMaterial attach="material" color={0x0000ff} />
//       </mesh>
//       <mesh position={[5, 5, 0]}>
//         <boxGeometry args={[1, 10, 10]} />
//         <meshStandardMaterial attach="material" color={0xff00ff} />
//       </mesh>
//       {useFrame((state) => {
//         const camera = cameraRef.current;
//         const direction = new THREE.Vector3();
//         const cameraDirection = camera.getWorldDirection(direction);

//         if (moveForward.current) {
//           camera.position.addScaledVector(cameraDirection, -0.1);
//         }
//         if (moveBackward.current) {
//           camera.position.addScaledVector(cameraDirection, 0.1);
//         }
//         if (moveLeft.current) {
//           camera.position.addScaledVector(
//             cameraDirection.cross(new THREE.Vector3(0, 1, 0)),
//             -0.1
//           );
//         }
//         if (moveRight.current) {
//           camera.position.addScaledVector(
//             cameraDirection.cross(new THREE.Vector3(0, 1, 0)),
//             0.1
//           );
//         }
//       })}
//     </Canvas>
//   );
// }
