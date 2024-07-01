import axios from "axios";

export const api = async (url, method, body, params, baseURL) => {
  const getToken = () => {
    if (
      url === "/api/v1/auths/signUp" ||
      url === "/api/v1/auths/signIn" ||
      url === "/api/v1/posts/top5/recent" ||
      url === "/api/v1/posts/top5/like" ||
      url === "/api/v1/posts/top5/diaries" ||
      url === "/api/v1/posts/recent" ||
      url === "/api/v1/auths/findLoginId" ||
      url === "/api/v1/auths/findPassword" ||
      // url === "/api/v1/posts/recent"
      // url === "/api/v1/expense-details"
      url === "/api/v1/posts/recent/diaries" ||
      url.startsWith("/api/v1/country/info/") ||
      url.startsWith("/api/v1/auths/loginId/") ||
      url.startsWith("/api/v1/auths/email/") ||
      url.startsWith("/api/v1/posts/public/") ||
      url.startsWith("/api/v1/diaries/posts")
    )
      return "";
    return "Bearer " + localStorage.getItem("token");
  };

  const res = await axios({
    url,
    method,
    baseURL: "http://localhost:8080", // baseURL
    data: body,
    params: params,
    headers: {
      Authorization: getToken(),
      // Authorization: []
    },
  });

  return res;
};

// Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW95ZW9uIiwiZXhwIjoxNzE5MTM0MzcwfQ.8i5mAhtTkTJQ9QvrbI_V0RV6HMf_QcqFznzjP_Olo-8
// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMaW1zZW95ZW9uIiwiZXhwIjoxNzE5MTU4OTY4fQ.rO6hjg_P__Az1ww2ljaiaeX4pWW73VbnkY98XknUL2E
// Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMaW1zZW95ZW9uIiwiZXhwIjoxNzE5MjAwNzY1fQ.TXsHu9zwDVnXKmX7XX-T18rCQeTVDe17CIWncePFB7A
