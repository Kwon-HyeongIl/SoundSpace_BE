import { React, useState, useEffect, useRef } from "react";
import "./bookmark.css";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar.js";

function Bookmarking() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };
  return (
    <div className="rankingBackground">
      <div className="bookmark-title">
        <div className="favorite material-icons" id="bookmark-icon">bookmark_border</div>
        <div className="bookmark">BookMark</div>
        <div className="favorite material-icons" id="bookmark-icon1">bookmark_border</div>
      </div>
      <div className="rankingFrame">
        <div className="rankingGrid">
          <div className="rankContainer_head">
            <div className="rankingItem_head">Album Cover</div>
            <div className="rankingItem_head">Title</div>
            <div className="rankingItem_head">Artist</div>
          </div>
          {/* <div className="rankContainer">
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
            <span className="music">
              <input
                id="play-icon-button"
                type="button"
                className="material-icons"
                value={isPlaying ? "pause" : "play_arrow"}
                onClick={togglePlay}
              />
              <span className="rankingItem">Attention</span>
            </span>
            <span className="rankingItem">Newjeans</span>
            <span className="rankingItem">PKNU</span>
          </div> */}
          {Array.from({ length: 10 }, (_, i) => (
            <div className="rankContainer" key={i}>
              <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
              />
              {/* <span className="music"> */}
              {/* <input
                  id="play-icon-button"
                  type="button"
                  className="material-icons"
                  value="play_arrow"
                /> */}
              <img
                alt=""
                src="https://image.bugsm.co.kr/album/images/500/40780/4078016.jpg"
                className="album_cover"
              />
              <span className="rankingItem">Attention</span>
              {/* </span> */}
              <span className="rankingItem">Newjeans</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="gallery">
      <NavBar></NavBar>
      <Bookmarking></Bookmarking>
    </div>
  );
}

//https://discourse.threejs.org/t/i-use-canvas-size-as-my-renderer-size-but-got-low-resolution-when-width-not-euqalss-height-size/39655
