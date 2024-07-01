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
    const res = await api(`/api/v1/posts/public/${id}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getPostById", error);
  }
};

export const getMyPostById = async (id) => {
  try {
    const res = await api(`/api/v1/posts/my/${id}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getMyPostById", error);
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
<<<<<<< HEAD
      `/api/v1/expense-details/postId/${postId}/chart`,
=======
      `/api/v1/expenseDetail/chart/postId/${postId}`,
>>>>>>> 496284b05d81570404daef4942c33d47e4084e25
      "get"
    );
    return res.data;
  } catch (error) {
    console.error("Error in getChartData", error);
  }
};

export const getExpenseDetailsByPostId = async (postId) => {
  try {
    const response = await api(
      `/api/v1/expense-details/by-post/${postId}`,
      "get"
    );
    return response.data;
  } catch (error) {
    console.error("게시물 ID로 경비 세부 정보 가져오기 오류", error);
  }
};
// export const getById = async (id) => {
//   try {
//     const response = await api(`/api/v1/posts/${id}`, "get");
//     return response.data;
//   } catch (error) {
//     console.error("포스트id로 포스트 다 가져오기 오류", error);
//   }
// };

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

export const getMyDiary = async () => {
  try {
    const res = await api(`/api/v1/diaries/mydiary`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getMyDiary", error);
  }
};

export const savePost = async () => {
  try {
    const res = await api("/api/v1/posts", "post");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error in savePost", error);
  }
};

export const updatePost = async (id, updatePostDto) => {
  try {
    const res = await api(`/api/v1/posts/${id}`, "put", updatePostDto);
    return res.data;
  } catch (error) {
    console.error("Error in savePost", error);
  }
};

export const getCountryInfo = async (countryName) => {
  try {
    const res = await api(`/api/v1/country/info/${countryName}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getCountryInfo", error);
  }
};

export const getUnpublishedPosts = async () => {
  try {
    const res = await api(`/api/v1/posts/unpublished`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getUnpublishedPosts", error);
  }
};