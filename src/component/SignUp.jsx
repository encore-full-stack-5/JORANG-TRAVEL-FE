import React from "react";
import jorangImage from "./../image/jorangImage.png";

const SignUp = () => {
  return (
    <div className="center-right">
      <div className="sign-up">
        <p className="font-color">이름</p>
        <input
          type="text"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <p className="font-color">아이디</p>
        <input
          type="text"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <p className="font-color">비밀번호 입력</p>
        <input
          type="password"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <p className="font-color">비밀번호 재입력</p>
        <input
          type="password"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <p className="font-color">닉네임</p>
        <input
          type="text"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
        <p className="font-color">이메일</p>
        <input
          type="text"
          style={{ height: "20px", width: "320px", borderRadius: "10px" }}
        />
      </div>

      <button className="rectangle" style={{ width: "150px" }}>
        <p className="font-color" style={{ color: "#606060" }}>
          회원가입
        </p>
      </button>
    </div>
  );
};

export default SignUp;
