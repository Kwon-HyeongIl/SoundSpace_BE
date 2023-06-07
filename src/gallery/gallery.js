import { React, useState, useEffect, useRef } from "react";
import "./gallery.css";
import Sidebar from "../sidebar/newSidebar";
import GalleryCanvas from "./galleryCanvas";
import NavBar from "./topNaviBar.js";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import heartImg from "./heart1.png";

function Heart() {
  /*
  const [heartNum, setHeartNum] = useState(1004);

  const increaseHeartNum = () => {
    setHeartNum(heartNum + 1);
  };*/

  const [onHeart, setOnHeart] = useState(true);
  const { userId } = useParams();

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const handleHeart = () => {
    // 북마크 상태를 토글
    setOnHeart(!onHeart);
    console.log("then 이전");

    const formData = new FormData();
    formData.append("userId", userId);
    // 북마크 업데이트 API 호출
    axios({
      method: "post",
      url: `http://localhost:3000/api/v1/users/${userId}/likes`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log("then 이후");
        console.log(response.data);
        setOnHeart(!onHeart);
      })
      .catch((error) => {
        //CORS 오류로 여기로 넘어감 ..
        // console.log("2");
        // console.error(error);
        if (error.response.status === 403) {
          // 서버로부터의 응답을 받은 경우
          console.log("sfesl");
          const formData = new FormData();
          formData.append("accessToken", accessToken);
          formData.append("refreshToken", refreshToken);
          axios({
            method: "post",
            url: "http://localhost:3000/api/v1/users/reissue",
            data: formData,
          })
            .then((response) => {
              console.log("12");
              console.log(response.data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                console.log("Token reissue failed.");
              }
            });
        }
      });
  };

  console.log("Heart 속", userId);
  return (
    <div className="like">
      <img
        alt=""
        className={`heart ${onHeart ? "heart_on" : "heart_off"}`}
        src={heartImg}
        onClick={handleHeart}
      ></img>
      {/*<div className="like-num">{heartNum}</div>*/}
    </div>
  );
}

export default function Gallery() {
  const { userId } = useParams();
  // selectedUserId 속성 추가
  return (
    <div className="gallery">
      <NavBar userId={userId} />
      <div className="gallerycanvasFrame">
        <GalleryCanvas userId={userId} />
        {/* selectedUserId 값을 GalleryCanvas 컴포넌트로 전달 */}
      </div>
      <Heart></Heart>
    </div>
  );
}

//https://discourse.threejs.org/t/i-use-canvas-size-as-my-renderer-size-but-got-low-resolution-when-width-not-euqalss-height-size/39655
//https://goddino.tistory.com/350
