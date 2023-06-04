import React from "react";
import "./edit.css";
import NavBar from "../gallery/topNaviBar.js";

function Ranking() {
  const my_playlist = [
    { title: "Love dive_1", artist: "1" },
    { title: "Ditto", artist: "2" },
    { title: "hype boy_1", artist: "3" },
    { title: "Love dive_2", artist: "4" },
    { title: "Ditto_2", artist: "5" },
    { title: "hype boy_2", artist: "6" },
    { title: "Love dive", artist: "7" },
    { title: "Ditto_1", artist: "8" },
    { title: "hype boy", artist: "9" },
    { title: "", artist: ""}
  ];

  return (
    <div className="Background_edit">
      <div className="Frame">
        <div className="Grid">
          <div className="edit_head">
            <div className="edit_head" id="numbering_head">
              NO
            </div>
            <div className="edit_head">MUSIC</div>
            <div className="edit_head">ARTIST</div>
            <div className="edit_head">REMOVE</div>
          </div>

          {my_playlist.map((item, index) => (
            <div key={index}>
              <hr className="edit-hr" />
              <div className="edit_content">
                <span className="editItem" id="numbering">
                  {index + 1}
                </span>
                <span className="editItem">{item.title}</span>
                <span className="editItem">{item.artist}</span>
                <button className="remove_music"> - </button>
              </div>
            </div>
          ))}
          <div className="add_music">EDIT PLAYLIST</div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="gallery">
      <NavBar></NavBar>
      <Ranking></Ranking>
    </div>
  );
}