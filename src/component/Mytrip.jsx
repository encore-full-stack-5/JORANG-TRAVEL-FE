import React, { useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import jorangImage from "./../image/jorangImage.png";
import searchImage from "./../image/searchImage.png";

const Mytrip = () => {
  return (
    <div>
      <div className="trip-text-display">
        <p className="trip-font-color">여행기</p>
      </div>

      <div
        className="trip-image-display"
        style={{
          marginTop: "20px",
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
    </div>
  );
};

export default Mytrip;
