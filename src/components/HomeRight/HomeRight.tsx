import React from "react";

const HomeRight = () => {
  return (
    <div className="border">
      <div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
