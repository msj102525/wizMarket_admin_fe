import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Local from  './pages/Population/Local'
import Map from './pages/Map/Map'
import CommercialDistrict from "./pages/CommercialDistrict/CommercialDistrict";
import CommercialDistrict2 from "./pages/CommercialDistrict2/CommercialDistrict2";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/local" element={<Local />} />
        <Route path="/map" element={<Map />} />
        <Route path="/commercial" element={<CommercialDistrict />} />
        <Route path="/commercial2" element={<CommercialDistrict2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;