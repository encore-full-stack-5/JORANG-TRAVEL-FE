import React, { useEffect, useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import { Link, useNavigate } from "react-router-dom";
import { getPostByUser, getUnpublishedPosts, getUserLikePosts, savePost } from "../config/postApi";

const Mytrip = () => {
  const [likePosts, setLikePosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [onGoingPosts, setOngoingPosts] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserLikePostsApi = async () => {
    try {
      const response = await getUserLikePosts();
      console.log(response);
      setLikePosts(response);
    } catch (error) {
      console.log("Error in getUserLikePostsApi", error);
      setLikePosts([]);
    }
  };

  const getPostByUserApi = async () => {
    try {
      const response = await getPostByUser();
      console.log(response);
      setMyPosts(response);
    } catch (error) {
      console.log("Error in getPostByUserApi", error);
      setMyPosts([]);
    }
  };

  const getOngoingPosts = async () => {
    try {
      const res = await getUnpublishedPosts();
      console.log(res);
      setOngoingPosts(res);
    } catch (error) {
      console.log("Error in getUnpublishedPosts", error);
      setOngoingPosts([]);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
=======
    const checkLoginStatus = async () => {
      const loginId = localStorage.getItem("id");
      if (loginId) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        alert("로그인이 되어 있지 않습니다. 로그인 페이지로 이동합니다.");
        navigate("/signin");
      }
    };

    checkLoginStatus();
    localStorage.removeItem("currentPage");
>>>>>>> 496284b05d81570404daef4942c33d47e4084e25
    getPostByUserApi();
    getUserLikePostsApi();
    getOngoingPosts();
    localStorage.removeItem("currentPage");
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
          <Link
            to="/mytrip/more-information"
            style={{ textDecoration: "none" }}
          >
            <p className="trip-font-color" style={{ fontSize: "14px", marginLeft: "10px", textDecoration: "" }}>
              더보기
            </p>
          </Link>
        </div>
        <Link to="/traveldiary" style={{ textDecoration: "none" }}>
          <button
            className="post-signature-color-oval"
            style={{ width: "150px" }}
            onClick={writePost}
          >
            여행일지 추가하기
          </button>
        </Link>
      </div>

      <div className="mytrip-map-display">
        {/* {console.log(myPosts)} */}
        {myPosts && myPosts.length > 0 ? (
          displayPosts(myPosts).map((post, index) => (
            <div key={index}>
              <Link
                to={`/my/detail-post/${post.id}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ImageText src={post.diaries
                  .filter((diary) => diary.photos && diary.photos.length > 0)
                  .map((diary) => diary.photos[0].photoURL)} content={post.title}></ImageText>
              </Link>
            </div>
          ))
        ) : (
          <p
            className="trip-font-col
          or"
          >
            작성한 여행일지가 없습니다.
          </p>
        )}
      </div>

      <div className="mytrip-row">
        <div className="row-more">
          <p className="trip-font-color">찜한 여행일지</p>
          <Link
            to="/mytrip/love/more-information"
            style={{ textDecoration: "none" }}
          >
            <p className="trip-font-color" style={{ fontSize: "14px", marginLeft: "10px" }}>
              더보기
            </p>
          </Link>
        </div>
      </div>

      <div className="mytrip-map-display">
        {likePosts.length > 0 ? (
          displayPosts(likePosts).map((post, index) => (
            <div key={index}>
              <Link
                to={`/my/detail-post/${post.post.id}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ImageText src={post.diaries
                  .filter((diary) => diary.photos && diary.photos.length > 0)
                  .map((diary) => diary.photos[0].photoURL) || Norway} content={post.title}></ImageText>
              </Link>
            </div>
          ))
        ) : (
          <p
            className="trip-font-col
        or"
          >
            찜한 여행일지가 없습니다.
          </p>
        )}
      </div>
      <div className="mytrip-row">
        <div className="row-more">
          <p className="trip-font-color">작성 중인 여행일지</p>
          <Link
            // to="/mytrip/love/more-information"
            style={{ textDecoration: "none" }}
          >
            <p className="trip-font-color" style={{ fontSize: "14px", marginLeft: "10px" }}>
              더보기
            </p>
          </Link>
        </div>
      </div>      

      <div className="mytrip-map-display">
        {onGoingPosts.length > 0 ? (
          displayPosts(onGoingPosts).map((post, index) => (
            <div key={index}>
              <Link
                // to={`/detail-post/${post.post.id}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ImageText src={post.diaries
                  .filter((diary) => diary.photos && diary.photos.length > 0)
                  .map((diary) => diary.photos[0].photoURL)} content={post.title}></ImageText>
              </Link>
            </div>
          ))
        ) : (
          <p className="trip-font-color">작성중인 여행일지가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Mytrip;
