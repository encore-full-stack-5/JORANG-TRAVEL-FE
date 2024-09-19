import { api } from "./network";

// export const saveDiary = async (postId) => {
//   try {
//     const res = await api(`/api/v1/diaries/posts/${postId}`, "post");
//     console.log(res.data);
//     return res.data;
//   } catch (error) {
//     console.log("Error in saveDiary", error);
//   }
// };

export const createDiary = async (body) => {
  try {
    const res = await api("/api/v1/diaries", "post", body);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error in createDiary", error);
  }
};

export const updateDiary = async (diaryRequestDto) => {
  try {
    const res = await api(`/api/v1/diaries`, "put", diaryRequestDto);
    return res.data;
  } catch (error) {
    console.log("Error in updateDiary", error);
  }
};

export const deleteDiaryById = async (id) => {
  try {
    const res = await api(`/api/v1/diaries/${id}`, "delete");
  } catch (error) {
    console.log("Error in deleteDiary", error);
  }
};

export const getMyDiaryContentsApi = async (id) => {
  try {
    const res = await api(`/api/v1/diaries/chatbot`, "get");
    return res.data;
  } catch (error) {
    console.log("Error in getMyDiaryContentsApi", error);
  }
};
