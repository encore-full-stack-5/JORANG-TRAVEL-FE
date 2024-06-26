import React, { useEffect, useState } from "react";
import jorangImage from "./../image/jorangImage.png";
import ChatSignatureColorOval from "./ChatSignatureColorOval copy";
import ChatSignatureOval from "./ChatSignatureOval copy";
import { getChatbotPlace } from "../config/chatbotApi";

import searchImage from "./../image/searchImage.png";
import Loading from "./Loading";

const Chatbot = () => {
  const [continent, setContinent] = useState("");
  const [tripStyle, setTripStyle] = useState("");
  const [showPlace1Message, setShowPlace1Message] = useState(false);
  const [showPlace2Message, setShowPlace2Message] = useState(false);
  const [placeResult, setPlaceResult] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 여행지 추천
  const getPlaceApi = async () => {
    setLoading(true);
    try {
      console.log(continent, tripStyle);
      const response = await getChatbotPlace({
        continent: continent,
        style: tripStyle,
      });
      setLoading(false);
      console.log(response);
      const temp = response.replaceAll("**", "");
      setPlaceResult(temp);
    } catch (error) {
      console.log("Error in getPlaceApi", error);
      setLoading(false);
    }
  };

  // 여행지 추천 질문(1)
  const showPlace1Question = (e) => {
    console.log("showPlace1 들어옴");
    e.preventDefault();
    setShowPlace1Message(true);
  };

  const showPlace2Question = (e) => {
    e.preventDefault();
    if (continent === "") {
      console.log("showPlace2 들어옴");
      setContinent(message);
      console.log("continent", message);

      setShowPlace2Message(true);
    } else {
      console.log("showPlace2-continent 들어옴");
      setTripStyle(message);
      console.log("tripStyle", message);
    }
    setMessage("");
  };

  useEffect(() => {
    if (tripStyle !== "") {
      getPlaceApi();
    }
  }, [tripStyle]);

  return (
    <div>
      <div className="row-left-center-space ">
        <div>
          <img
            style={{ width: "50px", height: "50px" }}
            src={jorangImage}
          ></img>
        </div>
        <div>
          {/* <ChatSignatureColorOval content="hi! I'm chatbot"></ChatSignatureColorOval>
        <ChatSignatureOval content="hi! I'm user"></ChatSignatureOval> */}
          <button className="signature-oval">명소 추천</button>
          <button className="signature-oval" onClick={showPlace1Question}>
            여행지 추천
          </button>
          <button className="signature-oval" onClick={showPlace1Question}>
            여행 계획 추천
          </button>
        </div>
      </div>
      {showPlace1Message && (
        <div>
          <h1 className="trip-font-color">여행지 추천</h1>
          <p className="trip-font-color">
            가고 싶은 대륙 또는 나라를 입력하세요
          </p>
        </div>
      )}
      {continent !== "" ? (
        <div className="trip-font-color">{continent}</div>
      ) : (
        <div></div>
      )}

      {continent && (
        <div>
          <p className="trip-font-color">여행 스타일을 입력하세요</p>
        </div>
      )}
      {tripStyle !== "" ? (
        <div className="trip-font-color">{tripStyle}</div>
      ) : (
        <div></div>
      )}

      {loading ? (
        <Loading />
      ) : placeResult === "" ? (
        <div />
      ) : (
        <div className="trip-font-color">{placeResult}</div>
      )}
      <div className="row-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginTop: "0px" }}
        />
        <button
          className="rectangle"
          style={{
            height: "30px",
            width: "30px",
            margin: "10px",
          }}
          onClick={showPlace2Question}
        >
          <img
            width="18px"
            height="20px"
            style={{ margin: "0px" }}
            src={searchImage}
            alt="Search"
          />
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};

export default Chatbot;
