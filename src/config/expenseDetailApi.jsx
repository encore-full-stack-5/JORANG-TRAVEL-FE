import { api } from "./network";

export const saveExpenseDetailsApi = async (expenseId, body) => {
  try {
    await api(`/api/v1/expense-details/expenses/${expenseId}`, "post", body);
  } catch (error) {
    console.error("Error in saveExpenseDetailsApi", error);
  }
};
