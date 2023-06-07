import { React, useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar";
import "./musicInfo.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

export default function MusicInfo() {
  const bookmark = true;
  const navigate = useNavigate();
  const [onBookmark, setOnBookmark] = useState(false);
  const location = useLocation();
  const trackIndexing = location.state && location.state.trackKey;
  const userId = location.state && location.state.userId;
  const [musicData, setMusicData] = useState(null);
  const handleBookmarkClick = () => {
    setOnBookmark(!onBookmark);
  };

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const trackIndex = trackIndexing + 1;
        console.log("trackIndex 값은 ", trackIndex);
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/${userId}/tracks/${trackIndex}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.message);
          console.log(response.data.data);
          setMusicData(response.data.data);
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

  //me일때
  // const accessToken = localStorage.getItem("accessToken");
  // const refreshToken = localStorage.getItem("refreshToken");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const accessToken = localStorage.getItem("accessToken");
  //       const trackIndex = trackIndexing + 1;
  //       console.log("trackIndex 값은 ", trackIndex);
  //       const response = await axios.get(
  //         `http://localhost:3000/api/v1/users/me/tracks/${trackIndex}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         console.log(response.data.message);
  //         console.log(response.data.data);
  //         setMusicData(response.data.data);
  //       } else {
  //         // 처리할 오류에 대한 코드
  //       }
  //     } catch (error) {
  //       // 오류 처리
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <NavBar />
      <div className="MusicInfo_frame">
        <div className="leftBox">
          <div className="music-frame">
            <span className="music-title">{musicData?.trackTitle}</span>
            <span>{/* <button className="cancle-button">X</button> */}</span>
            <div className="music-artist">{musicData?.artistName}</div>
            <div className="music-lyrics">{musicData?.lyrics}</div>
          </div>
        </div>
        <div className="albumBox">
          <div className="album-frame">
            <img
              alt=""
              src={musicData?.albumImageUrl}
              className="album-image"
            ></img>
            <div>Play바 위치</div>
          </div>

          <button
            className={`music_bmark ${onBookmark ? "on_bmark" : ""}`}
            onClick={handleBookmarkClick}
          ></button>
        </div>
      </div>
    </>
  );
}
