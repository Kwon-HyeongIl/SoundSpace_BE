import { React, useState, useEffect, useRef } from "react";
import "./gallery.css";
import Sidebar from "../sidebar/newSidebar";
import GalleryCanvas from "./galleryCanvas";
import { useNavigate } from "react-router-dom";

//상단네비게이션바
function NavBar() {
  const navigate = useNavigate();
  const [workOpen, setWork] = useState(false);
  const [likeOpen, setLike] = useState(false);
  const workToggle = () => {
    setWork((workOpen) => !workOpen);
  };
  const likeToggle = () => {
    setLike((likeOpen) => !likeOpen);
  };

  return (
    <nav>
      <div className="navbar">
        <Sidebar>
          <div className="userInfo">
            <div className="userImg"></div>
            <div className="userName">User Name</div>
          </div>
          <div className="sideContent">
            <div className="itemContainer" onClick={() => navigate("/info")}>
              CHANGE INFO
            </div>
            <div className="itemContainer" onClick={() => navigate("/")}>
              WORK MANAGER
            </div>
            <div className="itemContainer" onClick={() => likeToggle()}>
              LIKE
              {likeOpen ? (
                <ul className="item">
                  <li onClick={() => navigate("/likem")}>For me</li>
                  <li onClick={() => navigate("/likeo")}>For others</li>
                </ul>
              ) : (
                <span></span>
              )}
            </div>
            <button
              className="itemContainer"
              onClick={() => navigate("/bookmark")}
            >
              BOOK MARK
            </button>
            {/* <button className="itemContainer" onClick={() => navigate("/")}>RANKING</button> */}
          </div>
        </Sidebar>
        <a className="logo">
          <sapn className="logo_f">S</sapn>OUND{" "}
          <span className="logo_f">S</span>PACE
        </a>
        <a className="navitem" onClick={() => navigate("/search")} href="#">
          SEARCH
        </a>
        <a className="navitem" onClick={() => navigate("/rank")} href="#">
          RANKING
        </a>
      </div>
    </nav>
  );
}
export default NavBar;
