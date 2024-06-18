import axios from "axios";

export const api = async (url, method, body) => {
  axios.defaults.baseURL = "http://localhost:8080";
  const res = await axios({
    url,
    method,
    data: body,
    headers: {
      Authorization: "",
      // "Content-Type": "application/json",
    },
  });

  return res;
};
