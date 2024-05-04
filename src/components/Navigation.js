import React from "react";
import { navigation } from "../ultils/constants";
import { NavLink } from "react-router-dom";


const Navigation = () => {
  return (
    <div className="w-main h-[48px] py-2  flex justify-center items-center">
      {navigation.map((el) => (
        <NavLink to={el.path} key={el.id}
        className={({isActive}) => isActive ? 'pr-12 font-bold hover:text-extra text-extra': 'pr-12 hover:text-extra font-bold'}
        
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
