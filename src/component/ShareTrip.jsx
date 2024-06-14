import React, { useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import jorangImage from "./../image/jorangImage.png";
import searchImage from "./../image/searchImage.png";

const ShareTrip = () => {
  const [click, setClick] = useState(false);

  const countryInfo =
    "노르웨이의 국기는 1821년에 프레드리크 멜체르(Fredrik Meltzer)가 디자인한 것이다. ..."; // 생략

  return (
    <div>
      <div
        style={{
          marginTop: "50px",
          position: "relative",
          width: "1000px",
          height: "30%",
        }}
      >
        <div
          className="image-container" // 이미지를 감싸는 div에 적용할 클래스
          onClick={() => setClick(!click)} // 클릭 시 click 상태 변경
        >
          <img src={Norway} alt="Norway" />
          {click && ( // click이 true일 때만 텍스트를 표시
            <div className="overlay">
              <p>{countryInfo}</p>
            </div>
          )}
        </div>
      </div>

      <div className="trip-text-display">
        <div className="row-center-space" style={{ alignItems: "baseline" }}>
          <p className="trip-font-color">노르웨이 여행일지</p>
          <p
            className="trip-font-color"
            style={{ paddingLeft: "5px", fontSize: "14px" }}
          >
            더보기
          </p>
        </div>
      </div>

      <div className="trip-image-display" style={{ marginTop: "20px" }}>
        <ImageText
          src={Norway}
          content="안녕하세요hihihihihihihihihihihi"
        ></ImageText>
        <ImageText
          src={jorangImage}
          content="hihihihihihihihihihihi반갑습니다"
        ></ImageText>
        <ImageText
          src={Norway}
          content="안녕하세요hihihihihihihihihihihi"
        ></ImageText>
        <ImageText
          src={jorangImage}
          content="hihihihihihihihihihihi반갑습니다"
        ></ImageText>
        <ImageText
          src={searchImage}
          content="안녕하세요hihihihihihihihihihihi"
        ></ImageText>
      </div>
    </div>
  );
};

export default ShareTrip;
