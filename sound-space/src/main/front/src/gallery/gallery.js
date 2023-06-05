import { React, useState, useEffect, useRef } from "react";
import "./gallery.css";
import Sidebar from "../sidebar/newSidebar";
import GalleryCanvas from "./galleryCanvas";
import NavBar from "./topNaviBar.js";

function Heart() {
  const [heartNum, setHeartNum] = useState(1004);

  const increaseHeartNum = () => {
    setHeartNum(heartNum + 1);
  };

  return (
    <div className="like">
      <img alt="" id="heart" src="heart1.png" onClick={increaseHeartNum}></img>
      <div className="like-num">{heartNum}</div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="gallery">
      <NavBar></NavBar>
      <div className="gallerycanvasFrame">
        <GalleryCanvas></GalleryCanvas>
      </div>
      <Heart></Heart>
    </div>
  );
}

//https://discourse.threejs.org/t/i-use-canvas-size-as-my-renderer-size-but-got-low-resolution-when-width-not-euqalss-height-size/39655
//https://goddino.tistory.com/350
