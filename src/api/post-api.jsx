import { api } from "../config/network";

// 모든 post 가져오기
export const getAllPosts = async () => {
  const res = await api("/api/v1/posts", "get");
  console.log(res.data);
  return res.data;
};

// 나라별 post 가져오기
export const getPostsByCountry = async (country) => {
  const res = await api("/api/v1/posts/diaries", "get", null, {
    country: country,
  });
  console.log(res.data.content);
  return res.data.content;
};

// 최신순 post 가져오기
export const getRecentPostsFirst = async () => {
  const res = await api("/api/v1/posts/recent-first", "get");
  console.log(res.data);
  return res.data;
};

// 이번주 좋아요 순 post 가져오기
export const getTopLikePostsFirst = async () => {
  const res = await api("/api/v1/posts/like-first", "get");
  console.log(res.data);
  return res.data;
};

// 이 기간의 여행기 post 가져오기
export const getPostsBetweenTheseDates = async (from, to) => {
  const res = await api("/api/v1/posts/diaries", "get", null, {
    from: from,
    to: to,
  });
  console.log(res.data);
  return res.data;
};
