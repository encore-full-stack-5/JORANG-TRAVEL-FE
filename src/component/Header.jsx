import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Title from "./Title";
import searchImage from "./../image/searchImage.png";
import { useRecoilState } from "recoil";
import { searchState } from "./searchState";

const Header = () => {
  const [searchText, setSearchText] = useRecoilState(searchState);
  const navigate = useNavigate();
  const searchFunc = () => {
    setSearchText(document.getElementById("searchId").value);
    console.log(document.getElementById("searchId").value);
    navigate("/search");
  };
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
          <div className="search-style">
            <input
              type="text"
              id="searchId"
              style={{ marginTop: "0px", width: "35vw" }}
            />
            <button
              className="rectangle"
              style={{
                height: "30px",
                width: "30px",
                margin: "10px",
              }}
              onClick={searchFunc}
            >
              <img
                width="18px"
                height="20px"
                style={{ margin: "0px" }}
                src={searchImage}
                alt="Search"
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
