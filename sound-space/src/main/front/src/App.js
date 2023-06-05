import React from "react";
import LoginPage from "./login/login";
import SignPage from "./login/sign";
import SearchPage from "./search/search";
import RankPage from "./ranking/ranking";
import BookmarkPage from "./bookmark/bookmark";
import GalleryPage from "./gallery/gallery";
import LikeoPage from "./likeList/like4other";
import LikemPage from "./likeList/like4me";
import MusicInfoPage from "./musicInfo/musicInfo";
import GuestPage from "./gallery/guest";
import InfoPage from "./user_info/user_info";
import WorkPage from "./work/work";
import EditPage from "./work/edit";
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
          <Route path={"/likem"} element={<LikemPage />}></Route>
          <Route path={"/likeo"} element={<LikeoPage />}></Route>
          <Route path={"/MusicInfo"} element={<MusicInfoPage />}></Route>
          <Route path={"/guest"} element={<GuestPage />}></Route>
          <Route path={"/info"} element={<InfoPage />}></Route>
          <Route path={"/work"} element={<WorkPage />}></Route>
          <Route path={"/edit"} element={<EditPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
