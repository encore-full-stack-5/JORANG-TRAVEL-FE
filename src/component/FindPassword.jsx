import React from "react";
import { findLoginId, findPassword, getUserByLoginId } from "../config/authApi";
const FindPassword = () => {
  const FindPasswordFunc = async (e) => {
    e.preventDefault();
    const getLoginId = document.getElementById("loginId").value;
    if (!getLoginId) {
      alert("모든 입력창에 정보를 입력해주세요.");
      return;
    }
    try {
      const response = await getUserByLoginId(getLoginId);
      console.log(response);
      if (response === "possible") {
        alert("존재하지 않는 아이디입니다. 다시 입력하세요.");
        return;
      }
    } catch {
      console.log("error in checkLoginId");
    }

    try {
      console.log(getLoginId);
      const response = await findPassword({
        loginId: getLoginId,
      });
      console.log(response);
      alert("이메일 전송 완료");
    } catch {
      console.log("error in findPassword");
      alert("이메일 전송 실패");
    }
  };
  return (
    <div className="login">
      <div className="sign-up">
        <p className="font-color">아이디</p>
        <input
          type="text"
          id="loginId"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
      </div>

      <button
        type="submit"
        className="rectangle"
        style={{ width: "150px" }}
        onClick={FindPasswordFunc}
      >
        <p className="font-color" style={{ color: "#606060" }}>
          비밀번호 찾기
        </p>
      </button>
    </div>
  );
};

export default FindPassword;
