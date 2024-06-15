import axios from "axios";

export const api = async (url, method, body) => {
  const res = await axios({
    url,
    method,
    data: body,
  });

  return res;
};
