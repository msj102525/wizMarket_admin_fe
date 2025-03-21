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
import Ads from "./pages/Ads/AdsContent"
import TestNewGptModel from "./pages/TestNewGptModel/TestNewGptModel"
import TestDrawImage from "./pages/TestDrawImage/TestDrawImage";
import TestRemoveBackground from "./pages/TestRemoveBackground/TestRemoveBackground";
import TestGenerateVideo from "./pages/TestGenerateVideo/TestGenerateVideo";
import TestMusic from "./pages/TestMusic/TestMusic";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/commercial" element={<CommercialDistrict />} />
        <Route path="/commercial2" element={<CommercialDistrict2 />} />
        <Route path="/rising" element={<RisingBusiness />} />
        <Route path="/fastAPITest" element={<FastAPIRequest />} />
        <Route path="/loc/info" element={<LocInfo />} />
        <Route path="/loc/store" element={<LocStore />} />
        <Route path="/population" element={<Population />} />
        <Route path="/location/context" element={<LocContext />} />
        <Route path="/city" element={<City />} />
        <Route path="/category" element={<Category />} />
        <Route path="/store/content" element={<LocStoreContent />} />
        <Route path="/detail/category/content" element={<BizDetailCategoryContent />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/test/gpt/model" element={<TestNewGptModel />} />
        <Route path="/test/draw/image" element={<TestDrawImage />} />
        <Route path="/test/remove/background" element={<TestRemoveBackground />} />
        <Route path="/test/generate/video" element={<TestGenerateVideo />} />
        <Route path="/test/music" element={<TestMusic />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;