import axios from "axios";

export const api = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    baseURL: "http://localhost:8080", // baseURL
    data: body,
    params: params,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTcxODk1NzA0Nn0.tvg49T31SxxJTsXHcfjGCvjh_Wh_SfVH5-vMr7tSh-c",
    },
  });

  return res;
};
