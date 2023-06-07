import { React, useState, useEffect, useRef } from "react";
import "./likeList.css";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar.js";
import axios from "../api/axios";

//상단네비게이션바
/*
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
*/

function Likeother() {
  const [username, setUsername] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get(
          "http://localhost:3000/api/v1/users/me/likes-given",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.message);
          console.log(response.data.data);

          if (Array.isArray(response.data.data)) {
            setUsername(response.data.data);
          } else {
            // 처리할 오류에 대한 코드
          }

          if (response.data.data.length === 0) {
            alert(response.data.message);
          }
        } else {
          // 처리할 오류에 대한 코드
        }
      } catch (error) {
        //CORS 오류로 여기로 넘어감 ..
        if (error.response.status === 403) {
          // 서버로부터의 응답을 받은 경우
          console.log("sfesl");
          const formData = new FormData();
          formData.append("accessToken", localStorage.getItem("accessToken"));
          formData.append("refreshToken", localStorage.getItem("refreshToken"));
          try {
            const response = await axios.post(
              "http://localhost:3000/api/v1/users/reissue",
              formData
            );
            console.log("Token reissued.");
            localStorage.setItem("accessToken", response.data.data.accessToken);

            // 토큰을 재발급 받은 후에 다시 fetchData를 호출하여 API를 실행
            await fetchData();
          } catch (error) {
            if (error.response.status === 403) {
              console.log("Token reissue failed.");
            }
          }
        }
      }
    };

    fetchData();
  }, []);
  return (
    <div className="rankingBackground">
      <div className="likeforme">
        <span className="likeforme-title">Like for others</span>
        <span className="favorite material-icons" id="like-icon-title">
          favorite
        </span>
        <span className="favorite material-icons" id="like-icon-title1">
          favorite
        </span>
        <span className="favorite material-icons" id="like-icon-title2">
          favorite
        </span>
      </div>
      <div className="rankingFrame">
        <div className="rankingGrid">
          <div className="rankContainer_head">
            <div className="rankingItem_head">Profile</div>
            <div className="rankingItem_head">User Name</div>
            <div className="rankingItem_head">Like</div>
          </div>
          {username.map((user) => (
            <div>
              <hr className="like-hr" />
              <div className="rankContainer">
                <link
                  href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"
                />
                <div className="rankingItem" id="profile-like"></div>
                <span className="rankingItem">{user.username}</span>
                <span className="rankingItem">
                  <span className="favorite material-icons" id="like-icon">
                    favorite
                  </span>
                  1004
                </span>
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
      <Likeother></Likeother>
    </div>
  );
}

//https://discourse.threejs.org/t/i-use-canvas-size-as-my-renderer-size-but-got-low-resolution-when-width-not-euqalss-height-size/39655
