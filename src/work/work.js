import React, { useState } from "react";
import NavBar from "../gallery/topNaviBar.js";
import SearchResult from "./searchresult.js";
import axios from "../api/axios.js";
import "./work.css";

function MusicSearch() {
  const [showResult, setShowResult] = useState(false);
  const [musicInput, setMusicInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [index, setIndex] = useState(5);

  const musicList = [
    { title: "Love dive", artist: "New jeans" },
    { title: "Ditto", artist: "New jeans" },
    { title: "hype boy", artist: "New jeans" },
  ];

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  function findButtonClick() {
    setIndex(index + 1);
    const inputWithoutSpaces = musicInput.replace(/\s/g, "");

    axios
      .get("http://localhost:3000/api/v1/music/search", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { query: inputWithoutSpaces },
      })
      .then((response) => {
        console.log("1");
        // console.log(username);
        console.log(response.data);
        setSearchResults(response.data.data);
        setShowResult(true);
        if (response.data.data.length === 0) {
          alert("검색 결과가 없습니다.");
        }
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
    // const results = musicList.filter(
    //   (item) =>
    //     item.title
    //       .toLowerCase() //대소문자 상관없이
    //       .replace(/\s/g, "") //띄워쓰기 상관없이
    //       .includes(inputWithoutSpaces.toLowerCase()) ||
    //     item.artist
    //       .toLowerCase()
    //       .replace(/\s/g, "")
    //       .includes(inputWithoutSpaces.toLowerCase())
    // );

    // setSearchResults(results);
    // setShowResult(true);
  }

  function findInputChange(event) {
    setMusicInput(event.target.value);
    setSearchResults([]);
  }

  return (
    <>
      <NavBar />
      <div className="search_back_color">
        <div className="search_random">
          <div className="search_box">
            <input
              className="Searching"
              type="text"
              name="searching"
              placeholder="Search for Music or Artist"
              value={musicInput}
              onChange={findInputChange}
            ></input>
            <button className="find_music" onClick={findButtonClick}></button>
          </div>
        </div>
        <div className="results">
          {showResult &&
            searchResults.length > 0 &&
            searchResults.map((track) => (
              <SearchResult
                key={track.musicId} // musicId를 key prop으로 사용
                musicId={track.musicId}
                musicAlbum={track.albumImageUrl}
                musicInput={track.trackTitle}
                searchResult={track.artistName}
                bookmark={track.bookmarked}
                index={index}
              />
            ))}
          {/*  이전코드 */}
          {/* {showResult &&
            searchResults.map((result, index) => (
              <SearchResult
                key={index}
                musicInput={result.title}
                searchResult={result.artist}
              />
            ))} */}
        </div>
      </div>
    </>
  );
}

export default function Searching() {
  return (
    <div>
      <MusicSearch />
    </div>
  );
}
