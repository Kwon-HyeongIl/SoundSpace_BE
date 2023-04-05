import { React, useState, useEffect, useRef } from "react";
import "./gallery.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sidebar from "./newSidebar";
//import { Grid } from "@react-three/drei";
// import Sidebar from "./sidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";

//상단네비게이션바
function NavBar() {
  return (
    <nav>
      <div className="navbar">
        {/* <BrowserRouter>
          <Sidebar></Sidebar>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/members" component={Home} />
            <Route path="/cashes" component={Home} />
          </Switch>
        </BrowserRouter> */}
        <div className="menu">MENU</div>
        <div className="logo">
          <sapn className="logo_f">S</sapn>OUND{" "}
          <span className="logo_f">S</span>PACE
        </div>
        <a className="navitem" href="#">
          SEARCH
        </a>
        <a className="navitem" href="#">
          RANKING
        </a>
      </div>
    </nav>
  );
}

//갤러리 캔버스
function GalleryCanvas() {
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

//사이드바 예제
// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const sidebarRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarRef]);

//   return (
//     <div className={`sidebar ${isOpen ? "open" : "closed"}`} ref={sidebarRef}>
//       {/* Sidebar content goes here */}
//       <p>Profile</p>
//       <ul>
//         <li>Profile item 1</li>
//         <li>Profile item 2</li>
//         <li>Profile item 3</li>
//       </ul>
//     </div>
//   );
// }

export default function Gallery() {
  //canvas 크기 조절
  // const canvas = document.getElementById("artifactCanvas");
  // var width = canvas.clientWidth;
  // var height = canvas.clientHeight;
  return (
    <div className="gallery">
      <NavBar></NavBar>
      <Sidebar width={1000}>hello</Sidebar>
      <GalleryCanvas></GalleryCanvas>
    </div>
  );
  //사이드 바 예제
  // const [isOpen, setIsOpen] = useState(false);

  // const handleMenuClick = () => {
  //   console.log("Menu clicked");
  //   setIsOpen(true);
  // };

  // return (
  //   <div>
  //     <button onClick={handleMenuClick}>Menu</button>
  //     {isOpen && <Sidebar />}
  //   </div>
  // );
}

//https://discourse.threejs.org/t/i-use-canvas-size-as-my-renderer-size-but-got-low-resolution-when-width-not-euqalss-height-size/39655
