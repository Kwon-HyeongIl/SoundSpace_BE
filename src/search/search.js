import "./search.css";
import React, { useState } from "react";
import NavBar from "../gallery/topNaviBar.js";

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
  }

  function findInputChange(event) {
    setUserInput(event.target.value);
    setSearchResult(null); // 검색어가 변경될 때마다 결과 초기화
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="search_back_color">
        <div className="search_random">
          <div className="search_box">
            <input
              className="Searching"
              type="text"
              name="searching"
              placeholder="Search for User_Name"
              value={userInput}
              onChange={findInputChange}
            ></input>
            <button className="find_user" onClick={findButtonClick}></button>
          </div>
          <button className="random_dice"></button>
        </div>

        {searchResult !== null && (
          <div className="search_result">
            <div className="user_UI"></div>
            <div className="user_ID">{userInput}</div>
            <div className="heart"></div>
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
