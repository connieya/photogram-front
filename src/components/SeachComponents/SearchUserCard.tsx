import React from "react";

const SearchUserCard = () => {
  return (
    <div className="py-2 cursor-pointer">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src="https://cdn.pixabay.com/user/2022/06/07/17-37-04-943_250x250.jpg"
          alt=""
        />
        <div className="ml-3">
          <p>full name</p>
          <p className="opacity-70">username</p>
        </div>
      </div>
    </div>
  );
};

export default SearchUserCard;
