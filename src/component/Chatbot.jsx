import React, { useEffect, useRef, useState } from "react";
import jorangImage from "./../image/jorangImage.png";
import {
  getChatbotLandmark,
  getChatbotPlace,
  getChatbotPlan,
  getMyDiary,
} from "../config/chatbotApi";
import searchImage from "./../image/searchImage.png";
import Loading from "./Loading";

const Chatbot = () => {
  const [continent, setContinent] = useState("");
  const [tripStyle, setTripStyle] = useState("");
  const [landmark, setLandmark] = useState("");
  const [planPlace, setPlanPlace] = useState("");
  const [planDate, setPlanDate] = useState("");
  const [planWho, setPlanWho] = useState("");
  const [planStyle, setPlanStyle] = useState("");

  const [showPlace1Message, setShowPlace1Message] = useState(false);
  const [showPlace2Message, setShowPlace2Message] = useState(false);
  const [showLandmark1Message, setShowLandmark1Message] = useState(false);
  const [showPlan1Message, setShowPlan1Message] = useState(false);
  const [showPlan2Message, setShowPlan2Message] = useState(false);
  const [showPlan3Message, setShowPlan3Message] = useState(false);
  const [showPlan4Message, setShowPlan4Message] = useState(false);

  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeClick, setPlaceClick] = useState(false);
  const [landmarkClick, setLandmarkClick] = useState(false);
  const [planClick, setPlanClick] = useState(false);

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
      setResult(temp);
    } catch (error) {
      console.log("Error in getPlaceApi", error);
      setLoading(false);
    }
  };

  const getLandmarkApi = async () => {
    setLoading(true);
    try {
      const response = await getChatbotLandmark({
        place: landmark,
      });
      setLoading(false);
      console.log(response);
      const temp = response.replaceAll("**", "");
      setResult(temp);
    } catch (error) {
      console.log("Error in getPlaceApi", error);
      setLoading(false);
    }
  };

  const getPlanApi = async () => {
    console.log(planPlace, planDate, planWho, planStyle);
    setLoading(true);
    try {
      const response = await getChatbotPlan({
        place: planPlace,
        date: planDate,
        who: planWho,
        style: planStyle,
      });
      setLoading(false);
      console.log(response);
      const temp = response.replaceAll("**", "");
      setResult(temp);
    } catch (error) {
      console.log("Error in getPlanApi", error);
      setLoading(false);
    }
  };

  // 여행지 추천 질문(1)
  const showPlace1Question = (e) => {
    console.log("showPlace1 들어옴");
    e.preventDefault();
    setShowPlace1Message(true);
    setPlaceClick(true);
  };

  // 명소 추천 질문(1)
  const showLandmark1Question = (e) => {
    console.log("showLandmark1 들어옴");
    e.preventDefault();
    setShowLandmark1Message(true);
    setLandmarkClick(true);
  };

  // 여행 계획 추천 질문(1)
  const showPlan1Question = (e) => {
    console.log("showPlan1 들어옴");
    e.preventDefault();
    setShowPlan1Message(true);
    setPlanClick(true);
  };

  // 질문(2)
  const showResultQuestion = (e) => {
    e.preventDefault();
    if (placeClick && continent === "") {
      console.log("showPlace2 들어옴");
      setContinent(message);
      console.log("continent", message);
      setShowPlace2Message(true);
    } else if (placeClick) {
      console.log("showPlace2-continent 들어옴");
      setTripStyle(message);
      console.log("tripStyle", message);
    } else if (landmarkClick) {
      setLandmark(message);
    } else if (planClick && showPlan4Message) {
      setPlanStyle(message);
    } else if (planClick && showPlan3Message) {
      setPlanWho(message);
      setShowPlan4Message(true);
    } else if (planClick && showPlan2Message) {
      setPlanDate(message);
      setShowPlan3Message(true);
    } else if (planClick && showPlan1Message) {
      setPlanPlace(message);
      setShowPlan2Message(true);
    }
    setMessage("");
  };

  useEffect(() => {
    if (tripStyle !== "") {
      getPlaceApi();
    }
  }, [tripStyle]);

  useEffect(() => {
    if (landmark !== "") {
      getLandmarkApi();
    }
  }, [landmark]);

  useEffect(() => {
    if (planStyle !== "") {
      getPlanApi();
    }
  }, [planStyle]);

  return (
    <div>
      <div className="row-left-center-space">
        <div>
          <img
            style={{ width: "50px", height: "50px" }}
            src={jorangImage}
          ></img>
        </div>

        <button
          className="signature-oval"
          style={{ width: "130px", margin: "15px" }}
          onClick={showLandmark1Question}
        >
          명소 추천
        </button>
        <button
          className="signature-oval"
          style={{ width: "130px", margin: "15px" }}
          onClick={showPlace1Question}
        >
          여행지 추천
        </button>
        <button
          className="signature-oval"
          style={{ width: "130px", margin: "15px" }}
          onClick={showPlan1Question}
        >
          여행 계획 추천
        </button>
      </div>
      {placeClick ? (
        <div style={{ height: "55vh", overflow: "auto" }}>
          {showPlace1Message && (
            <div>
              {/* <h1 className="trip-font-color">여행지 추천</h1> */}
              <p className="chatbot-font">
                가고 싶은 대륙 또는 나라를 입력하세요
              </p>
            </div>
          )}
          {continent !== "" ? (
            <div className="chatbot-user-font">{continent}</div>
          ) : (
            <div></div>
          )}

          {continent && (
            <div>
              <p className="chatbot-font">여행 스타일을 입력하세요</p>
            </div>
          )}
          {tripStyle !== "" ? (
            <div className="chatbot-user-font">{tripStyle}</div>
          ) : (
            <div></div>
          )}

          {loading ? (
            <div>
              <Loading />
            </div>
          ) : result === "" ? (
            <div />
          ) : (
            <div className="chatbot-font">{result}</div>
          )}
        </div>
      ) : (
        <div></div>
      )}

      {landmarkClick ? (
        <div style={{ height: "55vh", overflow: "auto" }}>
          {showLandmark1Message && (
            <div>
              {/* <h1 className="trip-font-color">명소 및 음식 추천</h1> */}
              <p className="chatbot-font">
                명소 및 음식 추천을 받고 싶은 지역을 입력하세요
              </p>
            </div>
          )}
          {landmark !== "" ? (
            <div className="chatbot-user-font">{landmark}</div>
          ) : (
            <div></div>
          )}
          {loading ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div className="chatbot-font">{result}</div>
          )}
        </div>
      ) : (
        <div></div>
      )}

      {planClick ? (
        <div style={{ height: "55vh", overflow: "auto" }}>
          {showPlan1Message && (
            <div>
              {/* <h1 className="trip-font-color">여행 계획 추천</h1> */}
              <p className="chatbot-font">가고싶은 지역 및 나라를 입력하세요</p>
            </div>
          )}
          {planPlace !== "" ? (
            <div className="chatbot-user-font">{planPlace}</div>
          ) : (
            <div></div>
          )}

          {showPlan2Message && (
            <div>
              <p className="chatbot-font">원하는 날짜를 입력하세요</p>
            </div>
          )}
          {planDate !== "" ? (
            <div className="chatbot-user-font">{planDate}</div>
          ) : (
            <div></div>
          )}
          {showPlan3Message && (
            <div>
              <p className="chatbot-font">누구와 여행하는지 입력하세요</p>
            </div>
          )}
          {planWho !== "" ? (
            <div className="chatbot-user-font">{planWho}</div>
          ) : (
            <div></div>
          )}

          {showPlan4Message && (
            <div>
              <p className="chatbot-font">여행 스타일을 입력하세요</p>
            </div>
          )}
          {planStyle !== "" ? (
            <div className="chatbot-user-font">{planStyle}</div>
          ) : (
            <div></div>
          )}

          {loading ? (
            <div>
              <Loading />
            </div>
          ) : result === "" ? (
            <div />
          ) : (
            <div className="chatbot-font">{result}</div>
          )}
        </div>
      ) : (
        <div></div>
      )}

      <div className="chatbot-button">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginTop: "0px", width: "70vw" }}
        />
        <button
          className="rectangle"
          style={{
            height: "30px",
            width: "30px",
            margin: "10px",
          }}
          onClick={showResultQuestion}
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
    </div>
  );
};

export default Chatbot;
