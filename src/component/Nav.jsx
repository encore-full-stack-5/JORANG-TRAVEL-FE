import { Link } from "react-router-dom";
import React from "react";
const Nav = () => {
  return (
    <div className="nav-font-background">
      <Link to="/" style={{ textDecoration: "none" }}>
        <p className="font-color">홈</p>
      </Link>
      <p className="font-color">|</p>
      <Link to="/sharetrip" style={{ textDecoration: "none" }}>
        <p className="font-color">여행 공유</p>
      </Link>
      <p className="font-color">|</p>
      <Link to="/mytrip" style={{ textDecoration: "none" }}>
        <p className="font-color">나의 여행</p>
      </Link>
      <p className="font-color">|</p>
      <Link to="/chatbot" style={{ textDecoration: "none" }}>
        <p className="font-color">여행 챗봇</p>
      </Link>
    </div>
  );
};

export default Nav;
