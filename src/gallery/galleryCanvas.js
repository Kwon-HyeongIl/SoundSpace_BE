import { React } from "react";
import * as THREE from "three";
import "./gallery.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { render } from "@testing-library/react";

//갤러리캔버스
function GalleryCanvas() {
  // const canvas = document.querySelector(".canvas");
  // canvas.width = 400;
  // canvas.height = 400;
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
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial attach="material" color={0xffdeff} />
      </mesh>
    </Canvas>
  );
}

export default GalleryCanvas;
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
