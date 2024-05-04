import React from "react";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";

const ButtonQuantity = ({ quantity, setQuantity }) => {

  const handleIncrease = () => {
    setQuantity(quantity + 1); // 
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10); 
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity); 
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 w-[140px] h-[50px] rounded-md">
      <button
        className="flex items-center justify-center w-10 h-10 bg-gray-100 focus:outline-none"
        onClick={handleDecrease}
      >
        <HiMinusSm className="text-gray-600 border border-gray-100" />
      </button>
      <input
        min="1"
        className="mx-2 text-center text-gray-600 w-16 bg-gray-100 focus:outline-none"
        value={quantity}
        onChange={handleChange}
      />
      <button
        className="flex items-center justify-center w-10 h-10 bg-gray-100 focus:outline-none"
        onClick={handleIncrease}
      >
        <HiPlusSm className="text-gray-600" />
      </button>
    </div>
  );
};

export default ButtonQuantity;
