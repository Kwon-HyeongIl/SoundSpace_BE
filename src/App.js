import React from "react";
import Firstpage from "./bookmark/bookmark";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Firstpage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
