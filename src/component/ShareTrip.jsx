import React, { useEffect, useState } from "react";
import ImageText from "./ImageText";
import filterImage from "./../image/filterImage.png";
import Search from "./Search";
import { getRecentPostsFirst, getTopLikePostsFirst } from "../api/post-api";
import { Link } from "react-router-dom";

const Mytrip = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [TopPosts, setTopPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const res1 = await getRecentPostsFirst();
    setRecentPosts(res1);
    const res2 = await getTopLikePostsFirst();
    setTopPosts(res2);
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      {/* <Search placeholder="가고 싶은 나라나 도시를 선택해주세요" /> */}
      <div className="row-center-space">
        <div className="trip-text-display">
          <p className="trip-font-color">최근 올라온 여행일지</p>
        </div>
        <div className="signature-oval" style={{ width: "80px" }}>
          <p style={{ color: "#606060" }}>필터</p>
          <img
            src={filterImage}
            style={{ width: "25px", height: "25px" }}
          ></img>
        </div>
      </div>
      <div className="trip-image-display">
        {recentPosts?.map((post, i) => (
          <Link
            to={`/detail-post/${post.id}`}
            key={i}
            style={{ textDecoration: "none" }}
          >
            {console.log(post.id)}
            <ImageText
              src={post.diaries
                .filter(
                  (diary) =>
                    diary.photos &&
                    diary.photos.length > 0 &&
                    new Date(diary.date) > new Date(2024, 5, 8).getTime()
                )
                .map((diary) => diary.photos[0].photoURL)}
              content={post.title}
            ></ImageText>
          </Link>
        ))}
      </div>

      <div className="trip-text-display">
        <p className="trip-font-color">이번주 Hot한 여행일지 Top5</p>
      </div>

      <div className="trip-image-display">
        {TopPosts?.map((post, i) => (
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
