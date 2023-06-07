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
import Box from "./musicBox.js";
import GuestBox from "./guestBox.js";
// import Person from "./person.js";
import {
  Model,
  Model1,
  Model2,
  EmojiMusic,
  EmojiHeart,
  Crazy,
  SpaceShip,
} from "./model.js";
import axios from "../api/axios";

//바닥
function PlaneBottom() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[20, 20]} />
      <meshLambertMaterial attach="material" color="gray" />
    </mesh>
  );
}

// Wall
function PlaneLeft() {
  const [ref] = usePlane(() => ({
    rotation: [0, Math.PI / 2, 0],
    position: [-10, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[20, 10]} />
      <meshLambertMaterial attach="material" color="black" />
    </mesh>
  );
}

function PlaneRight() {
  const [ref] = usePlane(() => ({
    rotation: [0, -Math.PI / 2, 0],
    position: [10, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[20, 10]} />
      <meshLambertMaterial attach="material" color="black" />
    </mesh>
  );
}

function PlaneBack() {
  const [ref] = usePlane(() => ({
    rotation: [0, -Math.PI, 0],
    position: [0, 0, 10],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[20, 10]} />
      <meshLambertMaterial attach="material" color="black" />
    </mesh>
  );
}

function PlaneFront() {
  const [ref] = usePlane(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, -10],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[20, 10]} />
      <meshLambertMaterial attach="material" color="black" />
    </mesh>
  );
}

// function SmallBox() {
//   const [ref, api] = useBox(() => ({ mass: 1, position: [0, 0, 0] }));

//   const numBoxes = 10; // Number of boxes
//   return (
//     <group>
//       {Array.from({ length: numBoxes }, (_) => (
//         <mesh ref={ref} position={[0, 0, 0]} castShadow>
//           <boxBufferGeometry args={[0.2, 0.2, 0.2]} attach="geometry" />
//           <meshLambertMaterial attach="material" color="blue" />
//         </mesh>
//       ))}
//     </group>
//   );
// }

export default function GalleryCanvas() {
  const [albumUrlList, setAlbumUrlList] = useState([]);

  // const cameraPosition = new THREE.Vector3(0, 50, 0);
  const numBoxes = 10; // Number of boxes
  const boxGap = 2; // Gap between boxes
  const initialBoxPosition = -((numBoxes - 1) * boxGap) / 2;

  const [albumUrl, setAlbumUrl] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Replace with your actual access token

  //       const response = await axios.get(
  //         "http://localhost:3000/api/v1/users/me/tracks",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );

  //       if (response.data.state === 200) {
  //         console.log(response.data.message);
  //         console.log(response.data.data);
  //         const { data } = response.data;
  //         const albumUrlList = data.map((item) =>
  //           item.albumImageUrl
  //             ? item.albumImageUrl
  //             : "https://cdn-icons-png.flaticon.com/512/109/109602.png"
  //         );
  //         setAlbumUrlList(albumUrlList);
  //         console.log(albumUrlList);
  //       } else {
  //         // Handle error response
  //       }
  //     } catch (error) {
  //       // Handle error
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <Canvas shadows={true} camera={{ fov: 45 }}>
        {/* <OrbitControls /> */}
        <FirstPersonControls
          lookSpeed={0.15}
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
          {/* {albumUrlList.map((albumUrl, index) => (
            <Box
              key={index}
              box_position={[
                initialBoxPosition + index * boxGap,
                2, // Adjust the height of each box if needed
                0,
              ]}
              url={albumUrl}
            />
          ))} */}
          {/* <Box
            box_position={[-7.5, 0, -9]}
            url="https://images.genius.com/12350206ae2ebb69d2289908e1acf86f.300x300x1.jpg"
          /> */}
          <Box
            box_position={[-2.5, 0, -9]}
            url="https://images.genius.com/960edcb36156c3aed9cb70ede250780a.300x300x1.jpg"
          />
          <Box
            box_position={[2.5, 0, -9]}
            url="https://www.akbobada.com/home/akbobada/archive/akbo/img/202208031533045.jpg"
          />
          <Box
            box_position={[7.5, 0, -9]}
            url="https://www.akbobada.com/home/akbobada/archive/akbo/img/202208031533045.jpg"
          />
          {/* 왼 */}
          {/* <Box
            box_position={[-9, 0, -3]}
            url="https://www.akbobada.com/home/akbobada/archive/akbo/img/202208031533045.jpg"
          />
          <Box
            box_position={[-9, 0, 3]}
            url="https://www.akbobada.com/home/akbobada/archive/akbo/img/202208031533045.jpg"
          /> */}
          {/* 뒤 */}
          {/* <Box
            box_position={[-6.7, 0, 9]}
            url="https://www.akbobada.com/home/akbobada/archive/akbo/img/202208031533045.jpg"
          />
          <Box
            box_position={[6.7, 0, 9]}
            url="https://www.akbobada.com/home/akbobada/archive/akbo/img/202208031533045.jpg"
          /> */}
          {/* 오 */}
          {/* <Box
            box_position={[9, 0, -3]}
            url="https://www.akbobada.com/home/akbobada/archive/akbo/img/202208031533045.jpg"
          />
          <Box
            box_position={[9, 0, 3]}
            url="https://www.akbobada.com/home/akbobada/archive/akbo/img/202208031533045.jpg"
          /> */}
          {/* {Array.from({ length: numBoxes }, (_, index) => (
            <Box
              key={index}
              box_position={[
                initialBoxPosition + index * boxGap,
                2, // Adjust the height of each box if needed
                0,
              ]}
              url="https://www.akbobada.com/home/akbobada/archive/akbo/img/202208031533045.jpg"
            />
          ))} */}
          {/* <SmallBox /> */}
          <Model />
          <Model1 />
          <Model2 />
          <EmojiMusic />
          {/* <EmojiHeart /> */}
          <Crazy />
          <GuestBox />
          <PlaneLeft />
          <PlaneRight />
          <PlaneFront />
          <PlaneBack />
          <SpaceShip />
        </Physics>
      </Canvas>
      <div className="absolute centered cursor">+</div>
    </>
  );
}
