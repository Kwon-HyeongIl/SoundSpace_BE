import { React, useState, useEffect, useRef } from "react";
import "./bookmark.css";
import Sidebar from "../gallery/newSidebar";
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

function Ranking() {
  return (
    <div className="rankingBackground">
      <div className="bookmark">BookMark</div>
      <div className="rankingFrame">
        <div className="rankingGrid">
          <div className="rankContainer_head">
            <div className="rankingItem_head">Music</div>
            <div className="rankingItem_head">Artist</div>
            <div className="rankingItem_head">By</div>
          </div>
          {Array.from({ length: 10 }, (_, i) => (
            <div className="rankContainer" key={i}>
              <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
              />
              <span className="music">
                <input
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
