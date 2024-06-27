import React from "react";
import { findLoginId, getUserByEmail } from "../config/authApi";
const FindLoginId = () => {
  const findLoginIdFunc = async (e) => {
    e.preventDefault();
    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;

    if (!(getName && getEmail)) {
      alert("모든 입력창에 정보를 입력해주세요.");
      return;
    }

    try {
      const response = await getUserByEmail(getEmail);
      console.log(response);
      if (response === "possible") {
        alert("존재하지 않는 이메일입니다. 다시 입력하세요.");
        return;
      }
    } catch {
      console.log("error in checkEmail");
    }

    try {
      console.log(getName, getEmail);
      const response = await findLoginId({
        name: getName,
        email: getEmail,
      });
      console.log(response);
      alert("이메일 전송 완료");
    } catch {
      console.log("error in findLoginId");
      alert("이메일 전송 실패");
    }
  };
  return (
    <div className="login">
      <div className="sign-up">
        <p className="font-color">이름</p>
        <input
          type="text"
          id="name"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <p className="font-color">이메일</p>
        <input
          type="text"
          id="email"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
      </div>

      <button
        type="submit"
        className="rectangle"
        style={{ width: "150px" }}
        onClick={findLoginIdFunc}
      >
        <p className="font-color" style={{ color: "#606060" }}>
          ID 찾기
        </p>
      </button>
    </div>
  );
};

export default FindLoginId;
