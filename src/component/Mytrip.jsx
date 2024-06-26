import React, { useEffect, useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import { Link } from "react-router-dom";
import { getPostByUser, getUserLikePosts } from "../config/postApi";

const Mytrip = () => {
  const [likePosts, setLikePosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

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
  }, []);

  const displayPosts = (posts) => {
    return posts.slice(0, 5);
  };

  return (
    <div>
      <div className="mytrip-row">
        <div className="trip-text-display">
          <p className="trip-font-color">여행기</p>
        </div>
        <Link to="/traveldiary" style={{ textDecoration: "none" }}>
          <button
            className="post-signature-color-oval"
            style={{ width: "150px" }}
          >
            여행기 추가하기
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

      <div className="trip-text-display">
        <p className="trip-font-color">찜한 여행기</p>
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
          <p className="trip-font-color">찜한 여행기가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Mytrip;
