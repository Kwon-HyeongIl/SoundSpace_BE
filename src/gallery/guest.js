import { React, useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar";
import { useNavigate } from "react-router-dom";
import "./guest.css";

export default function GuestList() {
  const bookmark = true;
  const navigate = useNavigate;
  return (
    <>
      <NavBar />
      <div className="Guest_frame">
        <div className="leftBox">
          <div className="input-frame">
            <span className="user_name">User_Name</span>
            <input className="guest_input"></input>
            <button className="send_button">send</button>
          </div>
        </div>
        <div className="guest_list">
          <div>
            <div className="list-frame">
              <div className="list_content">
                <div className="list_content_child">USER</div>
                <div className="list_content_child">CONTENT</div>
              </div>
              {Array.from({ length: 10 }, (_, i) => (
                <div>
                  <hr className="guest_hr" />
                  <div className="guestContainer" key={i}>
                    <span className="guestItem">User_Name</span>
                    <span className="guestItem">
                      안녕
                      <br />
                      하세요
                      <br />
                      잘 보고
                      <br />
                      갑니다
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
