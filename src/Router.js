import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import CommercialDistrict from "./pages/CommercialDistrict/CommercialDistrict";
import CommercialDistrict2 from "./pages/CommercialDistrict2/CommercialDistrict2";
import FastAPIRequest from "./pages/FastAPI/FastAPIRequest";
import LocInfo from "./pages/LocInfo/LocInfo"
import RisingBusiness from "./pages/RisingBusiness/RisingBusiness";
import Population from "./pages/Population/Population"
import LocContext from "./pages/LocContext/LocContext";
import LocStore from "./pages/LocStore/LocStore";
import City from "./pages/City/City"
import Category from "./pages/Category/Category";
import LocStoreContent from "./pages/LocStoreContent/LocStoreContent";
import BizDetailCategoryContent from "./pages/BizDetailCategoryContent/BizDetailCategoryContent";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/commercial" element={<CommercialDistrict />} />
        <Route path="/commercial2" element={<CommercialDistrict2 />} />
        <Route path="/rising" element={<RisingBusiness />} />
        <Route path="/fastAPITest" element={<FastAPIRequest />} />
        <Route path="/locInfo" element={<LocInfo />} />
        <Route path="/locStore" element={<LocStore />} />
        <Route path="/population" element={<Population />} />
        <Route path="/location/context" element={<LocContext />} />
        <Route path="/city" element={<City />} />
        <Route path="/category" element={<Category />} />
        <Route path="/locStoreContent" element={<LocStoreContent />} />
        <Route path="/bizDetailCategoryContent" element={<BizDetailCategoryContent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;