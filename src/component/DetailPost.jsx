import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDiaryAllByPostId,
  getLikeCheck,
  getPostById,
  likeComment,
  getExpenseDetailsByPostId,
 
getExpenseDetailById
} from "../config/postApi";

const DetailPost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [diaries, setDiaries] = useState([]);
  const [like, setLike] = useState();
  const [likeCheck, setLikeCheck] = useState();
  const [expenseDetails, setExpenseDetails] = useState([]);

  const [expenses, setExpenses] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const getPostByIdApi = async () => {
    try {
      console.log("-------" + id);
      const response = await getPostById(id);
      console.log(response);
      setPost(response);
      setLike(response.love);
    } catch {
      console.log("error in getPostByIdApi");
    }
  };

  const getAllByPostIdApi = async () => {
    try {
      console.log("-------" + id);
      const response = await getDiaryAllByPostId(id);
      console.log(response);
      setDiaries(response);
      setLoading(false);
    } catch {
      console.log("error in getAllByPostIdApi");
    }
  };
const getExpenseDetailByIdApi = async () =>{
  try {
    console.log("------" + id);
    const response = await getExpenseDetailById(id);
    console.log(response);
    setExpenses(response);
  }catch{
    console.log("error in getExpenseDetialByIdApi");
  }


  };



  const likeCommentApi = async () => {
    try {
      const response = await likeComment(id);
      setLikeCheck(!likeCheck);
      console.log(response);
      setLike(like + response);
      setPost({ ...post, love: like + response });
    } catch {
      console.log("error in likeCommentApi");
    }
  };

  const checkLikeApi = async () => {
    try {
      const response = await getLikeCheck(id);
      console.log(response);
      setLikeCheck(response);
    } catch {
      console.log("error in checkLikeApi");
    }
  };
  // const fetchExpenseDetails = async () => {
  //   const expenses = await getExpensesByPostId(id);
  //   if (expenses) {
  //     const expenseDetailsPromises = expenses.map(expense => 
  //       getExpenseDetailsByExpenseId(expense.id));
  //     const expenseDetails = await Promise.all(expenseDetailsPromises);
  //     setExpenseDetails(expenseDetails.flat()); // 여러 Expense-Detail 배열을 단일 배열로 결합
  //   }
  // };
  // const expensesResponse = await getExpenseDetailsByPostId(id);
  // setExpenses(expensesResponse || []);
  const fetchExpenseDetailsByPostId = async () => {
    try {
      const response = await getExpenseDetailsByPostId(id);
      console.log(response); // 옵셔널: 응답 로깅
      setExpenses(response || []);
    } catch (error) {
      console.error("Error in fetchExpenseDetailsByPostId", error);
      setExpenses([]); // 에러 발생 시 expenses를 빈 배열로 설정
    }
  };
  


  useEffect(() => {
    getPostByIdApi();
    getAllByPostIdApi();
    checkLikeApi();
     getExpenseDetailByIdApi();
    //  fetchExpenseDetails();
    fetchExpenseDetailsByPostId();
  }, []);


  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <div>
          {post ? (
  <>
    <div className="post-signature-color-oval-post">{post.title}</div>
    <p style={{ color: "#606060", fontSize: "15px" }}>
      생성일 : {formatDate(post.createdAt)}
    </p>
  </>
) : (
  <p>No post data available.</p>
)}

          <div
            className="post-signature-color-oval-post"
            style={{ width: "80px", height: "30px" }}
          >
            여행기
          </div>
          <div>
            {diaries?.map((diary, index) =>
              diary.scope === "PUBLIC" ? (
                <div
                  className="signature-oval-post"
                  
                  key={index}
                >
                  <div className="diary-date-title">
                  <div className="diary-date">
                    <p style={{ color: "#606060", fontSize: "18px" }}>
                      {diary.date}
                    </p>
                    </div>
                    <div classname="diary-title">
                    <p style={{ color: "#9cc7ee", fontSize: "18px", marginLeft:"180px"}}>
                      {diary.title}
                    </p>
                    </div>
                    </div>
                    <div className="diary-image-contnet">
                    <div className="diary-image"></div>
                   
                    {/* <p style={{ color: "#606060", fontSize: "15px" }}>
                      {diary.country}
                    </p> */}
                    <div className="diary-content">
                    <p style={{ color: "#606060", fontSize: "15px",textAlign:"left" }}>
                      {diary.content}
                    </p>
                    </div>
                  </div>
                  </div>
               
              ) : (
                <div></div>
              )
            )}
          </div>
          <div
            className="post-signature-color-oval"
            style={{ width: "80px", height: "30px" }}
          >
            경비

          </div>
          <div>
            {expenses?.map((expense, index) =>
              expense.scope === "PUBLIC" ? (
                <div
                  className="signature-oval"
                  style={{ width: "700px", height: "200px" }}
                  key={index}
                >
                  <div className="sign-up">
                    <p style={{ color: "#606060", fontSize: "15px" }}>
                      {expense.date}
                    </p>
                    <p style={{ color: "#606060", fontSize: "15px" }}>
                      {expense.title}
                    </p>
                    <p style={{ color: "#606060", fontSize: "15px" }}>
                      {expense.country}
                    </p>
                    <p style={{ color: "#606060", fontSize: "15px" }}>
                      {expense.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div></div>
              )
            )}
          </div>
          
          
          
          
         
         
          {likeCheck ? (
            <button
              className="signature-oval"
              style={{ backgroundColor: "#d7e9fa" }}
              onClick={likeCommentApi}
            >
              <p style={{ color: "#606060", fontSize: "15px" }}>
                {post.love}개
              </p>
            </button>
          ) : (
            <button className="signature-oval" onClick={likeCommentApi}>
              <p style={{ color: "#606060", fontSize: "15px" }}>
                {post.love}개
              </p>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailPost;
