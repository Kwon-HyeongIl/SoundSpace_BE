import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./edit.css";
import NavBar from "../gallery/topNaviBar.js";
import axios from "../api/axios";

function Editing() {
  const [my_playlist, setMyPlaylist] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state: parsedIndex } = location;

  const [editmode, setEditmode] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

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
    // const value = index + 1;
    // navigate("/work", { state: value });
  }

  function handleAddMusic(index) {
    var parsedIndex = index + 1;
    console.log("handelAddMusic", parsedIndex);
    navigate(`/work/${index + 1}`, { state: parsedIndex });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users/me/tracks/edit", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("1");
        // console.log(username);
        console.log(response.data);
        const tracks = response.data.data;
        const updatedPlaylist = tracks.map((track) => ({
          title: track.trackTitle || "",
          artist: track.artistName || "",
        }));
        setMyPlaylist(updatedPlaylist);
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
  }, []);

  function clearTrack(trackIndex) {
    axios
      .patch(
        `http://localhost:3000/api/v1/users/me/tracks/${trackIndex}/clear`,
        {
          trackIndex,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // function addTrack(trackIndex) {
  //   axios
  //     .patch(
  //       `http://localhost:3000/api/v1/users/me/tracks/${trackIndex}/clear`,
  //       {
  //         trackIndex,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  return (
    <div className="Background_edit">
      <div className="edit_title">
        MY <span id="yellow">PLAY</span>LIST
      </div>
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
                  className={`editItem${
                    item.title === "" ? " none_music" : ""
                  }`}
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
                      // <Link to={`/work/${index + 1}`} className="no_line">
                      <button
                        className="add"
                        onClick={() => handleAddMusic(index)}
                        // value={index}
                      >
                        +
                      </button>
                    ) : (
                      // </Link>
                      <button
                        className="sub"
                        onClick={() => {
                          clearTrack(index + 1);
                          handleRemoveMusic(index);
                        }}
                      >
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
