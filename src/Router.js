import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Info from './pages/Map/Info'
import MonthPop from './pages/Month/MonthPop'
import CommercialDistrict from "./pages/CommercialDistrict/CommercialDistrict";
import CommercialDistrict2 from "./pages/CommercialDistrict2/CommercialDistrict2";
import FastAPIRequest from "./pages/FastAPI/FastAPIRequest";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/info" element={<Info />} />
        <Route path="/monthpop" element={<MonthPop />} />
        <Route path="/commercial" element={<CommercialDistrict />} />
        <Route path="/commercial2" element={<CommercialDistrict2 />} />
        <Route path="/fastAPITest" element={<FastAPIRequest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;