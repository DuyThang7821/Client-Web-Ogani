import React, { useState } from "react";
import { productInfoTabs } from "../../ultils/constants";
import './TabsParrent.css'
const TabsParent = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="relative">
      <div className="tabs-container flex items-center justify-center gap-2 relative">
        {productInfoTabs.map((el) => (
          <span
            className={`py-2 px-4 cursor-pointer font-bold ${
              activeTab === +el.id ? "text-black" : "text-gray-500"
            }`}
            key={el.id}
            onClick={() => setActiveTab(+el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full p-4 text-gray-500 text-left">
        {productInfoTabs.some((el) => +el.id === activeTab) &&
          productInfoTabs.find((el) => +el.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabsParent;
