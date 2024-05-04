import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png.webp";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import {  useSelector } from "react-redux";

const { BsHandbagFill, FaHeart } = icons;
const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const cartItems = useSelector((state) => state.user.cart);

  useEffect(() => {
    if (cartItems) {
      setCartItemCount(cartItems?.length);
    }
  }, [cartItems]);

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.quantity * (item.product?.price ?? 0),
    0
  );

  return (
    <div className=" w-main flex justify-between h-[127px] py-[35px]">
      <div>
        <Link to={`/${path.HOME}`}>
          <img
            src={logo}
            alt="logo"
            className="w-[120px] h-[50px] object-contain"
          />
        </Link>
      </div>

      <div class="flex justify-between items-center pl-5  space-x-10">
        <Link className="font-bold" to={path.HOME}>
          HOME
        </Link>
        <Link className="font-bold" to={path.SHOPS}>
          SHOP
        </Link>
        <Link className="font-bold" to={path.PAGES}>
          PAGES
        </Link>
        <Link className="font-bold" to={path.BLOGS}>
          BLOGS
        </Link>
        <Link className="font-bold" to={path.CONTACTS}>
          CONTACT
        </Link>
      </div>

      <div className="flex text-[13px] ">
        {isLoggedIn && (
          <>
            <div class="flex items-center justify-center ">
              <FaHeart size={24} />
              <sup class="text-xs rounded-full bg-[#7fad39] text-white px-1 mr-2">
                2
              </sup>
            </div>
            <Link
              to={`/${path.CART}`}
              className="flex items-center justify-center cursor-pointer "
            >
              <BsHandbagFill size={24} />
              <sup className="text-xs rounded-full bg-[#7fad39] text-white px-1 -ml-2">
                {cartItemCount}
              </sup>
            </Link>

            <div className="flex items-center justify-center gap-2 px-6">
              <span className="text-gray-500 text-[14px]">item:</span>
              <span className="font-bold text-[16px]">${totalPrice}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
