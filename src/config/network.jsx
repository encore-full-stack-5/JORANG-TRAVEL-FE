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
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTcxOTM0MzM3OH0.rmDJkAmaCids2A63aGl2hvgORH9Dtvm3BYZCO3oYUtQ",
    },
  });

  return res;
};
