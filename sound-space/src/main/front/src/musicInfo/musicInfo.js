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
  const [musicId, setMusicId] = useState("");
  const [albumUrl, setAlbumUrl] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [artistName, setArtistName] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const trackIndex = trackIndexing + 1;
        console.log("trackIndex 값은 ", trackIndex);
        const response = await axios.get(
          'http://test-env.eba-gatb5mmj.ap-northeast-2.elasticbeanstalk.com/api/v1/users/${userId}/tracks/${trackIndex}',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.message);
          console.log(response.data.data);
          console.log(response.data.data.musicId);
          setMusicData(response.data.data);
          setOnBookmark(response.data.data.bookmarked);
          setMusicId(response.data.data.musicId);
          setAlbumUrl(response.data.data.albumImageUrl);
          setTrackTitle(response.data.data.trackTitle);
          setArtistName(response.data.data.artistName);
          // musicId = response.data.data.musicId;
          console.log("musicId", musicId);
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
              "http://test-env.eba-gatb5mmj.ap-northeast-2.elasticbeanstalk.com/api/v1/users/reissue",
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

  const handleBookmarkClick = () => {
    // 북마크 상태를 토글
    const newBookmark = !onBookmark;
    setOnBookmark(newBookmark);
    console.log("then 이전");
    console.log(newBookmark);

    const formData = new FormData();
    formData.append("musicId", musicId);
    formData.append("artistName", artistName);
    formData.append("trackTitle", trackTitle);
    formData.append("albumImageUrl", albumUrl);
    // 북마크 업데이트 API 호출
    axios({
      method: "post",
      url: 'http://test-env.eba-gatb5mmj.ap-northeast-2.elasticbeanstalk.com/api/v1/music/${musicId}/bookmarks',
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log("then 이후");
        console.log(response.data);
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
            url: "http://test-env.eba-gatb5mmj.ap-northeast-2.elasticbeanstalk.com/api/v1/users/reissue",
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

  function handleUserClick(userId) {
    // setSelectedUserId(userId); // 선택된 사용자의 ID 설정
    navigate(`/gallery/${userId}`);
  }

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
            <span>
              <button
                className="cancle-button"
                onClick={() => handleUserClick(userId)}
              >
                X
              </button>
            </span>
            <div className="music-artist">{musicData?.artistName}</div>
            <div className="music-lyrics" style={{ whiteSpace: "pre-line" }}>
              {musicData?.lyrics}
            </div>
          </div>
        </div>
        <div className="albumBox">
          <div className="album-frame">
            <img
              alt=""
              src={musicData?.albumImageUrl}
              className="album-image"
            ></img>
            {/* <div>Play바 위치</div> */}
          </div>

          <button
            className={`music_bookmark ${onBookmark ? "on_bookmark" : ""}`}
            onClick={handleBookmarkClick}
          ></button>
        </div>
      </div>
    </>
  );
}
