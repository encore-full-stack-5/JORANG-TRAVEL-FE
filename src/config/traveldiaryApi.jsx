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

export const saveExpense = async (postId, date) => {
    // const formattedDate =  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];
    const formattedDate = new Date().toISOString().split('T')[0];  
    try {
        const response = await api(`/api/v1/expenses/posts/${postId}`, "post", {date : formattedDate });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error in saveExpense", error.response || error);
    }
};

// export const updateExpense = async (id) => {
//     try{
//         const response = await api(`/api/v1/expenses/update/${id}`)
//     }
// }
// export const deleteExpense = async () =>{
//     try{
//         const res = await api
//     }
// }

