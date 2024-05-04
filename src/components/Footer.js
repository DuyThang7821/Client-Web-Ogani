import React from "react";
import logo from "../assets/logo.png.webp";
import icons from "../ultils/icons";

const {  FaHeart } = icons;
const Footer = () => {
  return (
    <div>
      <div className="w-main flex border-b border-gray-300 pb-10">
        <div className="w-[25%] mr-20">
          <img
            src={logo}
            alt="logo"
            className="w-[120px] h-[50px] object-contain mb-10"
          />
          <ul className="list-none">
            <li className="mb-5 text-gray-500">
              Address: 60-49 Road 11378 New York
            </li>
            <li className="mb-5 text-gray-500">Phone: +65 11.188.888</li>
            <li className="text-gray-500">Email: hello@colorlib.com</li>
          </ul>
        </div>

        <div className="w-[34%]">
          <h6 className="font-bold mb-10">Useful Links</h6>
          <ul className="list-none grid grid-cols-2">
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">About Us</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">About Our Shop</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">Secure Shopping</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">Delivery infomation</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">Privacy Policy</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">Our Sitemap</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">Who We Are</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">Our Services</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">About Us</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">Contact</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">Innovation</a>
            </li>
            <li className="mb-2 text-gray-500">
              <a href="https://colorlib.com">Testimonials</a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold mb-2">Join Our Newsletter Now</h6>
          <p className="mb-10 text-gray-500">
            Get E-mail updates about our latest shop and special offers.
          </p>
          <form>
            <input
              placeholder="Enter your Email"
              className="w-[310px] h-[50px] border p-5"
            />
            <button
              className="font-bold w-[100px] h-[50px] bg-[#7fad39] text-white px-4 py-2"
              type="submit"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>
      <div className="w-main mt-10 flex justify-between">
        <div className="flex items-center">
          <p className="text-gray-500 mr-1">
            Copyright ©2024 All rights reserved | This template is made with
          </p>
          <FaHeart className="text-gray-500 mr-1" />
          <a className="text-gray-500" href="http://localhost:3000/">
            by Colorlib
          </a>
        </div>

        <div>
            <img src="https://preview.colorlib.com/theme/ogani/img/payment-item.png.webp" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
