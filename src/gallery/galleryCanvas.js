// import { React } from "react";
// import * as THREE from "three";
// import "./gallery.css";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { render } from "@testing-library/react";

// //갤러리캔버스
// function GalleryCanvas() {
//   // const canvas = document.querySelector(".canvas");
//   // canvas.width = 400;
//   // canvas.height = 400;
//   return (
//     <Canvas className="canvas">
//       <OrbitControls autoRotate={false} autoRotateSpeed={10} />
//       <mesh>
//         <ambientLight intensity={1} />
//         <directionalLight
//           position={[-1, 0, 1]}
//           color={0xa52a2a}
//           intensity={0.5}
//         />
//         <boxGeometry args={[5, 5, 5]} />
//         <meshStandardMaterial attach="material" color={0xffdeff} />
//       </mesh>
//     </Canvas>
//   );
// }

// export default GalleryCanvas;
//유튜브 강의 (장면 크게 만들기)
// function GalleryCanvas() {
//   //장면
//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x004fff);

//   //카메라
//   const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0 / 1,
//     1000
//   );

//   //렌더러
//   const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   //장면, 카메라, 렌더러를 웹에 보여주는 방법에는 2가지가 있는데
//   //첫번째 방법
//   document.body.appendChild(renderer.domElement);
//   renderer.render(scene, camera);
// }
// export default GalleryCanvas;

//learning-threejs
// once everything is loaded, we run our Three.js stuff.
// function GalleryCanvas() {
//   // create a scene, that will hold all our elements such as objects, cameras and lights.
//   var scene = new THREE.Scene();

//   // create a camera, which defines where we're looking at.
//   var camera = new THREE.PerspectiveCamera(
//     45,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );

//   // create a render and set the size
//   var renderer = new THREE.WebGLRenderer();

//   renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.shadowMapEnabled = true;

//   // create the ground plane
//   var planeGeometry = new THREE.PlaneGeometry(60, 20);
//   var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
//   var plane = new THREE.Mesh(planeGeometry, planeMaterial);
//   plane.receiveShadow = true;

//   // rotate and position the plane
//   plane.rotation.x = -0.5 * Math.PI;
//   plane.position.x = 15;
//   plane.position.y = 0;
//   plane.position.z = 0;

//   // add the plane to the scene
//   scene.add(plane);

//   // create a cube
//   var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
//   var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
//   var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//   cube.castShadow = true;

//   // position the cube
//   cube.position.x = -4;
//   cube.position.y = 3;
//   cube.position.z = 0;

//   // add the cube to the scene
//   scene.add(cube);

//   var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
//   var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
//   var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

//   // position the sphere
//   sphere.position.x = 20;
//   sphere.position.y = 4;
//   sphere.position.z = 2;
//   sphere.castShadow = true;

//   // add the sphere to the scene
//   scene.add(sphere);

//   // position and point the camera to the center of the scene
//   camera.position.x = -30;
//   camera.position.y = 40;
//   camera.position.z = 30;
//   camera.lookAt(scene.position);

//   //위까지는 중복, 새로 추가된 코드
//   // add spotlight for the shadows
//   var spotLight = new THREE.SpotLight(0xffffff);
//   //-40,60,-10에서 빛을 비춰줌
//   spotLight.position.set(-40, 60, -10);
//   spotLight.castShadow = true;
//   scene.add(spotLight);

//   // add the output of the renderer to the html element
//   document.getElementById("WebGL-output").appendChild(renderer.domElement);

//   // call the render function
//   renderer.render(scene, camera);
//   return(
//     window.onload = GalleryCanvas();
//   );
// }

// export default GalleryCanvas;
// window.onload = init;

//learning-threejs 예제 불러오는 코드
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

function GalleryCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    const planeGeometry = new THREE.PlaneGeometry(60, 20);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    scene.add(sphere);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    function render() {
      renderer.render(scene, camera);
    }

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      render();
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} />;
}

export default GalleryCanvas;

//갤러리
// import * as THREE from "three";
// import { useEffect, useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   useCursor,
//   MeshReflectorMaterial,
//   Image,
//   Text,
//   Environment,
// } from "@react-three/drei";
// import { useRoute, useLocation } from "wouter";
// import { easing } from "maath";
// import getUuid from "uuid-by-string";

// const GOLDENRATIO = 1.61803398875;

// export const App = ({ images }) => (
//   <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
//     <color attach="background" args={["#191920"]} />
//     <fog attach="fog" args={["#191920", 0, 15]} />
//     <group position={[0, -0.5, 0]}>
//       <Frames images={images} />
//       <mesh rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[50, 50]} />
//         <MeshReflectorMaterial
//           blur={[300, 100]}
//           resolution={2048}
//           mixBlur={1}
//           mixStrength={50}
//           roughness={1}
//           depthScale={1.2}
//           minDepthThreshold={0.4}
//           maxDepthThreshold={1.4}
//           color="#050505"
//           metalness={0.5}
//         />
//       </mesh>
//     </group>
//     <Environment preset="city" />
//   </Canvas>
// );

// function Frames({
//   images,
//   q = new THREE.Quaternion(),
//   p = new THREE.Vector3(),
// }) {
//   const ref = useRef();
//   const clicked = useRef();
//   const [, params] = useRoute("/item/:id");
//   const [, setLocation] = useLocation();
//   useEffect(() => {
//     clicked.current = ref.current.getObjectByName(params?.id);
//     if (clicked.current) {
//       clicked.current.parent.updateWorldMatrix(true, true);
//       clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
//       clicked.current.parent.getWorldQuaternion(q);
//     } else {
//       p.set(0, 0, 5.5);
//       q.identity();
//     }
//   });
//   useFrame((state, dt) => {
//     easing.damp3(state.camera.position, p, 0.4, dt);
//     easing.dampQ(state.camera.quaternion, q, 0.4, dt);
//   });
//   return (
//     <group
//       ref={ref}
//       onClick={(e) => (
//         e.stopPropagation(),
//         setLocation(
//           clicked.current === e.object ? "/" : "/item/" + e.object.name
//         )
//       )}
//       onPointerMissed={() => setLocation("/")}
//     >
//       {images.map(
//         (props) => <Frame key={props.url} {...props} /> /* prettier-ignore */
//       )}
//     </group>
//   );
// }

// function Frame({ url, c = new THREE.Color(), ...props }) {
//   const image = useRef();
//   const frame = useRef();
//   const [, params] = useRoute("/item/:id");
//   const [hovered, hover] = useState(false);
//   const [rnd] = useState(() => Math.random());
//   const name = getUuid(url);
//   const isActive = params?.id === name;
//   useCursor(hovered);
//   useFrame((state, dt) => {
//     image.current.material.zoom =
//       2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
//     easing.damp3(
//       image.current.scale,
//       [
//         0.85 * (!isActive && hovered ? 0.85 : 1),
//         0.9 * (!isActive && hovered ? 0.905 : 1),
//         1,
//       ],
//       0.1,
//       dt
//     );
//     easing.dampC(
//       frame.current.material.color,
//       hovered ? "orange" : "white",
//       0.1,
//       dt
//     );
//   });
//   return (
//     <group {...props}>
//       <mesh
//         name={name}
//         onPointerOver={(e) => (e.stopPropagation(), hover(true))}
//         onPointerOut={() => hover(false)}
//         scale={[1, GOLDENRATIO, 0.05]}
//         position={[0, GOLDENRATIO / 2, 0]}
//       >
//         <boxGeometry />
//         <meshStandardMaterial
//           color="#151515"
//           metalness={0.5}
//           roughness={0.5}
//           envMapIntensity={2}
//         />
//         <mesh
//           ref={frame}
//           raycast={() => null}
//           scale={[0.9, 0.93, 0.9]}
//           position={[0, 0, 0.2]}
//         >
//           <boxGeometry />
//           <meshBasicMaterial toneMapped={false} fog={false} />
//         </mesh>
//         <Image
//           raycast={() => null}
//           ref={image}
//           position={[0, 0, 0.7]}
//           url={url}
//         />
//       </mesh>
//       <Text
//         maxWidth={0.1}
//         anchorX="left"
//         anchorY="top"
//         position={[0.55, GOLDENRATIO, 0]}
//         fontSize={0.025}
//       >
//         {name.split("-").join(" ")}
//       </Text>
//     </group>
//   );
// }
