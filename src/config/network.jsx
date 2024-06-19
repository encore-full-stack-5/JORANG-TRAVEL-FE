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
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTcxODc4NzE4Mn0.8EJTNvNQUVJdEk5NfqBizs_uxwtic5TsW2Mko257Jq4",
    },
  });

  return res;
};
