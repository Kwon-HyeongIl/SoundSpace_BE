import { React, useState, useEffect, useRef } from "react";
import "./bookmark.css";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar.js";

function Ranking() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };
  return (
    <div className="rankingBackground">
      <div className="bookmark-title">
        <span className="favorite material-icons" id="bookmark-icon">
          bookmark_border
        </span>
        <span className="bookmark">BookMark</span>
        <span className="favorite material-icons" id="bookmark-icon">
          bookmark_border
        </span>
      </div>
      <div className="rankingFrame">
        <div className="rankingGrid">
          <div className="rankContainer_head">
            <div className="rankingItem_head">Music</div>
            <div className="rankingItem_head">Artist</div>
            <div className="rankingItem_head">By</div>
          </div>
          <div className="rankContainer">
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
          </div>
          {Array.from({ length: 10 }, (_, i) => (
            <div className="rankContainer" key={i}>
              <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
              />
              <span className="music">
                <input
                  id="play-icon-button"
                  type="button"
                  className="material-icons"
                  value="play_arrow"
                />
                <span className="rankingItem">Attention</span>
              </span>
              <span className="rankingItem">Newjeans</span>
              <span className="rankingItem">PKNU</span>
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
      <Ranking></Ranking>
    </div>
  );
}

//https://discourse.threejs.org/t/i-use-canvas-size-as-my-renderer-size-but-got-low-resolution-when-width-not-euqalss-height-size/39655
