import React, { useState } from "react";
import "./work.css";
import axios from "../api/axios";

function SearchResult({
  musicId,
  musicAlbum,
  musicInput,
  searchResult,
  bookmark,
  index,
}) {
  const [onBookmark, setOnBookmark] = useState(bookmark);

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const handleBookmarkClick = () => {
    // 북마크 상태를 토글
    const newBookmark = !onBookmark;
    setOnBookmark(newBookmark);
    console.log("then 이전");
    console.log(newBookmark);
    console.log(musicId);

    const formData = new FormData();
    formData.append("albumImageUrl", musicAlbum);
    formData.append("artistName", searchResult);
    formData.append("trackTitle", musicInput);
    // 북마크 업데이트 API 호출
    axios({
      method: "post",
      url: `http://localhost:3000/api/v1/music/${musicId}/bookmarks`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log("then 이후");
        console.log(musicId);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error");
        console.error(error);
      });
  };

  function addMusicClick() {
    const trackIndex = index;
    axios
      .get(`http://localhost:3000/api/v1/music/${musicId}`)
      .then((response) => {
        console.log("here");
        const update = response.data.data;
        axios
          .patch(
            `http://localhost:3000/api/v1/users/{userId}/tracks/${trackIndex}/update`,
            {
              update,
              trackIndex,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            console.log("there");
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="search_result">
      <img alt="" src={musicAlbum} className="music_album"></img>
      <div className="music_info">
        <div className="music_title">| {musicInput} |</div>
        <div className="music_artist">{searchResult}</div>
      </div>
      <button
        className={`music_bookmark ${onBookmark ? "on_bookmark" : ""}`}
        onClick={handleBookmarkClick}
      ></button>
      <button className="plus_music" onClick={addMusicClick}>
        +
      </button>
    </div>
  );
}

export default SearchResult;
