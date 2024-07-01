import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDiaryAllByPostId,
  getLikeCheck,
  getPostById,
  likeComment,
  getById,
  getExpenseDetailsByPostId,
} from "../config/postApi";
import DonutChart from "./DonutChart";
import ImageSlider from "./ImageSlider";

const DetailPost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [diaries, setDiaries] = useState([]);
  const [like, setLike] = useState();
  const [likeCheck, setLikeCheck] = useState();
  const [postExpenses, setPostExpenses] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState([]);

  const [expenses, setExpenses] = useState(null);
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
      setExpenses(response);
    } catch {
      console.log("error in getPostByIdApi");
    }
  };

  const getAllByPostIdApi = async () => {
    try {
      console.log("-------" + id);
      const response = await getDiaryAllByPostId(id);
      console.log("xxx", response);
      setDiaries(response);
      setLoading(false);
    } catch {
      console.log("error in getAllByPostIdApi");
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

  // const getByIdApi = async () => {
  //   try {
  //     const response = await getById(id);
  //     console.log(response);
  //     setExpenses(response);
  //   } catch {
  //     console.log("error in getByIdApi");
  //   }
  // };

  useEffect(() => {
    localStorage.removeItem("currentPage");
    getPostByIdApi();
    getAllByPostIdApi();
    checkLikeApi();
    // getByIdApi();
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

          <div className="post-signature-color-oval-post">
            <h3 style={{ marginLeft: "250px", textAlign: "left" }}>여행기</h3>
          </div>
          <div>
            {diaries?.map((diary, index) => (
              <div className="signature-oval-post" key={index}>
                <div className="diary-date-title">
                  <div className="diary-date">
                    <p style={{ color: "#606060", fontSize: "18px" }}>
                      {diary.date}
                    </p>
                  </div>
                  <div classname="diary-title">
                    <p
                      style={{
                        color: "#9cc7ee",
                        fontSize: "18px",
                        marginLeft: "419px",
                      }}
                    >
                      {diary.title}
                    </p>
                  </div>
                </div>
                <div className="diary-image-contnet">
                  <ImageSlider content={diary.photos} />

                  {/* <p style={{ color: "#606060", fontSize: "15px" }}>
                      {diary.country}
                    </p> */}
                  <div className="diary-content">
                    <p
                      style={{
                        color: "#606060",
                        fontSize: "15px",
                        textAlign: "left",
                      }}
                    >
                      {diary.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="post-signature-color-oval-expense">
            <h3
              style={{
                marginLeft: "250px",
                textAlign: "left",
                marginBottom: "30px",
                marginTop: "30px",
              }}
            >
              경비
            </h3>
          </div>

          {expenses &&
            expenses.expenses.map((expense, index) => (
              <div key={index} className="expense-box">
                <h3
                  style={{
                    textAlign: "left",
                    marginLeft: "300px",
                    marginBottom: "30px",
                  }}
                >
                  {" "}
                  {expense.date}
                </h3>
                <div className="expense-detail">
                  {expense.expenseDetails &&
                  expense.expenseDetails.length > 0 ? (
                    <div className="expense-details">
                      {expense.expenseDetails.map((detail, idx) => (
                        <div key={idx}>
                          <div className="all-expense">
                            <div className="expense-cost">
                              비용: ${detail.cost}
                            </div>
                            <div className="expense-place">
                              장소: {detail.place}
                            </div>
                            <div className="expense-category">
                              카테고리: {detail.category}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>이 날짜에 해당하는 경비 내역이 없습니다.</p>
                  )}
                </div>
              </div>
            ))}

          <DonutChart style={{ width: "200px", height: "200px" }} postId={id} />

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
