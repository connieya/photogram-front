import React from "react";
import SuggestionCard from "./SuggestionCard";

const HomeRight = () => {
  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <img
                className="w-12 h-12 rounded-full"
                src="https://cdn.pixabay.com/photo/2014/07/04/19/15/man-384178_640.jpg"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p>fullname</p>
              <p className="opacity-70">username</p>
            </div>
          </div>
          <div className="text-blue-700 font-semibold">
            <p>전환</p>
          </div>
        </div>

        <div className="space-y-5 mt-10">
          {[11, 1, 1, 1, 1].map((item) => (
            <SuggestionCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
