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
<<<<<<< HEAD
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTcxOTM0MzM3OH0.rmDJkAmaCids2A63aGl2hvgORH9Dtvm3BYZCO3oYUtQ",
=======
      Authorization: getToken(),
>>>>>>> 189de6106c553180d1cac5d342737bc6f98ea9b5
    },
  });

  return res;
};
