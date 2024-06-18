import { api } from "./network";

export const postSignUp = async (data) => {
  try {
    const res = await api("/api/v1/auths/signUp", "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in signUp", error);
  }
};

export const postSignIn = async (data) => {
  try {
    const res = await api("/api/v1/auths/signIn", "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in signIn", error);
  }
};

export const getUserById = async (id) => {
  try {
    const res = await api(`/api/v1/auths/${id}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error fetching user by ID", error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const res = await api(`/api/v1/auths/email/${email}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error fetching user by Email", error);
  }
};

export const getUserByLoginId = async (loginId) => {
  try {
    const res = await api(`/api/v1/auths/loginId/${loginId}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error fetching user by LoginId", error);
  }
};

export const updateUser = async (id, changeValue, type) => {
  try {
    const response = await api(
      `/api/v1/auths/${id}?type=${type}`,
      "put",
      changeValue
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const deleteUserById = async (id) => {
  try {
    const res = await api(`/api/v1/auths/${id}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error fetching user by ID", error);
  }
};

export const findLoginId = async (data) => {
  try {
    const res = await api("/api/v1/auths/findLoginId", "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in findLoginId", error);
  }
};

export const findPassword = async (data) => {
  try {
    const res = await api("/api/v1/auths/findPassword", "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in findPassword", error);
  }
};
