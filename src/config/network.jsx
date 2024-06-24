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
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmcmVlZG9tIiwiZXhwIjoxNzE5MjQ4MTU3fQ.RZ2XG1t4uqGqtkgq-G4TGDMEg3qGkzI7RoO5AqBkt2w",
    },
  });

  return res;
};
