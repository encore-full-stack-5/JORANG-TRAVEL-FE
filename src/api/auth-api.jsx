import { api } from "../config/network";

export const signUp = async (data) => {
  await api("api/v1/auths/signUp", "post", data);
};

export const signIn = async (data) => {
  await api("api/v1/auths/signIn", "post", data);
};

export const getList = async () => {
  const res = await api("/api/v1/boards", "get");
  // console.log(res);
  return res.data;
};
