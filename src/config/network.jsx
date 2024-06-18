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
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmcmVlZG9tIiwiZXhwIjoxNzE4NzI5MTIwfQ.qmBpB8bPlmLBtMEHhLwtqXBRTl25U9BprhRJDAz50qE",
    },
  });

  return res;
};
