import React, { useEffect, useState } from "react";
import ImageText from "./ImageText";
import { getTop5RecentPosts, getTopLikePostsFirst } from "../api/post-api";
import { Link } from "react-router-dom";

const Mytrip = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    localStorage.removeItem("currentPage");
    getPosts();
  }, []);

  const getPosts = async () => {
    const res1 = await getTop5RecentPosts();
    setRecentPosts(res1);
    const res2 = await getTopLikePostsFirst();
    setTopPosts(res2);
    console.log(res2);
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      {/* <Search placeholder="가고 싶은 나라나 도시를 선택해주세요" /> */}
      <div className="trip-text-display">
        <div className="row-center-space">
          <p className="trip-font-color">최근 올라온 여행일지</p>
          <Link
            className="trip-font-color"
            style={{
              paddingLeft: "15px",
              fontSize: "14px",
              textDecoration: "none",
            }}
            to="/posts"
          >
            더보기
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "10px 13% 0 13%",
        }}
      >
        {recentPosts?.map((post, i) => (
          <Link
            to={`/detail-post/${post.id}`}
            key={i}
            style={{ textDecoration: "none" }}
          >
            <ImageText
              src={post.diaries
                .filter((diary) => diary.photos && diary.photos.length > 0)
                .map((diary) => diary.photos[0].photoURL)}
              content={post.title}
            ></ImageText>
          </Link>
        ))}
      </div>

      <div className="trip-text-display">
        <div className="row-center-space">
          <p className="trip-font-color">이번주 Hot한 여행일지 Top5</p>
          <Link
            className="trip-font-color"
            style={{
              paddingLeft: "15px",
              fontSize: "14px",
              textDecoration: "none",
            }}
            to="/posts"
          >
            더보기
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "10px 13% 0 13%",
        }}
      >
        {topPosts?.map((post, i) => (
          <Link
            to={`/detail-post/${post.id}`}
            key={i}
            style={{ textDecoration: "none" }}
          >
            <ImageText
              key={i}
              src={post.diaries
                .filter((diary) => diary.photos && diary.photos.length > 0)
                .map((diary) => diary.photos[0].photoURL)}
              content={post.title}
            ></ImageText>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Mytrip;
