import { Link } from "react-router-dom";
import React from "react";
import Title from "./Title";
import Search from "./Search";
const Header = () => {
  return (
    <div>
      <nav>
        <div>
          <div className="header-right">
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <p className="font-color">회원가입</p>
            </Link>
            <p className="font-color">/</p>

            <Link to="/signin" style={{ textDecoration: "none" }}>
              <p className="font-color">로그인</p>
            </Link>
            <p className="font-color">/</p>
            <Link to="/mypage" style={{ textDecoration: "none" }}>
              <p className="font-color">마이페이지</p>
            </Link>
          </div>
          <div className="header-center">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Title>JORANG</Title>
            </Link>
            <p className="font-color">여행에 대한 모든 것</p>
          </div>

          <Search placeholder="가고 싶은 나라나 도시를 입력해주세요" />
        </div>
      </nav>
    </div>
  );
};

export default Header;
