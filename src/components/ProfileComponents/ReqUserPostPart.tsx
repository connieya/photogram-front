import React, { useState } from "react";
import { tabs } from "./ReqUserPostPartConfig";
import ReqUserPostCard from "./ReqUserPostCard";

const ReqUserPostPart = () => {
  const [activeTab, setActiveTab] = useState<string>();
  return (
    <div>
      <div className="flex space-x-14 border-t relative">
        {tabs.map((item) => (
          <div
            onClick={() => setActiveTab(item.tab)}
            className={`${
              activeTab === item.tab ? "border-t border-black" : "opacity-60"
            } flex items-center cursor-pointer py-2 text-sm`}
          >
            <p>{item.icon}</p>
            <p className="ml-1 text-sm">{item.tab} </p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-wrap">
          {[1, 1, 1, 1, 1, 1].map((item) => (
            <ReqUserPostCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReqUserPostPart;
