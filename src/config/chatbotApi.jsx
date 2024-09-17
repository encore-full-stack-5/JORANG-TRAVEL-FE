import { chatApi } from "./chatbotNetwork";

export const getChatbotPlace = async (data) => {
  try {
    const res = await chatApi(`http://localhost:8000/place`, "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in getPlaceApi", error);
  }
};

export const getChatbotLandmark = async (data) => {
  try {
    const res = await chatApi(`http://localhost:8000/landmark`, "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in getChatbotLandmark", error);
  }
};

export const getChatbotPlan = async (data) => {
  try {
    const res = await chatApi(`http://localhost:8000/plan`, "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in getChatbotPlan", error);
  }
};

export const getChatbotMypage = async (data) => {
  try {
    const res = await chatApi(`http://localhost:8000/my-style`, "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in getChatbotMypage", error);
  }
};
