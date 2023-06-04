import "./work.css";
import React from "react";

function SearchResult({ musicInput, searchResult }) {
  return (
    <div className="search_result">
      <div className="music_album"></div>
      <div className="music_title">| {musicInput} |</div>
      <div className="music_artist">{searchResult}</div>
      <button className="find_music_bookmark"></button>
      <button className="plus_music">+</button>
    </div>
  );
}

export default SearchResult;