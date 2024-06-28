import React, { useEffect, useRef, useState } from "react";
import jorangImage from "./../image/jorangImage.png";
import { Link, Outlet } from "react-router-dom";

const Chatbot = () => {
  return (
    <div>
      <div className="row-left-center-space">
        <div>
          <img
            style={{ width: "50px", height: "50px" }}
            src={jorangImage}
          ></img>
        </div>

        <Link
          to="/chatbot/landmark-recommend"
          style={{ textDecoration: "none" }}
        >
          <button
            className="signature-oval"
            style={{ width: "130px", margin: "15px" }}
          >
            명소 추천
          </button>
        </Link>
        <Link to="/chatbot/place-recommend" style={{ textDecoration: "none" }}>
          <button
            className="signature-oval"
            style={{ width: "130px", margin: "15px" }}
          >
            여행지 추천
          </button>
        </Link>

        <Link to="/chatbot/plan-recommend" style={{ textDecoration: "none" }}>
          <button
            className="signature-oval"
            style={{ width: "130px", margin: "15px" }}
          >
            여행 계획 추천
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Chatbot;
