import React, { useEffect, useState } from "react";
import ImageText from "./ImageText";
import filterImage from "./../image/filterImage.png";
import { getRecentPostsFirst } from "../api/post-api";
import "./Posts.css";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { searchState } from "./searchState";
import { useRecoilState } from "recoil";

const SearchPage = () => {
  const [posts, setPosts] = useState([]);
  const [date, setDate] = useState([
    new DateObject().subtract(30, "years"),
    new DateObject().add(30, "years"),
  ]);
  const [showFilter, setShowFilter] = useState(false);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const temp = useRecoilState(searchState);
  const searchText = temp[0];
  console.log(searchText);

  useEffect(() => {
    getPostsAndSetPage();
  }, []);

  const getPostsAndSetPage = async () => {
    const res = await getRecentPostsFirst();
    setPosts(res);
    updatePageNumbers(res);
    setCurrentPage(localStorage.getItem("currentPage"));
    console.log(localStorage.getItem("currentPage"));
  };

  const updatePageNumbers = (posts) => {
    const arr = [];
    for (let page = 1; page <= Math.ceil(posts.length / 10); page++) {
      arr.push(page);
    }
    setPages(arr);
  };

  const clickOnFilter = (e) => {
    // console.log("clickOnFilter들어옴");
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

  // 좋아요순
  const sortByLike = () => {
    setPosts([...posts].sort((a, b) => b.love - a.love));
  };

  // 기간 설정
  const filterByDuration = (e) => {
    if (e.length == 2) {
      const startDate = new Date(e[0].toString().replace(/-/g, "-")).getTime();
      const endDate = new Date(e[1].toString().replace(/-/g, "-")).getTime();
      setDate([startDate, endDate]);
      // page 번호 업데이트
      const newPosts = posts.filter((post) =>
        post.diaries.some(
          (diary) =>
            new Date(diary.date).getTime() >= startDate &&
            new Date(diary.date).getTime() <= endDate
        )
      );
      updatePageNumbers(newPosts);
      // 기간을 변경하면 1페이지로 이동
      setCurrentPage(1);
    }
  };

  // const closeFilterBox = (e) => {
  //   console.log(e.target.className);
  //   if (e.target.className !== "filter-box") setShowFilter(false);
  // };

  const showCurrentPage = (e) => {
    setCurrentPage(e.target.innerHTML);
    localStorage.setItem("currentPage", e.target.innerHTML);
  };

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
      <div
        className="country-posts"
        style={{
          width: "calc(5 * 180px + 5 * 30px + 5 * 6px)",
          height: "440px",
        }} // total width 고정 필요
      >
        <div className="posts-container">
          {posts
            ?.filter((post) => {
              return post.diaries.some(
                (diary) =>
                  new Date(diary.date).getTime() >= date[0] &&
                  new Date(diary.date).getTime() <= date[1]
              );
            })
            .filter((post) => {
              if (searchText === null || searchText === undefined) {
                return post;
              } else {
                const result =
                  post.title.includes(searchText) ||
                  post.diaries.some(
                    (diary) =>
                      diary.title.includes(searchText) ||
                      diary.content.includes(searchText)
                  );
                console.log("Search Filter Result:", result, post);
                return result;
              }
            })
            .slice((currentPage - 1) * 10, currentPage * 10)
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
      <div>
        {pages.map((page) => (
          <button
            key={page}
            onClick={showCurrentPage}
            style={{
              margin: "-20px 5px 100px 5px",
              backgroundColor: "white",
              border: "none",
              fontSize: "1.4rem",
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
