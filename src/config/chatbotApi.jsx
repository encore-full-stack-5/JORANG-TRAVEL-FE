import { chatApi } from "./chatbotNetwork";

export const getChatbotPlace = async (data) => {
  try {
    const res = await chatApi(`http://localhost:8002/place`, "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in getPlaceApi", error);
  }
};

export const getChatbotLandmark = async (data) => {
  try {
    const res = await chatApi(`http://localhost:8003/landmark`, "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in getChatbotLandmark", error);
  }
};
