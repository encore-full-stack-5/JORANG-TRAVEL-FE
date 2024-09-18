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

export const getLikedPostsByUserApi = async () => {
  try {
    const res = await api(`/api/v1/likes/posts/user`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getLikedPostsByUserApi", error);
    return [];
  }
};

export const getPostByUser = async () => {
  try {
    const res = await api(`/api/v1/posts/user`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getPostByUser", error);
    return [];
  }
};

export const getMyPublishedPostApi = async () => {
  try {
    const res = await api(`/api/v1/posts/my-published`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getPublishedPost", error);
    return [];
  }
};

export const getChartData = async (postId) => {
  try {
    const res = await api(
      `/api/v1/expense-details/chart/postId/${postId}`,
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

export const getMyPublishedPostsByPageApi = async (pageNumber) => {
  try {
    const res = await api(
      `/api/v1/posts/my-published/page?page=${pageNumber}`,
      "get"
    );
    return res.data;
  } catch (error) {
    console.error("Error in getMyPublishedPostsByPageApi", error);
  }
};

export const getMyLikePostByPageApi = async (pageNumber) => {
  try {
    const res = await api(
      `/api/v1/likes/posts/user/page?page=${pageNumber}`,
      "get"
    );
    return res.data;
  } catch (error) {
    console.error("Error in getMyLikePostByPageApi", error);
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

export const createPost = async (body) => {
  try {
    const res = await api("/api/v1/posts", "post", body);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error in createPost", error);
  }
};

export const createTempPost = async (body) => {
  try {
    const res = await api("/api/v1/posts/temp", "post", body);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error in createTempPost", error);
  }
};

export const updateTempPost = async (id, body) => {
  try {
    const res = await api(`/api/v1/posts/${id}/temp`, "put", body);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error in updateTempPost", error);
  }
};

export const updatePostById = async (id, updatePostDto) => {
  try {
    const res = await api(`/api/v1/posts/${id}`, "put", updatePostDto);
    return res.data;
  } catch (error) {
    console.error("Error in updatePostById", error);
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

export const getMyUnpublishedPosts = async () => {
  try {
    const res = await api(`/api/v1/posts/my-unpublished`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getMyUnpublishedPosts", error);
    return [];
  }
};

export const getMyUnpublishedPostsPerPageApi = async (pageNumber) => {
  try {
    const res = await api("/api/v1/posts/my-unpublished/page", "get", null, {
      page: pageNumber,
    });
    return res.data;
  } catch (error) {
    console.error("Error in getMyUnpublishedPostsPerPageApi", error);
    return [];
  }
};

export const getMyTotalCostPerCountryApi = async () => {
  try {
    const res = await api("/api/v1/posts/my/total-cost", "get");
    return res.data;
  } catch (error) {
    console.error("Error in getMyTotalCostPerCountryApi", error);
  }
};

export const getPostsByKeywordApi = async (keyword) => {
  try {
    const res = await api("/api/v1/posts/search", "get", null, {
      keyword: keyword,
    });
    return res.data;
  } catch (error) {
    console.error("Error in getPostsByKeywordApi", error);
  }
};
