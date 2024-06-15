import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="center-right">
      <div className="login">
        <input
          type="text"
          placeholder="ID"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <input
          type="password"
          placeholder="PW"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <button className="rectangle">
          <p className="font-color" style={{ color: "#606060" }}>
            로그인
          </p>
        </button>
      </div>

      <div className="row-center">
        <Link to="/findLoginId" style={{ textDecoration: "none" }}>
          <p className="font-color">아이디</p>
        </Link>
        <p className="font-color">/</p>
        <Link to="/findPassword" style={{ textDecoration: "none" }}>
          <p className="font-color">비밀번호</p>
        </Link>
        <p className="font-color">찾기</p>
      </div>
    </div>
  );
};

export default SignIn;
