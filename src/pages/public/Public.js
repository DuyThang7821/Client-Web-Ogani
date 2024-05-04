import React from "react";
import { Outlet } from "react-router-dom";
import { Header, TopHeader, Footer } from "../../components";
const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />

      <div className="w-main">
        <Outlet />
      </div>

      <div className="mt-20 bg-[#f5f5f5] w-full h-[500px] flex justify-center items-center">
          <Footer />
        </div>
    </div>
  );
};

export default Public;
