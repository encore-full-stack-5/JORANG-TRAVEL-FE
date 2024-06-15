import React, { useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import jorangImage from "./../image/jorangImage.png";
import filterImage from "./../image/filterImage.png";

const Mytrip = () => {
  return (
    <div>
      <div className="trip-text-display">
        <p className="trip-font-color">여행기</p>
      </div>

      <div className="row-left-center-space">
        <div
          className="trip-image-display"
          style={{
            justifyContent: "flex-start",
          }}
        >
          <ImageText
            src={Norway}
            content="안녕하세요hihihihihihihihihihihi"
          ></ImageText>
          <ImageText
            src={jorangImage}
            content="hihihihihihihihihihihi반갑습니다"
          ></ImageText>
        </div>
        <div
          className="signature-oval"
          style={{ width: "30px", height: "30px" }}
        >
          +
        </div>
      </div>

      <div className="trip-text-display">
        <p className="trip-font-color">찜한 여행기</p>
      </div>

      <div
        className="trip-image-display"
        style={{
          justifyContent: "flex-start",
        }}
      >
        <ImageText src={Norway} content="노르웨이 찜한 여행기1"></ImageText>
        <ImageText
          src={jorangImage}
          content="노르웨이 찜한 여행기2"
        ></ImageText>
      </div>
    </div>
  );
};

export default Mytrip;
