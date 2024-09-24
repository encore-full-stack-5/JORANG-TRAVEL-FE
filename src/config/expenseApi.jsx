import { api } from "./network";

export const saveExpensesApi = async (postId, body) => {
  const res = await api(`/api/v1/expenses/posts/${postId}`, "post", body);
  return res.data;
};

export const deleteExpenseApi = async (id) => {
  await api(`/api/v1/expenses/${id}`, "delete");
};
