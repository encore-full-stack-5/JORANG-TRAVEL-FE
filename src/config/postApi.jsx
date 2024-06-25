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

export const likeComment = async (postId) => {
  try {
    const res = await api(`/api/v1/likes/posts/${postId}`, "post");
    return res.data;
  } catch (error) {
    console.error("Error in likeComment", error);
  }
};

export const getLikeCheck = async (postId) => {
  try {
    const res = await api(`/api/v1/likes/posts/${postId}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in likeCheck", error);
  }
};

export const getUserLikePosts = async () => {
  try {
    const res = await api(`/api/v1/likes/posts`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getUserLikePosts", error);
  }
};

export const getPostByUser = async () => {
  try {
    const res = await api(`api/v1/posts/user`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getPostByUser", error);
  }
};

export const getExpenseDetailById = async (id) => {
  try {
    const res = await api ('/api/v1/expenseDetail/${id}',"get");
    return res.data;
  }catch (error) {
    console.error("getExpenseDetailById에서 오류 발생", error);
  }
};
export const getExpenseDetailsByExpenseId = async (expenseId) => {
  try {
    const response = await api(`/api/v1/expense-details/expense/${expenseId}`, "get");
    return response.data;  
  } catch (error) {
    console.error("Error fetching expense details", error);
  }
};
// postApi.js
// export const getExpenseDetailsByPostId = async (postId) => {
//   try {
//     const response = await api(`/api/v1/expense-details/by-post/${postId}`, "get");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching expense details by post ID", error);
//   }
// };

export const getExpenseDetailsByPostId = async (postId) => {
  try {
    const response = await api(`/api/v1/expense-details/by-post/${postId}`, "get");
    return response.data;
  } catch (error) {
    console.error("게시물 ID로 경비 세부 정보 가져오기 오류:", error);
  }
};
// postApi.js
export const getExpensesByPostId = async (postId) => {
  try {
    const response = await api(`/api/v1/expenses/by-post/${postId}`, "get");
    return response.data;
  } catch (error) {
    console.error("게시물 ID로 경비 정보 가져오기 오류:", error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};

