import "./search.css";
import React, { useState, useEffect } from "react";
import NavBar from "../gallery/topNaviBar.js";
import axios from "../api/axios";

function UserSearch() {
  const [showResult, setShowResult] = useState(false);
  const [userInput, setUserInput] = useState("");

  const idList = [
    { id: "PKNU_WAP", like: 1004 },
    { id: "Hongju", like: 9413 },
    { id: "WAP", like: 2365 },
  ];

  const [searchResult, setSearchResult] = useState(null);

  function findButtonClick() {
    const index = idList.findIndex((item) => item.id === userInput);
    if (index !== -1) {
      setSearchResult(idList[index].like);
    } else {
      setSearchResult(null);
    }
    setShowResult(true);

    // 서버로 GET
    axios
      .get("http://localhost:8080/api/v1/users/search", {
        params: { query: userInput },
      })
      .then((response) => {
        console.log("1");
        console.log(response.data);
      })
      .catch((error) => {
        //CORS 오류로 여기로 넘어감 ..
        console.log("2");
        console.error(error);
      });
  }

  function randomButtonClick() {
    if (idList.length > 0) {
      const randomIndex = Math.floor(Math.random() * idList.length);
      setSearchResult(idList[randomIndex].like);
      setUserInput(idList[randomIndex].id);
      setShowResult(true);
    }
  }

  function findInputChange(event) {
    setUserInput(event.target.value);
    setSearchResult(null); // 검색어가 변경될 때마다 결과 초기화
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="search_back_color">
        <div className="user_search_random">
          <div className="user_search_box">
            <input
              className="user_Searching"
              type="text"
              name="searching"
              placeholder="Search for User_Name"
              value={userInput}
              onChange={findInputChange}
            ></input>
            <button className="find_user" onClick={findButtonClick}></button>
          </div>
          <button className="random_dice" onClick={randomButtonClick}></button>
        </div>

        {searchResult !== null && (
          <div className="user_search_result">
            <div className="user_UI"></div>
            <div className="user_ID">{userInput}</div>
            <div className="s_heart"></div>
            <div className="user_like">{searchResult}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default function Searching() {
  return (
    <div>
      <UserSearch></UserSearch>
    </div>
  );
}
