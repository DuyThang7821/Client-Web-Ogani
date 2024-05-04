import React, { memo, Fragment } from "react";
import logo from "../assets/logo.png.webp";
import { memberSidebar } from "../ultils/constants";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { TbArrowForwardUp} from 'react-icons/tb'

const activeStyle =
  "px-4 py-2 flex items-center gap-2 bg-[#7fad39] text-gray-100";
const notActiveStyle = "px-4 py-2 flex items-center  gap-2 hover:bg-blue-100";

const MemberSidebar = () => {
  return (
    <div className="bg-white h-full py-4 w-[280px] flex-none">
      <div className="w-full flex flex-col items-center justify-center py-4">
        <img
          src={logo}
          alt="logo"
          className="w-[120px] h-[50px] object-cover"
        />
      </div>
      <div className="text-black">
        {memberSidebar?.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(isActive && activeStyle, !isActive && notActiveStyle)
                }
                to={el.path}
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}           
          </Fragment>
        ))}
         <NavLink className={clsx(notActiveStyle)} to={"/"}><TbArrowForwardUp size={18} />Go Home</NavLink>
      </div>
    </div>
  );
};
export default memo(MemberSidebar);
