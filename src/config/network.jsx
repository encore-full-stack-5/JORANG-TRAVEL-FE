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
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmcmVlZG9tIiwiZXhwIjoxNzE4NTk2ODc3fQ.TE-GthJoveV36dyAB4TwvaqxpRAeJL0TpZtDwU7vS20",
    },
  });

  return res;
};
