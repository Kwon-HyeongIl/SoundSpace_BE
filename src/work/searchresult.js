import React, { useState } from 'react';
import './work.css';

function SearchResult({ musicInput, searchResult }) {
  const [onBookmark, setOnBookmark] = useState(false);

  const handleBookmarkClick = () => {
    setOnBookmark(!onBookmark);
  };

  return (
    <div className="search_result">
      <div className="music_album"></div>
      <div className="music_info">
        <div className="music_title">| {musicInput} |</div>
        <div className="music_artist">{searchResult}</div>
      </div>
      <button className={`music_bookmark ${onBookmark ? 'on_bookmark' : ''}`} onClick={handleBookmarkClick}></button>
      <button className="plus_music">+</button>
    </div>
  );
}

export default SearchResult;