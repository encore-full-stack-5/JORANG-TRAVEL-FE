import { api } from "./network";

export const saveExpenseDetailsApi = async (expenseId, body) => {
  try {
    await api(`/api/v1/expense-details/expenses/${expenseId}`, "post", body);
  } catch (error) {
    console.error("Error in saveExpenseDetailsApi", error);
  }
};

export const getChartData = async (postId) => {
  try {
    const res = await api(
      `/api/v1/expense-details/chart/postId/${postId}`,
      "get"
    );
    return res.data;
  } catch (error) {
    console.error("Error in getChartData", error);
  }
};

export const deleteExpenseDetailsApi = async (expenseId) => {
  await api(`/api/v1/expense-details/expense/${expenseId}`, "delete");
};
