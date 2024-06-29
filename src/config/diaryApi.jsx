import { api } from "./network";

export const saveDiary = async (postId) => {
    try {
      const res = await api(`/api/v1/diaries/posts/${postId}`, "post")
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("Error in saveDiary", error)
    }
  }
  
  export const updateDiary = async (id, diaryContents) => {

    try {
      const res = await api(`/api/v1/diaries/${id}`, "put", diaryContents);
      return res.data;
    } catch (error) {
      console.log("Error in updateDiary", error)
    }
  }

  export const deleteDiary = async (id) => {
    try {
      const res = await api(`/api/v1/diaries/${id}`, "delete");
    } catch (error) {
      console.log("Error in deleteDiary", error)
    }
  }
  
  