import React from "react";

const ButtonParrent = ({ children, onClick }) => { 
  return (
    <button
      className="w-[200px] h-[50px] bg-[#7fad39] text-white font-semibold rounded-md"
      onClick={onClick} 
    >
      {children}
    </button>
  );
};

export default ButtonParrent;