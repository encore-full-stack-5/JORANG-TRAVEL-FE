import React, { useEffect, useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import { Link, useNavigate } from "react-router-dom";
import { getPostByUser, getUserLikePosts, savePost } from "../config/postApi";

const Mytrip = () => {
  const [likePosts, setLikePosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    getPostByUserApi();
    getUserLikePostsApi();
    localStorage.removeItem("currentPage");
  }, []);

  const displayPosts = (posts) => {
    return posts.slice(0, 5);
  };

  const writePost = async () => {
    const res = await savePost();
    console.log(res);
    navigate(`/posts/${res}/write`);
  }

  return (
    <div>
      <div className="mytrip-row">
        <div className="row-more">
          <p className="trip-font-color">여행일지</p>
          <Link
            to="/mytrip/more-information"
            style={{ textDecoration: "none" }}
          >
            <p className="trip-font-color" style={{ fontSize: "14px" }}>
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
          myPosts.map((post, index) => (
            <div key={index}>
              <Link
                to={`/detail-post/${post.id}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ImageText src={Norway} content={post.title}></ImageText>
              </Link>
            </div>
          ))
        ) : (
          <p className="trip-font-col
          or">작성한 여행일지가 없습니다.</p>
        )}
      </div>

      <div className="mytrip-row">
        <div className="row-more">
          <p className="trip-font-color">찜한 여행일지</p>
          <Link
            to="/mytrip/love/more-information"
            style={{ textDecoration: "none" }}
          >
            <p className="trip-font-color" style={{ fontSize: "14px" }}>
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
                to={`/detail-post/${post.post.id}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ImageText src={Norway} content={post.post.title}></ImageText>
              </Link>
            </div>
          ))
        ) : (
          <p className="trip-font-color">찜한 여행일지가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Mytrip;
