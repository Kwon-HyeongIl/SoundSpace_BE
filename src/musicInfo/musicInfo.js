import { React, useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar";
import "./musicInfo.css";
import { useNavigate } from "react-router-dom";

export default function MusicInfo() {
  const bookmark = true;
  const navigate = useNavigate;
  return (
    <>
      <NavBar />
      <div className="MusicInfo_frame">
        <div className="leftBox">
          <div className="music-frame">
            <span className="music-title">Attention</span>
            <span>
              <button className="cancle-button">X</button>
            </span>
            <div className="music-artist">NewJeans</div>
            <div className="music-lyrics">
              <p>
                You and me 내 맘이 보이지? <br />
                한참을 쳐다봐, 가까이 다가가 you see (ey-yeah) <br />
                You see, ey, ey, ey, ey <br />
                One, two, three 용기가 생겼지
                <br />
                이미 아는 니 눈치 <br />
                고개를 돌려 천천히, 여기 <br />
                You see 여기 보이니?
                <br />
                Looking for attention <br />
                너야겠어 확실하게 나로 만들겠어 stop <br />
                Ey, drop the question <br />
                Drop the, drop the question <br />
                Want attention
                <br />
                Wanna want attention <br />
                You give me butterflies, you know <br />내 맘은 온통 paradise{" "}
                <br />
                꿈에서 깨워주지 마 <br />
                You got me looking for attention <br />
                You got me looking for attention <br />
                가끔은 정말 헷갈리지만 분명한 건 <br />
                Got me looking for attention <br />널 우연히 마주친 척할래{" "}
                <br />못 본 척 지나갈래 <br />
                You're so fine (ey) <br />
                Gotta, gotta get to know ya <br />
                나와, 나와 걸어가 줘 <br />
                지금 돌아서면 I need ya, need ya, need ya <br />
                To look at me back <br />
                Hey 다 들켰었나? <br />널 보면 하트가 튀어나와 <br />난 사탕을
                찾는 baby (baby) <br />내 맘은 설레이지 <br />
                Ey, drop the question <br />
                Drop the, drop the question <br />
                Want attention
                <br />
                Wanna want attention <br />
                You give me butterflies, you know <br />내 맘은 온통 paradise{" "}
                <br />
                꿈에서 깨워주지 마 (one, two, three ey)
                <br /> You got me looking for attention <br />
                You got me looking for attention <br />
                가끔은 정말 헷갈리지만 분명한 건 <br />
                Got me looking for attention
                <br /> You got me looking for attention
                <br /> You got me looking for attention
                <br /> 가끔은 정말 헷갈리지만 분명한 건 <br />
                Got me looking for attention
                <br />
                A-T-T-E-N-T-I-ON <br />
                Attention is what I want
                <br /> A-T-T-E-N-T-I-ON
                <br />
                Attention is what I want <br />
                A-T-T-E-N-T-I-ON <br />
                Attention is what I want <br />
                A-T-T-E-N-T-I-ON <br />
                You got me looking for attention
              </p>
            </div>
          </div>
        </div>
        <div className="albumBox">
          <div className="album-frame">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
            />
            {bookmark ? (
              <a href="https://fonts.google.com/icons?selected=Material+Icons+Outlined:bookmark:&icon.query=bookmark&icon.set=Material+Icons">
                <span className="material-symbols-outlined" id="bookmark-icon">
                  bookmark
                </span>
              </a>
            ) : (
              <a href="https://fonts.google.com/icons?selected=Material+Icons+Outlined:bookmark_border:&icon.query=bookmark&icon.set=Material+Icons">
                <span className="material-symbols-outlined" id="bookmark-icon">
                  bookmark_border
                </span>
              </a>
            )}

            <img
              alt=""
              src="https://image.bugsm.co.kr/album/images/500/40780/4078016.jpg"
              className="album-image"
            ></img>
            <div>Play바 위치</div>
          </div>
        </div>
      </div>
    </>
  );
}
