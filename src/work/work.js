import React, { useState } from "react";
import NavBar from "../gallery/topNaviBar.js";
import SearchResult from "./searchresult.js";

function MusicSearch() {
  const [showResult, setShowResult] = useState(false);
  const [musicInput, setMusicInput] = useState("");
  const musicList = [
    { title: "Love dive", artist: "New jeans" },
    { title: "Ditto", artist: "New jeans" },
    { title: "hype boy", artist: "New jeans" },
  ];

  const [searchResults, setSearchResults] = useState([]);

  function findButtonClick() {
    const inputWithoutSpaces = musicInput.replace(/\s/g, "");

    const results = musicList.filter(
      (item) =>
        item.title
          .toLowerCase() //대소문자 상관없이
          .replace(/\s/g, "") //띄워쓰기 상관없이
          .includes(inputWithoutSpaces.toLowerCase()) ||
        item.artist
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(inputWithoutSpaces.toLowerCase())
    );

    setSearchResults(results);
    setShowResult(true);
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
            searchResults.map((result, index) => (
              <SearchResult
                key={index}
                musicInput={result.title}
                searchResult={result.artist}
              />
            ))}
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
