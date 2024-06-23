import { api } from "./network";
export const getDiaryAllByPostId = async (id) => {
  try {
    const res = await api(`/api/v1/diaries/posts/${id}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getAllByPostId", error);
  }
};

export const getPostById = async (id) => {
  try {
    const res = await api(`/api/v1/posts/${id}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getPostById", error);
  }
};

export const getExpenseDetailById = async (id) => {
  try {
    const res = await api ('/api/v1/expenseDetail/${id}',"get");
    return res.data;
  }catch (error) {
    console.error("getExpenseDetailById에서 오류 발생", error);
  }
}
