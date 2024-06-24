import axios from "axios";

export const api = async (url, method, body, params) => {
  const getToken = () => {
    if (url === "/api/v1/auths/signUp" || 
    url === "/api/v1/auths/signIn" || 
    url === "/api/v1/posts/top5/recent" ||
    url === "/api/v1/posts/top5/like" || 
    url === "/api/v1/posts/top5/diaries" ||
    url === "/api/v1/posts/recent"
    ) return "";
    return "Bearer " + localStorage.getItem("token");
  }
  
  const res = await axios({
    url,
    method,
    baseURL: "http://localhost:8080", // baseURL
    data: body,
    params: params,
    headers: {
      Authorization: getToken(),
    },
  });

  return res;
};
