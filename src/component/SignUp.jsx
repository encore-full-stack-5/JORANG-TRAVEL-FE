import React, { useEffect, useState } from "react";
import {
  getUserByEmail,
  getUserByLoginId,
  postSignUp,
} from "../config/authApi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginIdChecked, setIsLoginIdChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      alert("이미 로그인된 상태입니다. 로그인 페이지로 이동합니다.");
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);

  const signUpFunc = async (e) => {
    console.log("signUpFunc들어옴");
    e.preventDefault();
    const getName = document.getElementById("name").value;
    const getLoginId = document.getElementById("loginId").value;
    const getPassword = document.getElementById("password").value;
    const getRepassword = document.getElementById("repassword").value;
    const getNickname = document.getElementById("nickname").value;
    const getEmail = document.getElementById("email").value;
    const getBirthday = document.getElementById("birthday").value;
    console.log(
      getName,
      getLoginId,
      getPassword,
      getNickname,
      getEmail,
      getBirthday
    );
    console.log("getName" + getName === null);

    if (
      !(
        getName &&
        getLoginId &&
        getPassword &&
        getRepassword &&
        getNickname &&
        getEmail &&
        getBirthday
      )
    ) {
      alert("모든 입력창에 정보를 입력해주세요.");
      return;
    }

    if (getEmail !== email) {
      setEmail("");
      alert("이메일 사용 가능 버튼을 다시 눌러주세요.");
      return;
    }

    if (getLoginId !== loginId) {
      setLoginId("");
      alert("이메일 사용 가능 버튼을 다시 눌러주세요.");
      return;
    }

    if (getPassword !== getRepassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isLoginIdChecked || !isEmailChecked) {
      alert("아이디 또는 이메일 사용 가능 버튼을 눌러주세요.");
      return;
    }

    try {
      const response = await postSignUp({
        loginId: getLoginId,
        name: getName,
        nickname: getNickname,
        password: getPassword,
        dateOfBirth: getBirthday,
        email: getEmail,
      });
      console.log(response);
      alert("회원가입 완료");
      navigate("/signin");
    } catch {
      console.log("error in signUp");
      alert("회원가입 실패");
      window.location.reload();
    }
  };

  const checkLoginId = async (e) => {
    e.preventDefault();
    const loginId = document.getElementById("loginId").value;
    try {
      const response = await getUserByLoginId(loginId);
      console.log(response);
      if (response === "possible") {
        alert("사용 가능한 아이디입니다.");
        setIsLoginIdChecked(true);
        setLoginId(loginId);
      } else {
        alert("존재하는 아이디입니다. 다시 입력하세요.");
      }
    } catch {
      console.log("error in checkLoginId");
    }
  };

  const checkEmail = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    try {
      const response = await getUserByEmail(email);
      console.log(response);

      if (response === "possible") {
        alert("사용 가능한 이메일입니다.");
        setIsEmailChecked(true);
        setEmail(email);
      } else {
        alert("존재하는 이메일입니다. 다시 입력하세요.");
      }
    } catch {
      console.log("error in checkEmail");
    }
  };

  if (isLoggedIn) {
    return null; // 이미 로그인된 상태라면 아무것도 렌더링하지 않음
  }

  return (
    <div className="center-right">
      <div className="sign-up">
        <p className="font-color">이름</p>
        <input
          type="text"
          id="name"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <p className="font-color">아이디</p>
        <input
          type="text"
          id="loginId"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />

        <button
          type="submit"
          className="rectangle"
          style={{ width: "100px" }}
          onClick={checkLoginId}
        >
          <p className="font-color" style={{ color: "#606060" }}>
            사용 가능
          </p>
        </button>

        <p className="font-color">비밀번호 입력</p>
        <input
          type="password"
          id="password"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <p className="font-color">비밀번호 재입력</p>
        <input
          type="password"
          id="repassword"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <p className="font-color">닉네임</p>
        <input
          type="text"
          id="nickname"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <p className="font-color">이메일</p>
        <input
          type="email"
          id="email"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <button
          type="submit"
          className="rectangle"
          style={{ width: "100px" }}
          onClick={checkEmail}
        >
          <p className="font-color" style={{ color: "#606060" }}>
            사용 가능
          </p>
        </button>
        <p className="font-color">생일</p>
        <input
          type="date"
          id="birthday"
          defaultValue=""
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
      </div>

      <button
        type="submit"
        className="rectangle"
        style={{ width: "150px" }}
        onClick={signUpFunc}
      >
        <p className="font-color" style={{ color: "#606060" }}>
          회원가입
        </p>
      </button>
    </div>
  );
};

export default SignUp;
