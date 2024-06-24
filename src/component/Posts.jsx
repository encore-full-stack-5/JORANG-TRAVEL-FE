import React, { useEffect, useState } from "react";
import ImageText from "./ImageText";
import filterImage from "./../image/filterImage.png";
import Search from "./Search";
import { getAllPosts, getRecentPostsFirst } from "../api/post-api";
import "./Posts.css";
import DatePicker, { DateObject } from "react-multi-date-picker";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [date, setDate] = useState([
    new DateObject().subtract(30, "years"),
    new DateObject().add(30, "years"),
  ]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  // console.log(new Date(x).getTime() == new Date(z).getTime());

  // console.log(date[0].toString());
  // console.log(date[1].toString());

  const getPosts = async () => {
    const res = await getRecentPostsFirst();
    setPosts(res);
  };

  const clickOnFilter = (e) => {
    // e.preventDefault(); // re rendering 없애야 함
    setShowFilter(!showFilter);
  };

  // 최신순
  const sortByDateDesc = () => {
    setPosts(
      [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  };

  const changeSort = () => {
    const selected = document.getElementById("filter").value;
    if (selected == "1") sortByDateDesc();
    else sortByLike();
  };

  // console.log(posts);

  // 좋아요순
  const sortByLike = () => {
    setPosts([...posts].sort((a, b) => b.love - a.love));
  };

  // 기간 설정
  const filterByDuration = (e) => {
    // e.preventDefault(); // re rendering 이 필요한가
    if (e.length == 2) {
      const startDate = new Date(e[0].toString().replace(/-/g, "-")).getTime();
      const endDate = new Date(e[1].toString().replace(/-/g, "-")).getTime();
      setDate([startDate, endDate]);
    }
  };

  // const closeFilterBox = (e) => {
  //   console.log(e.target.className);
  //   if (e.target.className !== "filter-box") setShowFilter(false);
  // };

  return (
    <div style={{ paddingTop: "20px", width: "100%" }}>
      {/* <Search placeholder="가고 싶은 나라나 도시를 선택해주세요" /> */}
      <div className="filter-container">
        <div className="filter-button">
          <div className="signature-oval" style={{ width: "80px" }}>
            <button
              type="button"
              style={{
                color: "#606060",
                border: "none",
                fontSize: "15px",
                backgroundColor: "white",
              }}
              onClick={clickOnFilter}
            >
              필터
            </button>
            <img
              src={filterImage}
              style={{ width: "25px", height: "25px" }}
            ></img>
          </div>
        </div>
        {showFilter && (
          <div className="filter-box">
            <select id="filter" onChange={changeSort}>
              <option className="filter-option" style={{ display: "none" }}>
                정렬 기준
              </option>
              <option value="1">최신순</option>
              <option value="2">좋아요순</option>
            </select>
            <DatePicker
              placeholder="여행 기간 설정"
              className="date-picker"
              value={date}
              onChange={filterByDuration}
              range
              style={{ width: "181px", cursor: "pointer" }}
            />
          </div>
        )}
      </div>

      <div className="posts-container">
        {posts
          ?.filter((post) =>
            post.diaries.some(
              (diary) =>
                new Date(diary.date).getTime() >= date[0] &&
                new Date(diary.date).getTime() <= date[1]
            )
          )
          .map((post, i) => (
            <ImageText
              key={i}
              src={post.diaries
                .filter((diary) => diary.photos && diary.photos.length > 0)
                .map((diary) => diary.photos[0].photoURL)}
              content={post.title}
            ></ImageText>
          ))}
      </div>
    </div>
  );
};

export default Posts;
