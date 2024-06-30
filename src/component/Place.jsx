import React, { useEffect, useState } from "react";
import { getChatbotPlace } from "../config/chatbotApi";
import searchImage from "./../image/searchImage.png";
import Loading from "./Loading";
console.log(Loading);
const Place = () => {
  const [continent, setContinent] = useState("");
  const [tripStyle, setTripStyle] = useState("");

  const [result, setResult] = useState("");
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
      setResult(temp);
    } catch (error) {
      console.log("Error in getPlaceApi", error);
      setLoading(false);
    }
  };

  // 질문
  const showResultQuestion = (e) => {
    console.log("showResult 들어옴");
    e.preventDefault();
    if (continent === "") {
      console.log("showPlace2 들어옴");
      setContinent(message);
      console.log("continent", message);
      // setShowPlace2Message(true);
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
      <h1 className="trip-font-color" style={{ paddingTop: "0px" }}>
        여행지 추천
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ height: "50vh", overflow: "auto", width: "68%" }}>
          <p className="chatbot-font">가고 싶은 대륙 또는 나라를 입력하세요</p>
          {continent !== "" ? (
            <div className="chatbot-user-font">
              <div>{continent}</div>
            </div>
          ) : (
            <div></div>
          )}

          {continent && (
            <div>
              <p className="chatbot-font">여행 스타일을 입력하세요</p>
            </div>
          )}

          {tripStyle !== "" ? (
            <div className="chatbot-user-font">
              <div>{tripStyle}</div>
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
export default Place;
