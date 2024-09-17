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
import { getLikeCheckApi, likePostApi } from "../config/likeApi";

const DetailPost = () => {
  const postId = useParams().id;
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
      console.log("-------" + postId);
      const response = await getPostById(postId);
      console.log(response);
      setPost(response);
      setLike(response.love);
      setDiaries(response.diaries);
      setExpenses(response.expenses);
      setLoading(false);
    } catch {
      console.log("error in getPostByIdApi");
    }
  };

  const likePost = async () => {
    try {
      const response = await likePostApi(postId);
      setLikeCheck(!likeCheck);
      console.log(response);
      setLike(like + response);
      setPost({ ...post, love: like + response });
    } catch {
      console.log("error in likePostApi");
    }
  };

  const getLikeCHeck = async () => {
    try {
      const response = await getLikeCheckApi(postId);
      console.log(response);
      setLikeCheck(response);
    } catch {
      console.log("error in getLikeCHeck");
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
    // getAllByPostIdApi();
    getLikeCHeck();
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
              {post && (
                <h2
                  className="post-signature-color-oval-post"
                  style={{ marginTop: "65px" }}
                >
                  {post.title}
                </h2>
              )}
              {post && (
                <p
                  style={{
                    color: "#606060",
                    fontSize: "1.1rem",
                    textAlign: "right",
                    marginRight: "220px",
                  }}
                >
                  작성 시간 : {formatDate(post.createdAt)}
                </p>
              )}
            </>
          ) : (
            <p>No post data available.</p>
          )}

          <div>
            {console.log(diaries, "diaries")}
            {diaries &&
              diaries.length > 0 &&
              diaries.map((diary, index) => (
                <div className="signature-oval-post" key={index}>
                  <div
                    className="diary-container"
                    style={{
                      display: "flex",
                      gap: "40px",
                    }}
                  >
                    <div
                      className="diary-left"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginBottom: "20px" }}>
                        <p style={{ color: "#606060", fontSize: "1.2rem" }}>
                          {diary.date}
                        </p>
                      </div>
                      <ImageSlider content={diary.photos} />
                    </div>
                    <div
                      className="diary-right"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 4,
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginBottom: "20px" }}>
                        <p
                          style={{
                            color: "#9cc7ee",
                            fontSize: "1.2rem",
                          }}
                        >
                          {diary.title}
                        </p>
                      </div>
                      <div className="diary-content">
                        <p
                          style={{
                            color: "#606060",
                            fontSize: "1.1rem",
                            textAlign: "left",
                            margin: "0",
                            lineHeight: "30px",
                          }}
                        >
                          {diary.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="post-signature-color-oval-expense">
            {/* <h3
              style={{
                marginLeft: "250px",
                textAlign: "left",
                marginBottom: "30px",
                marginTop: "30px",
              }}
            >
              경비
            </h3> */}
          </div>

          {expenses &&
            expenses.length > 0 &&
            expenses.map((expense, index) => (
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
                          {idx === 0 && (
                            <div
                              className="all-expense"
                              style={{
                                backgroundColor: "#9cc7ee",
                                borderTopRightRadius: "26px",
                                borderTopLeftRadius: "26px",
                              }}
                            >
                              <div
                                style={{
                                  marginLeft: "20px",
                                }}
                              >
                                경비
                              </div>
                              <div>비용</div>
                              <div
                                style={{
                                  marginRight: "20px",
                                }}
                              >
                                카테고리
                              </div>
                            </div>
                          )}
                          <div className="all-expense">
                            <div className="expense-cost">
                              {detail.cost.toLocaleString()}원
                            </div>
                            <div className="expense-place">{detail.place}</div>
                            <div className="expense-category">
                              {detail.category}
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

          {expenses && expenses.length > 0 && (
            <DonutChart
              style={{ width: "200px", height: "200px" }}
              postId={postId}
            />
          )}
          {likeCheck ? (
            <div className="like-button">
              <button
                className="signature-oval"
                style={{ backgroundColor: "#d7e9fa", textAlign: "center" }}
                onClick={likePost}
              >
                {post && (
                  <p style={{ color: "#606060", fontSize: "15px" }}>
                    ❤️ {post.love}개
                  </p>
                )}
              </button>
            </div>
          ) : (
            <div className="like-button">
              <button className="signature-oval" onClick={likePost}>
                {post && (
                  <p style={{ color: "#606060", fontSize: "15px" }}>
                    ❤️ {post.love}개
                  </p>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailPost;
