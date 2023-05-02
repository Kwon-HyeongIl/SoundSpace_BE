import { React, useState, useEffect, useRef } from "react";
import "./gallery.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sidebar from "./newSidebar";
import GalleryCanvas from "./galleryCanvas";
//import { Grid } from "@react-three/drei";
// import Sidebar from "./sidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//상단네비게이션바
function NavBar() {
  const [workOpen, setWork] = useState(false);
  const [likeOpen, setLike] = useState(false);
  const workToggle = () => {
    setWork((workOpen) => !workOpen);
  };
  const likeToggle = () => {
    setLike((likeOpen) => !likeOpen);
  };

  return (
    <nav>
      <div className="navbar">
        <Sidebar>
          <div className="userInfo">
            <div className="userImg"></div>
            <div className="userName">User Name</div>
          </div>
          <div className="sideContent">
            <div className="itemContainer">CHANGE INFO</div>
            <div className="itemContainer" onClick={() => workToggle()}>
              WORK MANAGER
              {workOpen ? (
                <ul className="item">
                  <li href="#">Add Work</li>
                  <li href="#">Edit Gallery</li>
                </ul>
              ) : (
                <span></span>
              )}
            </div>
            <div className="itemContainer" onClick={() => likeToggle()}>
              LIKE
              {likeOpen ? (
                <ul className="item">
                  <li>For me</li>
                  <li>For others</li>
                </ul>
              ) : (
                <span></span>
              )}
            </div>
            <button className="itemContainer">BOOK MARK</button>
            <button className="itemContainer">RANKING</button>
          </div>
        </Sidebar>
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

function Heart() {
  return (
    <div className="like">
      <img alt="" id="heart"></img>
      <span>1000</span>
    </div>
  );
}

export default function Gallery() {
  //canvas 크기 조절
  // const canvas = document.getElementById("artifactCanvas");
  // var width = canvas.clientWidth;
  // var height = canvas.clientHeight;
  return (
    <div className="gallery">
      <NavBar></NavBar>
      {/* <GalleryCanvas></GalleryCanvas> */}
      <Heart></Heart>
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
