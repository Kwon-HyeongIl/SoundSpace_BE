import React from "react";
import LoginPage from "./login/login";
import SignPage from "./login/sign";
import RankPage from "./ranking/ranking";
import BookmarkPage from "./bookmark/bookmark";
import GalleryPage from "./gallery/gallery";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LoginPage />}></Route>
          <Route path={"/sign"} element={<SignPage />}></Route>
          <Route path={"/rank"} element={<RankPage />}></Route>
          <Route path={"/bookmark"} element={<BookmarkPage />}></Route>
          <Route path={"/gallery"} element={<GalleryPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
