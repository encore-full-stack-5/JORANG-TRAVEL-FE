import axios from "axios";

export const chatApi = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    data: body,
    params: params,
    // headers: {
    //   Authorization: getToken(),
    // },
  });

  return res;
};
