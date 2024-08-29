import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import CommercialDistrict from "./pages/CommercialDistrict/CommercialDistrict";
import CommercialDistrict2 from "./pages/CommercialDistrict2/CommercialDistrict2";
import FastAPIRequest from "./pages/FastAPI/FastAPIRequest";
import LocInfo from "./pages/LocInfo/LocInfo"
import RisingBusiness from "./pages/RisingBusiness/RisingBusiness";
import Population from "./pages/Population/Population"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/commercial" element={<CommercialDistrict />} />
        <Route path="/commercial2" element={<CommercialDistrict2 />} />
        <Route path="/rising" element={<RisingBusiness />} />
        <Route path="/fastAPITest" element={<FastAPIRequest />} />
        <Route path="/LocInfo" element={<LocInfo />} />
        <Route path="/population" element={<Population />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;