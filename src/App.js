import React from "react";
import LoginPage from "./login/login";
import SignPage from "./login/sign";
import SearchPage from "./search/search";
import RankPage from "./ranking/ranking";
import BookmarkPage from "./bookmark/bookmark";
import GalleryPage from "./gallery/gallery";
import LikePage from "./likeList/like4other";
import MusicInfoPage from "./musicInfo/musicInfo";
import GuestPage from "./gallery/guest";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LoginPage />}></Route>
          <Route path={"/sign"} element={<SignPage />}></Route>
          <Route path={"/search"} element={<SearchPage />}></Route>
          <Route path={"/rank"} element={<RankPage />}></Route>
          <Route path={"/bookmark"} element={<BookmarkPage />}></Route>
          <Route path={"/gallery"} element={<GalleryPage />}></Route>
          <Route path={"/Like"} element={<LikePage />}></Route>
          <Route path={"/MusicInfo"} element={<MusicInfoPage />}></Route>
          <Route path={"/guest"} element={<GuestPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
