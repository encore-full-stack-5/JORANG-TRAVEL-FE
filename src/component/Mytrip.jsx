import React, { useEffect, useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import { Link, useNavigate } from "react-router-dom";
import {
  getPostByUser,
  getUnpublishedPosts,
  getUserLikePosts,
  savePost,
} from "../config/postApi";

const Mytrip = () => {
  const [likePosts, setLikePosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [onGoingPosts, setOngoingPosts] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myPostClickable, setMyPostClickable] = useState(true);
  const [likePostClickable, setLikePostClickable] = useState(true);
  const [ongoingPostClickable, setOngoingPostClickable] = useState(true);

  const getUserLikePostsApi = async () => {
    const response = await getUserLikePosts();
    console.log(response);
    if (response && response.length > 0) setLikePosts(response);
    else setLikePostClickable(false);
  };

  const getPostByUserApi = async () => {
    const response = await getPostByUser();
    console.log(response, "getPostByUserApi");
    if (response && response.length > 0) setMyPosts(response);
    else setMyPostClickable(false);
  };

  const getOngoingPosts = async () => {
    const response = await getUnpublishedPosts();
    console.log(response);
    if (response && response.length > 0) setOngoingPosts(response);
    else setOngoingPostClickable(false);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginId = localStorage.getItem("id");
      console.log(loginId, "로그인 id");
      if (loginId) {
        setIsLoggedIn(true);
        getPostByUserApi();
        getUserLikePostsApi();
        getOngoingPosts();
        localStorage.removeItem("currentPage");
      } else {
        setIsLoggedIn(false);
        alert("로그인이 되어 있지 않습니다. 로그인 페이지로 이동합니다.");
        navigate("/signin");
      }
    };
    checkLoginStatus();
  }, []);

  const displayPosts = (posts) => {
    return posts.slice(0, 5);
  };

  const writePost = async () => {
    const res = await savePost();
    console.log(res);
    navigate(`/posts/${res}/write`);
  };

  return (
    <div>
      <div className="mytrip-row">
        <div className="row-more">
          <p className="trip-font-color">내가 작성한 여행일지</p>
          {myPostClickable && (
            <Link
              to="/mytrip/more-information"
              style={{ textDecoration: "none" }}
            >
              <p
                className="trip-font-color"
                style={{
                  fontSize: "14px",
                  marginLeft: "10px",
                  textDecoration: "none",
                }}
              >
                더보기
              </p>
            </Link>
          )}
        </div>
        <Link to="/traveldiary" style={{ textDecoration: "none" }}>
          <button
            className="post-signature-color-oval"
            style={{ width: "150px" }}
            onClick={writePost}
          >
            여행일지 작성하기
          </button>
        </Link>
      </div>

      <div className="mytrip-map-display">
        {console.log(myPosts)}
        {myPosts && myPosts.length > 0 ? (
          myPosts
            .map((post, index) => (
              <div key={index}>
                <Link
                  to={`/my/detail-post/${post.id}`}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <ImageText
                    src={post.diaries
                      .filter(
                        (diary) => diary.photos && diary.photos.length > 0
                      )
                      .map((diary) => diary.photos[0].photoURL)}
                    content={post.title}
                  ></ImageText>
                </Link>
              </div>
            ))
            .slice(0, 5)
        ) : (
          <p className="empty-posts">작성한 여행일지가 없습니다.</p>
        )}
      </div>

      <div className="mytrip-row">
        <div className="row-more">
          <p className="trip-font-color">찜한 여행일지</p>
          {likePostClickable && (
            <Link
              to="/mytrip/love/more-information"
              style={{ textDecoration: "none" }}
            >
              <p
                className="trip-font-color"
                style={{ fontSize: "14px", marginLeft: "10px" }}
              >
                더보기
              </p>
            </Link>
          )}
        </div>
      </div>

      <div className="mytrip-map-display">
        {/* {console.log(likePosts, "likePosts")} */}
        {likePosts && likePosts.length > 0 ? (
          likePosts
            .map((likePost, index) => (
              <div key={index}>
                <Link
                  to={`/my/detail-post/${likePost.post.id}`}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <ImageText
                    src={
                      (console.log(likePost, "like-post") &&
                        likePost.post.diaries
                          .filter(
                            (diary) => diary.photos && diary.photos.length > 0
                          )
                          .map((diary) => diary.photos[0].photoURL)) ||
                      Norway
                    }
                    content={likePost.post.title}
                  ></ImageText>
                </Link>
              </div>
            ))
            .slice(0, 5)
        ) : (
          <p className="empty-posts">찜한 여행일지가 없습니다.</p>
        )}
      </div>
      <div className="mytrip-row">
        <div className="row-more">
          <p className="trip-font-color">작성 중인 여행일지</p>
          {ongoingPostClickable && (
            <Link
              // to="/mytrip/love/more-information"
              style={{ textDecoration: "none" }}
            >
              <p
                className="trip-font-color"
                style={{ fontSize: "14px", marginLeft: "10px" }}
              >
                더보기
              </p>
            </Link>
          )}
        </div>
      </div>

      <div className="mytrip-map-display">
        {console.log(onGoingPosts, "onGoingPosts")}
        {onGoingPosts && onGoingPosts.length > 0 ? (
          onGoingPosts
            .map((post, index) => (
              <div key={index}>
                <Link
                  // to={`/detail-post/${post.post.id}`}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <ImageText
                    src={post.diaries
                      .filter(
                        (diary) => diary.photos && diary.photos.length > 0
                      )
                      .map((diary) => diary.photos[0].photoURL)}
                    content={post.title}
                  ></ImageText>
                </Link>
              </div>
            ))
            .slice(0, 5)
        ) : (
          <p className="empty-posts">작성중인 여행일지가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Mytrip;
