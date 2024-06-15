import { Link } from "react-router-dom";
import React from "react";
import searchImage from "./../image/searchImage.png";
const Search = (props) => {
  return (
    <div className="row-center">
      <input type="text" placeholder={props.placeholder} />
      <img width="25px" height="25px" src={searchImage} alt="Search" />
    </div>
  );
};

export default Search;
