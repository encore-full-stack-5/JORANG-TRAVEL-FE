import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { getChatbotLandmark } from "../config/chatbotApi";
import searchImage from "./../image/searchImage.png";
const Landmark = () => {
  const [landmark, setLandmark] = useState("");

  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const showResultQuestion = (e) => {
    e.preventDefault();
    setLandmark(message);
    setMessage("");
  };

  useEffect(() => {
    if (landmark !== "") {
      getLandmarkApi();
    }
  }, [landmark]);

  return (
    <div>
      <h1 className="trip-font-color" style={{ paddingTop: "0px" }}>
        명소 및 음식 추천
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ height: "50vh", overflow: "auto", width: "68%" }}>
          <p className="chatbot-font">
            명소 및 음식 추천을 받고 싶은 지역을 입력하세요
          </p>
          {landmark !== "" && (
            <div className="chatbot-user-font">
              <div>{landmark}</div>
            </div>
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
export default Landmark;
