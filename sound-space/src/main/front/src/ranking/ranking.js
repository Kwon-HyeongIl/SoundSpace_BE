import { React, useState, useEffect, useRef } from "react";
import "./ranking.css";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar.js";

function Ranking() {
  return (
    <div className="rankingBackground">
      <div className="rank-title">Ranking</div>
      <div className="rankingFrame">
        <div className="rankingGrid">
          <div className="rankContainer_head">
            <div className="rankingItem_head">Rank</div>
            <div className="rankingItem_head">User_Name</div>
            <div className="rankingItem_head">Heart</div>
          </div>
          {Array.from({ length: 10 }, (_, i) => (
            <div>
              <hr className="rank-hr" />
              <div className="rankContainer" key={i}>
                <span className="rankingItem">{i + 1}</span>
                <span className="rankingItem">User_Name</span>
                <span className="rankingItem">1004</span>
              </div>
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
