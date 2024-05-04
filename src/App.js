import React from "react";
import { Route, Routes } from "react-router-dom";
import { Cart, DetailProducts, Home, Public } from "./pages/public";
import path from "./ultils/path";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { History, MemberLayout, Personal } from "./pages/member";
import ChangePassword from "./pages/member/changePassword";

function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path="/product/:productId" element={<DetailProducts />} />
          <Route path={path.CART} element={<Cart />} />
        </Route>

        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.CHANGE_PASSWORD} element={<ChangePassword />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default App;
