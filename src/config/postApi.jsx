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

export const getChartData = async (postId) => {
  try {
    const res = await api(
      `/api/v1/expenseDetail/postId/${postId}/chart`,
      "get"
    );
    return res.data;
  } catch (error) {
    console.error("Error in getChartData", error);
  }
};



export const getExpenseDetailsByPostId = async (postId) => {
  try {
    const response = await api(`/api/v1/expense-details/by-post/${postId}`, "get");
    return response.data;
  } catch (error) {
    console.error("게시물 ID로 경비 세부 정보 가져오기 오류", error);
   
  }
};
export const getById = async(id) => {
  try{
    const response = await api(`/api/v1/posts/${id}`,"get");
    return response.data;
  }catch (error) {
    console.error("포스트id로 포스트 다 가져오기 오류", error);
  }
}
export const postListByUser = async (pageNumber) => {
  try {
    const res = await api(`/api/v1/posts/user/list?page=${pageNumber}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getPostList", error);
  }
};

export const postLikeListByUser = async (pageNumber) => {
  try {
    const res = await api(`/api/v1/likes/user/list?page=${pageNumber}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in postLikeListByUser", error);

  }
};
