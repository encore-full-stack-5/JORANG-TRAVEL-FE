import axios from "axios";

export const api = async (url, method, body) => {
  axios.defaults.baseURL = "http://localhost:8080";
  const res = await axios({
    url,
    method,
    data: body,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTcxODc4NTMwNH0.nintp-chP4BKojxclC0odRq5_h_5qAtCyMIKZexRGUM",
      // "Content-Type": "application/json",
    },
  });

  return res;
};
