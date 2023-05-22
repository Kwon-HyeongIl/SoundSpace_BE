import { React, useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar";
import "./musicInfo.css";
import { useNavigate } from "react-router-dom";

export default function MusicInfo() {
  const bookmark = true;
  const navigate = useNavigate;
  return (
    <>
      <NavBar />
    </>
  );
}
