import { api } from "../config/network";

// 모든 post 가져오기
export const getAllPosts = async () => {
  const res = await api("/api/v1/posts", "get");
  console.log(res.data);
  return res.data;
};

// 나라별 post 가져오기
// export const getPostsByCountry = async (country) => {
//   const res = await api("/api/v1/posts/diaries", "get", null, {
//     country: country,
//   });
//   console.log(res.data.content);
//   return res.data.content;
// };

// 나라별 최신순 post 가져오기

export const getRecentPostsByCountry = async (country) => {
  const res = await api("/api/v1/posts", "get", null, {
    country: country,
  });
  console.log(res.data);
  return res.data;
};

// 최신순 post 가져오기
export const getRecentPostsFirst = async () => {
  const res = await api("/api/v1/posts/recent", "get");
  console.log(res.data);
  return res.data;
};

export const getTop5RecentPosts = async () => {
  const res = await api("/api/v1/posts/top5/recent", "get");
  console.log(res.data);
  return res.data;
};



// 이번주 좋아요 순 post top5 가져오기
export const getTopLikePostsFirst = async () => {
  const res = await api("/api/v1/posts/top5/like", "get");
  console.log(res.data);
  return res.data;
};

export const getRecent5PostsByCountry = async (country) => {
  const res = await api("/api/v1/posts/top5/diaries", "get", null, {
    country: country,
  });
  return res.data;
};

// 이 기간의 여행기 post 가져오기
// export const getPostsBetweenTheseDates = async (from, to) => {
//   const res = await api("/api/v1/posts/diaries", "get", null, {
//     from: from,
//     to: to,
//   });
//   console.log(res.data);
//   return res.data;
// };
