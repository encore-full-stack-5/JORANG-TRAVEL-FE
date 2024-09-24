import { api } from "./network";

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

export const updateTempPostApi = async (id, body) => {
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

// 나라별 최신순 post 가져오기
export const getRecentPostsByCountry = async (country) => {
  const res = await api("/api/v1/posts/recent/diaries", "get", null, {
    country: country,
  });
  return res.data;
};

// 최신순 post 가져오기
export const getRecentPostsFirst = async () => {
  const res = await api("/api/v1/posts/recent", "get");
  return res.data;
};

export const getTop5RecentPosts = async () => {
  const res = await api("/api/v1/posts/top5/recent", "get");
  return res.data;
};

// 이번주 좋아요 순 post top5 가져오기
export const getTopLikePostsFirst = async () => {
  const res = await api("/api/v1/posts/top5/like", "get");
  return res.data;
};

export const getRecent5PostsByCountry = async (country) => {
  const res = await api("/api/v1/posts/top5/diaries", "get", null, {
    country: country,
  });
  return res.data;
};

// 내가 여행한 나라 갯수 @마이페이지
export const getNumberOfCountriesVisited = async () => {
  const res = await api("/api/v1/posts/my-countries", "get");
  return res.data;
};

export const deleteById = async (id) => {
  await api(`/api/v1/posts/${id}`, "delete");
};
