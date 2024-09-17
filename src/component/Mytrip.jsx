import React, { useEffect, useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import { Link, useNavigate } from "react-router-dom";
import {
  getLikedPostsByUserApi,
  getMyPublishedPostApi,
  getMyUnpublishedPosts,
  getUserLikePosts,
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

  const getMyPublishedPosts = async () => {
    const response = await getMyPublishedPostApi();
    if (response && response.length > 0) setMyPosts(response);
    else setMyPostClickable(false);
  };

  const getUserLikePosts = async () => {
    const response = await getLikedPostsByUserApi();
    console.log(response, "likepost");
    if (response && response.length > 0) setLikePosts(response);
    else setLikePostClickable(false);
  };
  const getOngoingPosts = async () => {
    const response = await getMyUnpublishedPosts();
    if (response && response.length > 0) setOngoingPosts(response);
    else setOngoingPostClickable(false);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const expirationTime = localStorage.getItem("expirationTime");
      if (!expirationTime || new Date() > new Date(expirationTime)) {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("nickname");
        localStorage.removeItem("expirationTime");
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        navigate("/signin");
      } else {
        const loginId = localStorage.getItem("id");
        console.log(loginId, "로그인 id");
        if (loginId) {
          setIsLoggedIn(true);
          getMyPublishedPosts();
          getUserLikePosts();
          getOngoingPosts();
          localStorage.removeItem("currentPage");
        } else {
          setIsLoggedIn(false);
          alert("로그인이 되어 있지 않습니다. 로그인 페이지로 이동합니다.");
          navigate("/signin");
        }
      }
    };
    checkLoginStatus();
  }, []);

  const getImageSrc = (post) => {
    const filteredDiaries = post.diaries.filter(
      (diary) => diary.photos && diary.photos.length > 0
    );
    // console.log(filteredPost, "filteredPost");
    if (filteredDiaries && filteredDiaries.length > 0)
      return filteredDiaries[0].photos[0].photoURL;
    else return "/window.jpg";
  };

  return (
    <div>
      <div className="mytrip-row">
        <div className="row-more">
          <p className="trip-font-color">발행한 여행일지</p>
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
        <Link to="/post/write" style={{ textDecoration: "none" }}>
          <button
            className="post-signature-color-oval"
            style={{ width: "150px" }}
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
                    src={getImageSrc(post)}
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
            .map((post, index) => (
              <div key={index}>
                <Link
                  to={`/detail-post/${post.post.id}`}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <ImageText
                    src={getImageSrc(post.post)}
                    content={post.post.title}
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
              to="/mytrip/unpublished/more-information"
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
                  to={`/my/detail-post/${post.id}`}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <ImageText
                    src={getImageSrc(post)}
                    content={post.title}
                  ></ImageText>
                </Link>
              </div>
            ))
            .slice(0, 5)
        ) : (
          <p className="empty-posts">작성 중인 여행일지가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Mytrip;
