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
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTcxOTIxNzQwNH0.TF23J-1iXDRSd9rlIOOJpxN3Te1D9s7i0anWWJf7KKI",
    },
  });

  return res;
};
