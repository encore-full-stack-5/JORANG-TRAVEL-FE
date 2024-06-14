import React from "react";
const ImageText = (props) => {
  return (
    <div className="image-text-box">
      <div className="image-container">
        <img src={props.src} alt="description" />
      </div>
      <div className="text-container">
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default ImageText;
