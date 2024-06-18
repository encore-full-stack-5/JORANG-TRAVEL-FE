import React, { useEffect, useState } from "react";
import jorangImage from "./../image/jorangImage.png";
import SignatureColorOval from "./SignatureColorOval";
import SignatureOval from "./SignatureOval";
import { getUserById, updateUser } from "../config/authApi";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isNicknameChanged, setIsNicknameChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginId = localStorage.getItem("loginId");
      if (loginId) {
        setIsLoggedIn(true);
        try {
          const response = await getUserById(loginId);
          setNickname(response.nickname);
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        setIsLoggedIn(false);
        alert("로그인이 되어 있지 않습니다. 로그인 페이지로 이동합니다.");
        navigate("/signin");
      }
    };

    checkLoginStatus();
  }, [navigate, isNicknameChanged, isPasswordChanged]);

  const updateUserPasswordApi = async (e) => {
    e.preventDefault();
    const getPassword = document.getElementById("changePassword").value;
    try {
      const response = await updateUser(
        localStorage.getItem("loginId"),
        { value: getPassword },
        "password"
      );
      console.log(response);
      setPassword(getPassword);
      setIsPasswordChanged(true);
      alert("비밀번호 변경 성공");
    } catch {
      console.log("error in signUp");
    }
  };

  const updateUserNicknameApi = async (e) => {
    e.preventDefault();
    const getNickname = document.getElementById("changeNickname").value;
    try {
      const response = await updateUser(
        localStorage.getItem("loginId"),
        { value: getNickname },
        "nickname"
      );
      console.log(response);
      setNickname(getNickname);
      setIsNicknameChanged(true);
    } catch {
      console.log("error in signUp");
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div style={{ display: "flex" }}>
      <div className="sign-up" style={{ margin: "70px", width: "50%" }}>
        <p
          className="font-color"
          style={{ marginBottom: "50px", fontSize: "20px" }}
        >
          프로필 정보
        </p>

        <p className="font-color">닉네임 변경</p>
        <div className="row-center">
          <input
            type="text"
            id="changeNickname"
            // value={nickname}
            style={{ height: "15px", width: "200px", borderRadius: "10px" }}
          ></input>
          <button
            type="submit"
            className="change-button"
            onClick={updateUserNicknameApi}
          >
            <p
              className="font-color"
              style={{ color: "#606060", fontSize: "15px" }}
            >
              변경
            </p>
          </button>
        </div>

        <div className="sign-up">
          <p className="font-color">비밀번호 변경</p>
          <div className="row-center">
            <input
              type="password"
              id="changePassword"
              style={{ height: "15px", width: "200px", borderRadius: "10px" }}
            />
            <button
              type="submit"
              className="change-button"
              onClick={updateUserPasswordApi}
            >
              <p
                className="font-color"
                style={{ color: "#606060", fontSize: "15px" }}
              >
                변경
              </p>
            </button>
          </div>
        </div>
      </div>
      <div style={{ margin: "45px", width: "50%" }}>
        <div style={{ display: "flex", margin: "20px" }}>
          <img
            style={{ width: "50px", height: "50px" }}
            src={jorangImage}
          ></img>
          <p
            className="font-color"
            style={{ marginBottom: "30px", fontSize: "20px" }}
          >
            {nickname} 님의 여행들
          </p>
        </div>

        <div className="vertical-center" style={{ margin: "20px" }}>
          <SignatureColorOval content="지금까지 총 3개의 나라를 여행했습니다"></SignatureColorOval>
          <div className="row-center-space" style={{ marginTop: "20px" }}>
            <SignatureOval content="중국"></SignatureOval>
            <SignatureOval content="일본"></SignatureOval>
            <SignatureOval content="노르웨이"></SignatureOval>
          </div>
        </div>

        <div className="vertical-center" style={{ margin: "20px" }}>
          <SignatureColorOval content="지금까지 총 3개의 나라를 여행했습니다"></SignatureColorOval>

          <div style={{ marginTop: "20px" }}>
            <div className="row-center-space">
              <SignatureOval
                style={{ marginBottom: "20px" }}
                content="중국"
              ></SignatureOval>
              <p
                className="font-color"
                style={{ marginBottom: "30px", fontSize: "20px" }}
              >
                ₩ 900000
              </p>
            </div>

            <div className="row-center-space">
              <SignatureOval
                style={{ marginBottom: "20px" }}
                content="일본"
              ></SignatureOval>
              <p
                className="font-color"
                style={{ marginBottom: "30px", fontSize: "20px" }}
              >
                ₩ 900000
              </p>
            </div>
            <div className="row-center-space">
              <SignatureOval
                style={{ marginBottom: "20px" }}
                content="노르웨이"
              ></SignatureOval>
              <p
                className="font-color"
                style={{ marginBottom: "30px", fontSize: "20px" }}
              >
                ₩ 900000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
