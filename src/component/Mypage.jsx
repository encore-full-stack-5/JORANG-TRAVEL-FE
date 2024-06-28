import React, { useEffect, useState } from "react";
import jorangImage from "./../image/jorangImage.png";
import SignatureColorOval from "./SignatureColorOval";
import SignatureOval from "./SignatureOval";
import {
  getDiaryByUserAndCountry,
  getExpenseDetailByUserAndCountry,
  getUserById,
  updateUser,
} from "../config/authApi";
import { useNavigate } from "react-router-dom";
import { getChatbotMypage } from "../config/chatbotApi";
import { getMyDiary } from "../config/postApi";
import Loading from "./Loading";

const Mypage = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isNicknameChanged, setIsNicknameChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [chatbotDiaries, setChatbotDiaries] = useState([]);
  const [chatbotResult, setChatbotResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiCheck, setAiCheck] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginId = localStorage.getItem("id");
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
    const getExpensesApi = async () => {
      try {
        const response = await getExpenseDetailByUserAndCountry();
        console.log(response);
        console.log(response.length);
        setExpenses(response);
      } catch {
        console.log("error in getExpensesApi");
      }
    };

    const getDiaryApi = async () => {
      try {
        const response = await getDiaryByUserAndCountry();
        console.log("=======" + response);
        console.log(response.length);
        setDiaries(response);
      } catch {
        console.log("error in getDiaryApi");
      }
    };

    checkLoginStatus();
    getExpensesApi();
    getDiaryApi();
    getMyDiaryApi();
  }, [navigate, isNicknameChanged, isPasswordChanged]);

  const updateUserPasswordApi = async (e) => {
    e.preventDefault();
    const getPassword = document.getElementById("changePassword").value;
    try {
      const response = await updateUser(
        localStorage.getItem("id"),
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
        localStorage.getItem("id"),
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

  const getMyDiaryApi = async () => {
    try {
      const response = await getMyDiary();
      setChatbotDiaries(response);
    } catch (error) {
      console.log("Error in getMyDiaryApi", error);
    }
  };

  const getChatbotMypageApi = async () => {
    if (!aiCheck) {
      setAiCheck(!aiCheck);
      setLoading(true);
      try {
        const response = await getChatbotMypage({
          diaries: chatbotDiaries,
        });
        console.log(response);
        setChatbotResult(response.replaceAll("**", "\n"));
        setLoading(false);
      } catch (error) {
        console.log("Error in getPlaceApi", error);
        setLoading(false);
      }
    } else {
      setAiCheck(!aiCheck);
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

        <div>
          <br />
          <br />
          <br />
          <button
            className="signature-oval"
            style={{ height: "40px", width: "180px" }}
            onClick={getChatbotMypageApi}
          >
            AI 맞춤 여행 계획
          </button>
          {aiCheck ? (
            <div>
              {loading ? (
                <div style={{ width: "30px", height: "30px" }}>
                  <Loading />
                </div>
              ) : chatbotResult === "" ? (
                <div />
              ) : (
                <div className="trip-font-color">{chatbotResult}</div>
              )}
            </div>
          ) : (
            <div />
          )}
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
          <SignatureColorOval
            content={`지금까지 총 ${diaries.length}개의 나라를 여행했습니다`}
          ></SignatureColorOval>

          <div
            className="row-center-space"
            style={{
              width: "450px",
              marginTop: "20px",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {diaries.map((diary, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 calc(33.333% - 20px)",
                  marginBottom: "20px",
                }}
              >
                <SignatureOval content={diary}></SignatureOval>
              </div>
            ))}
          </div>
        </div>
        <div className="vertical-center" style={{ margin: "20px" }}>
          <SignatureColorOval
            className="sign-up"
            content="총 지출 금액"
          ></SignatureColorOval>
          <br />
          {expenses.map((expense, index) => (
            <div key={index} className="row-center-space">
              <SignatureOval
                style={{ marginBottom: "20px" }}
                content={expense.country}
              ></SignatureOval>
              <p
                className="font-color"
                style={{ marginBottom: "30px", fontSize: "20px" }}
              >
                ₩ {expense.cost}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
