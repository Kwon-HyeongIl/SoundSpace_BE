import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./edit.css";
import NavBar from "../gallery/topNaviBar.js";

function Editing() {
  const [my_playlist, setMyPlaylist] = useState([
    { title: "Love dive_1", artist: "1" },
    { title: "Ditto", artist: "2" },
    { title: "", artist: "" },
    { title: "Love dive_2", artist: "4" },
    { title: "Ditto_2", artist: "5" },
    { title: "hype boy_2", artist: "6" },
    { title: "Love dive", artist: "7" },
    { title: "Ditto_1", artist: "8" },
    { title: "hype boy", artist: "9" },
    { title: "", artist: "" }
  ]);

  const [editmode, setEditmode] = useState(false);

  function handleOnEditmode() {
    setEditmode(true);
  }

  function handleOffEditmode() {
    setEditmode(false);
  }

  function handleRemoveMusic(index) {
    const updatedPlaylist = [...my_playlist];
    updatedPlaylist[index] = { title: "", artist: "" };
    setMyPlaylist(updatedPlaylist);
  }

  return (
    <div className="Background_edit">
      <div className="edit_title">MY <span id="yellow">PLAY</span>LIST</div>
      <div className="Frame">
        <div className="Grid">
          <div className="edit_head">
            <div className="edit_head" id="numbering_head">
              NO
            </div>
            <div className="edit_head">MUSIC</div>
            <div className="edit_head">ARTIST</div>
          </div>

          {my_playlist.map((item, index) => (
            <div key={index}>
              <hr className="edit-hr" />
              <div className="edit_content">
                <span className="editItem" id="numbering">
                  {index + 1}
                </span>
                <span
                  className={`editItem${item.title === "" ? " none_music" : ""}`}
                >
                  {item.title === "" ? "Please Add Music" : item.title}
                </span>
                <span
                  className={`editItem${
                    item.artist === "" ? " none_music" : ""
                  }`}
                >
                  {item.artist === "" ? "none" : item.artist}
                </span>
                <span></span>
                <span></span>
                {editmode && (
                  <div className="edit_actions">
                    {item.title === "" ? (
                      <Link to="/work" className="no_line">
                      <button className="add" onClick={() => handleRemoveMusic(index)}>
                        +
                      </button>
                    </Link>
                    ) : (
                      <button className="sub" onClick={() => handleRemoveMusic(index)}>
                        -
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {!editmode && (
            <div>
              <hr className="edit-hr" />
              <div className="add_music" onClick={handleOnEditmode}>
                EDIT PLAYLIST
              </div>
            </div>
          )}
          {editmode && (
            <div>
              <hr className="edit-hr" />
              <div className="save_music" onClick={handleOffEditmode}>
                SAVE
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="gallery">
      <NavBar></NavBar>
      <Editing></Editing>
    </div>
  );
}