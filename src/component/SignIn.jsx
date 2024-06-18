import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postSignIn } from "../config/authApi";
import Mypage from "./Mypage";

const SignIn = () => {
  const navigate = useNavigate();

  const moveToMyPage = () => {
    navigate("/mypage");
  };

  const signInFunc = async (e) => {
    console.log("signInFunc 들어옴");
    e.preventDefault();
    const getLoginId = document.getElementById("loginId").value;
    const getPassword = document.getElementById("password").value;
    try {
      const response = await postSignIn({
        loginId: getLoginId,
        password: getPassword,
      });
      console.log(response);
      console.log(response.token);

      console.log(response.loginId);
      localStorage.setItem("loginId", response.loginId);
      localStorage.setItem("token", response.token);
      localStorage.setItem("nickname", response.nickname);
      console.log("성공");
      alert("로그인 성공");
      moveToMyPage();
    } catch {
      console.log("error in signIn");
      alert("로그인 실패");
    }
  };

  const localStorageClear = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      localStorage.clear();
      alert("로그아웃");
      // navigate("/login");
      window.location.reload(); // 새로고침한다
    }
  };

  return !localStorage.getItem("loginId") ? (
    <div className="center-right">
      <form onSubmit={signInFunc}>
        <div className="login">
          <input
            type="text"
            id="loginId"
            placeholder="ID"
            style={{ height: "20px", width: "320px", borderRadius: "10px" }}
          />
          <input
            type="password"
            id="password"
            placeholder="PW"
            style={{ height: "20px", width: "320px", borderRadius: "10px" }}
          />
          <button type="submit" className="rectangle">
            <p className="font-color" style={{ color: "#606060" }}>
              로그인
            </p>
          </button>
        </div>
      </form>

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
      <div style={{ display: "flex" }}>
        <p className="font-color">계정이 없다면 ? </p>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <p className="font-color" style={{ color: "#606060" }}>
            회원가입
          </p>
        </Link>
      </div>
    </div>
  ) : (
    <div className="login">
      <button
        onClick={moveToMyPage}
        className="rectangle"
        style={{ textDecoration: "none" }}
      >
        {localStorage.getItem("nickname") !== null ? (
          <p className="font-color" style={{ color: "#606060" }}>
            {localStorage.getItem("nickname")}님 환영합니다!
          </p>
        ) : (
          <p className="font-color" style={{ color: "#606060" }}>
            환영합니다!
          </p>
        )}
      </button>

      <br />
      <br />
      <button onClick={localStorageClear} className="signature-oval">
        로그아웃
      </button>
    </div>
  );
};

export default SignIn;
