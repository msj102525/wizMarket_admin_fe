import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Main2 from "./pages/Main2/Main2";
import Main3 from "./pages/Main3/Main3";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main2" element={<Main2 />} />
        <Route path="/main3" element={<Main3 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;