import React from "react";
const ImageText = (props) => {
  return (
    <div>
      <div className="image-text-box">
        <div className="image-container">
          <img src={props.src} alt="description" />
        </div>
        <div className="text-container">
          <p style={{ color: "#606060" }}>{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageText;
