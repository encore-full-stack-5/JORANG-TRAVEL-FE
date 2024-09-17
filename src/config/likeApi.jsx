import { api } from "./network";

export const getLikeCountByPostIdApi = async (postId) => {
  try {
    const res = await api(`/api/v1/likes/posts/${postId}/count`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getLikeCountByPostIdApi", error);
  }
};

export const likePostApi = async (postId) => {
  try {
    const res = await api(`/api/v1/likes/posts/${postId}`, "post");
    return res.data;
  } catch (error) {
    console.error("Error in likePost", error);
  }
};

export const getLikeCheckApi = async (postId) => {
  try {
    const res = await api(`/api/v1/likes/posts/${postId}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in likeCheck", error);
  }
};
