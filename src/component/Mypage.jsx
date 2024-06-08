import React from "react";
import jorangImage from "./../image/jorangImage.png";
import SignatureColorOval from "./SignatureColorOval";
import SignatureOval from "./SignatureOval";

const Mypage = () => {
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
            style={{ height: "15px", width: "200px", borderRadius: "10px" }}
          />
          <button className="change-button">
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
              style={{ height: "15px", width: "200px", borderRadius: "10px" }}
            />
            <button className="change-button">
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
            고양이 사랑해 님의 여행들
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
