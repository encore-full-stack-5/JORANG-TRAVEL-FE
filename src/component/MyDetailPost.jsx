import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMyPostById } from "../config/postApi";
import DonutChart from "./DonutChart";
import ImageSlider from "./ImageSlider";
import { deleteById } from "../api/post-api";
import { deletePhotosByDiaryId } from "../config/photoApi";
import { deleteDiaryById } from "../config/diaryApi";
import {
  getLikeCheckApi,
  getLikeCountByPostIdApi,
  likePostApi,
} from "../config/likeApi";

const MyDetailPost = () => {
  const postId = useParams().id;
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [diaries, setDiaries] = useState([]);
  const [like, setLike] = useState();
  const [likeCheck, setLikeCheck] = useState();
  const [postExpenses, setPostExpenses] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState([]);
  const navigate = useNavigate();
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
      const response = await getMyPostById(postId);
      console.log(response, "post");
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

  const deletePost = async () => {
    if (window.confirm("여행 일지를 정말 삭제하시겠습니까?")) {
      for (let diary of diaries) {
        await deletePhotosByDiaryId(diary.id); // photo를 먼저 지워야 한다. (foreign key 때문에)
        await deleteDiaryById(diary.id); // id가 발급된 diary는 DB에서 삭제
      }
      await deleteById(postId);
      alert("여행 일지가 삭제되었습니다");
      navigate("/mytrip");
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

  useEffect(() => {
    getPostByIdApi();
    getLikeCHeck();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {post ? (
            <>
              <h2
                style={{
                  marginTop: "65px",
                }}
              >
                {post.title}
              </h2>
              <div
                style={{
                  display: "flex",
                  width: "80%",
                  margin: "auto",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    // marginRight: `calc((100% - ${getDiaryWidth()}px) / 2)`,
                    marginBottom: "20px",
                    marginRight: "30px",
                  }}
                >
                  <button
                    onClick={() => navigate(`/post/edit/${postId}`)}
                    className="delete-travel-diary"
                  >
                    수정
                  </button>
                </div>
                <div
                  style={{
                    // marginRight: `calc((100% - ${getDiaryWidth()}px) / 2)`,
                    marginBottom: "20px",
                  }}
                >
                  <button onClick={deletePost} className="delete-travel-diary">
                    삭제
                  </button>
                </div>
              </div>
              <p
                style={{
                  color: "#606060",
                  fontSize: "1.1rem",
                  textAlign: "right",
                  width: "80%",
                  alignSelf: "center",
                  // marginRight: `calc((100% - ${getDiaryWidth()}px) / 2)`,
                }}
              >
                작성 시간: {formatDate(post.createdAt)}
              </p>
            </>
          ) : (
            <p>No post data available.</p>
          )}
          <div className="post-signature-color-oval-post">
            {/* <h3 style={{ marginLeft: "250px", textAlign: "left" }}>여행기</h3> */}
          </div>
          <div>
            {diaries?.map((diary, index) => (
              <div className="signature-oval-post" id="my-diary" key={index}>
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
                    {diary.date ? (
                      <div style={{ marginBottom: "20px" }}>
                        <p style={{ color: "#606060", fontSize: "1.2rem" }}>
                          {diary.date}
                        </p>
                      </div>
                    ) : (
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "300px",
                          border: "2px dashed #9cc7ee",
                          borderRadius: "15px",
                          padding: "15px",
                          marginBottom: "18px",
                        }}
                      >
                        날짜를 넣어주세요
                      </div>
                    )}
                    {diary.photos && diary.photos.length > 0 ? (
                      <ImageSlider content={diary.photos} />
                    ) : (
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "300px",
                          height: "300px",
                          border: "2px dashed #9cc7ee",
                          borderRadius: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        이미지를 넣어주세요
                      </div>
                    )}
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
                    {diary.title ? (
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
                    ) : (
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "100%",
                          border: "2px dashed #9cc7ee",
                          borderRadius: "15px",
                          padding: "15px",
                          marginBottom: "18px",
                        }}
                      >
                        제목을 넣어주세요
                      </div>
                    )}
                    {diary.content ? (
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
                    ) : (
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "100%",
                          height: "100%",
                          border: "2px dashed #9cc7ee",
                          borderRadius: "15px",
                          padding: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        내용을 넣어주세요
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {console.log(expenses, "expenses")}

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
                                지출
                              </div>
                              <div>장소</div>
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

          {expenses && expenses.length > 0 && <DonutChart postId={postId} />}
          {console.log(likeCheck, "likeCHeck")}

          {likeCheck ? (
            <div className="like-button">
              <button
                className="signature-oval"
                style={{ backgroundColor: "#d7e9fa", textAlign: "center" }}
                onClick={likePost}
              >
                {post && (
                  <p style={{ color: "#606060", fontSize: "1.1rem" }}>
                    ❤️ {post.love}개
                  </p>
                )}
              </button>
            </div>
          ) : (
            <div className="like-button">
              <button className="signature-oval" onClick={likePost}>
                {post && (
                  <p style={{ color: "#606060", fontSize: "1.1rem" }}>
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

export default MyDetailPost;
