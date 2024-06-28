import axios from "axios";
import { api } from "./network";
// const APY_URL = 'http://localhost:8080/api/v1/diaries';

// export const saveExpenses = async (expenseData) => {
//     try{
//         const response = await axios.post(`/api/v1/expenses/${id}`,expenseData);
//         return response.data;
//     } catch(error){
//         console.error("Error in saveExpenses")
//     }

// }
export const saveExpenses = async (id) => {
    try{
        const response = await axios.post(`/api/v1/expense-details/${id}`,expense);
        return response.data;
    } catch(error){
        console.error("Error in saveExpenses")
    }

}

