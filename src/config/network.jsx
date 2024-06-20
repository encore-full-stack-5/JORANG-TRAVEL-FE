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
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTcxODg3NDQ3Mn0.X4n3v4IOMyofM0qBF5Ddk1WEoRfLk7CCkP3XuwsDA0k",
    },
  });

  return res;
};
