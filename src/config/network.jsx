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
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW95ZW9uIiwiZXhwIjoxNzE4OTQ2MDM0fQ.kpJ4c-yxYcymL31APDubW3cw1QcA8u2ClpFSVtdC1ac",
    },
  });

  return res;
};
