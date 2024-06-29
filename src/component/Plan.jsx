import React, { useEffect, useState } from "react";
import searchImage from "./../image/searchImage.png";
import { getChatbotPlan } from "../config/chatbotApi";
import Loading from "./Loading";
const Plan = () => {
  const [planPlace, setPlanPlace] = useState("");
  const [planDate, setPlanDate] = useState("");
  const [planWho, setPlanWho] = useState("");
  const [planStyle, setPlanStyle] = useState("");

  const [showPlan2Message, setShowPlan2Message] = useState(false);
  const [showPlan3Message, setShowPlan3Message] = useState(false);
  const [showPlan4Message, setShowPlan4Message] = useState(false);

  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  // 질문
  const showResultQuestion = (e) => {
    e.preventDefault();
    if (showPlan4Message) {
      setPlanStyle(message);
    } else if (showPlan3Message) {
      setPlanWho(message);
      setShowPlan4Message(true);
    } else if (showPlan2Message) {
      setPlanDate(message);
      setShowPlan3Message(true);
    } else {
      setPlanPlace(message);
      setShowPlan2Message(true);
    }
    setMessage("");
  };

  useEffect(() => {
    if (planStyle !== "") {
      getPlanApi();
    }
  }, [planStyle]);

  return (
    <div>
      <h1 className="trip-font-color" style={{ paddingTop: "0px" }}>
        여행 계획 추천
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ height: "50vh", overflow: "auto", width: "68%" }}>
          <p className="chatbot-font">가고싶은 지역 및 나라를 입력하세요</p>

          {planPlace !== "" ? (
            <div className="chatbot-user-font">
              <div>{planPlace}</div>
            </div>
          ) : (
            <div></div>
          )}

          {showPlan2Message && (
            <div>
              <p className="chatbot-font">원하는 날짜를 입력하세요</p>
            </div>
          )}
          {planDate !== "" ? (
            <div className="chatbot-user-font">
              <div>{planDate}</div>
            </div>
          ) : (
            <div></div>
          )}
          {showPlan3Message && (
            <div>
              <p className="chatbot-font">누구와 여행하는지 입력하세요</p>
            </div>
          )}
          {planWho !== "" ? (
            <div className="chatbot-user-font">
              <div>{planWho}</div>
            </div>
          ) : (
            <div></div>
          )}

          {showPlan4Message && (
            <div>
              <p className="chatbot-font">여행 스타일을 입력하세요</p>
            </div>
          )}
          {planStyle !== "" ? (
            <div className="chatbot-user-font">
              <div>{planStyle}</div>
            </div>
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
      </div>
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
export default Plan;
