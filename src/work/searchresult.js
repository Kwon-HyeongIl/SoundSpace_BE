import "./work.css";
import React from "react";

function SearchResult({ musicInput, searchResult }) {
  return (
    <div className="search_result">
      <div className="music_album"></div>
      <div className="music_title">| {musicInput} |</div>
      <div className="music_artist">{searchResult}</div>
      <button className="add_music">+</button>
    </div>
  );
}

export default SearchResult;