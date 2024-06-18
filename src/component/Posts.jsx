import React, { useEffect, useState } from "react";
import ImageText from "./ImageText";
import filterImage from "./../image/filterImage.png";
import Search from "./Search";
import { getAllPosts } from "../api/post-api";
import "./Posts.css";
import DatePicker, { DateObject } from "react-multi-date-picker";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [date, setDate] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);

  useEffect(() => {
    getPosts();
  }, []);
  const x = "2024-06-15";
  const y = "2024/06/15";
  console.log(new Date(x.replace(/-/g, "/")));
  console.log(new Date(y.replace(/-/g, "/")));

  // console.log(date[0].toString());
  const getPosts = async () => {
    const res = await getAllPosts(0, 20);
    setPosts(res.content);
  };

  return (
    <div style={{ paddingTop: "20px", width: "100%" }}>
      <Search placeholder="가고 싶은 나라나 도시를 선택해주세요" />
      <div className="row-center-space">
        <div className="signature-oval" style={{ width: "80px" }}>
          <p style={{ color: "#606060" }}>필터</p>
          <img
            src={filterImage}
            style={{ width: "25px", height: "25px" }}
          ></img>
        </div>
      </div>

      <div className="filter-box">
        <select>
          <option disabled>정렬 기준</option>
          <option value="recent">최신순</option>
          <option value="like">좋아요순</option>
        </select>
        <div>날짜순</div>
        <DatePicker value={date} onChange={setDate} range />
      </div>

      <div className="posts-container">
        {posts?.map((post, i) => (
          <ImageText
            key={i}
            src={post.diaries
              .filter(
                (diary) => diary.photos && diary.photos.length > 0
                // new Date(diary.date) > new Date(2024, 5, 8).getTime()
              )
              .map((diary) => diary.photos[0].photoURL)}
            content={post.title}
          ></ImageText>
        ))}
      </div>
    </div>
  );
};

export default Posts;
