import React from "react";
import styled from "styled-components";
import SearchUserCard from "./SearchUserCard";

const SearchComponents = () => {
  return (
    <SearchLayOut>
      <div className="px-3 pb-5">
        <h1 className="text-xl pb-5">Search</h1>
        <SeachInput type="text" placeholder="Search.." />
      </div>
      <hr />
      <div className="px-3 pt-5">
        {[1, 1, 1, 1, 1].map((itm) => (
          <SearchUserCard />
        ))}
      </div>
    </SearchLayOut>
  );
};

export default SearchComponents;

const SearchLayOut = styled.div`
  padding: 1rem 0rem;
  border: 1px solid rgb(220, 220, 220);
  box-sizing: 0 1px 2px rgb(2, 2, 2);
  width: 300px;
  height: 100vh;
  z-index: 10;
`;

const SeachInput = styled.input`
  border: none;
  border-radius: 4px;
  background-color: rgb(242, 242, 242);
  padding: 5px 10px;
  font-size: 13px;
  width: 90%;
  outline: none;
  margin-left: 10px;
`;
