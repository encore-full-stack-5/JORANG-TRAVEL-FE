import { useEffect, useState } from "react";
import { getRecentPostsByCountry } from "../api/post-api";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useParams } from "react-router-dom";
import ImageText from "./ImageText";
import filterImage from "./../image/filterImage.png";
import countries from "../countries.js";
import "./PostsPerCountry.css"
import "./Posts.css"

const PostsPerCountry = () => {
  const [posts, setPosts] = useState([]);
  const [date, setDate] = useState([
    new DateObject().subtract(30, "years"),
    new DateObject().add(30, "years"),
  ]);
  const [showFilter, setShowFilter] = useState(false);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postLength, setPostLength] = useState();
  // const [filteredPosts, setFilteredPosts] = useState([]);
  const countryInEnglish = useParams().country;
  
/* 1. 기간을 고르면 각 페이지에서 필터됨(포스트가 각 페이지에 배속되지 않게 필요) -> 완료
   2. 새로고침 했을 때 현재 페이지에서 머물러야 함 -> 완료
   3. 기간 설정 시 page번호도 변경이 필요하다. -> 완료
   4. 페이지 번호가 처음 렌더링 할 때 부터 나와야 한다. -> 완료
   5. 2페이지에서 기간 설정해서 포스트 갯수가 줄어들면 1페이지로 넘어와야 하는데 2페이지에서 머문다. -> 완료
   6. 다른 URL 에 들어갔다가 다시 왔을 때 원래 꺼에 머물러 있다. 예를 들어 2페이지에
*/


  useEffect(() => {
    localStorage.removeItem("currentPage");
    getPostsAndSetPage();
  }, []);

  const getPostsAndSetPage = async () => {
    const res = await getRecentPostsByCountry(countryInEnglish);
    setPosts(res);
    updatePageNumbers(res);
    setCurrentPage(localStorage.getItem("currentPage"));
    console.log(localStorage.getItem("currentPage"));
  };

  const updatePageNumbers = (posts) => {
    const arr = [];
    for (let page = 1; page <= Math.ceil(posts.length/10); page++) {
      arr.push(page);
    }
    setPages(arr);
  }


  const clickOnFilter = (e) => {
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
    // e.preventDefault(); // re rendering 이 필요한가
    if (e.length == 2) {
      const startDate = new Date(e[0].toString().replace(/-/g, "-")).getTime();
      const endDate = new Date(e[1].toString().replace(/-/g, "-")).getTime();
      setDate([startDate, endDate]);
      // page 번호 업데이트 
      const newPosts = posts.filter((post) => post.diaries.some((diary) =>
      new Date(diary.date).getTime() >= startDate &&
      new Date(diary.date).getTime() <= endDate));
      updatePageNumbers(newPosts);
      // 기간을 변경하면 1페이지로 이동 
      setCurrentPage(1);
    }
  };

  const getCountryInKorean = () => {
    for (let continent in countries) {
      for (let countryInKorean in countries[continent]) {
        if (countries[continent][countryInKorean] === countryInEnglish) {
          return countryInKorean;
        }
      }
    }
  };

  const showCurrentPage = (e) => {
    setCurrentPage(e.target.innerHTML);
    localStorage.setItem("currentPage", e.target.innerHTML);
  };

  // const closeFilterBox = (e) => {
  //   console.log(e.target.className);
  //   if (e.target.className !== "filter-box") setShowFilter(false);
  // };

  return (
      <div style={{ paddingTop: "20px", width: "100%" }}>
        {/* <Search placeholder="가고 싶은 나라나 도시를 선택해주세요" /> */}
          <div id="country-header" style={{ display: "flex", justifyContent: "space-evenly", marginBottom: "10px" }}>
            <div className="country-name">
              <div style={{ fontSize: "1.8rem", fontWeight: "800", textAlign: "left", marginBottom: "10px" }}>
                {getCountryInKorean()}</div>
              <hr style={{ width: "calc(1.8rem * 25)"}} />
            </div>
            
            <div className="filter-zone">
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
                <div className="filter-box-country">
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
          </div>

          <div
            className="country-posts"
            style={{ width: "calc(5 * 180px + 5 * 30px + 5 * 6px)", height: "440px" }} // total width 고정 필요
          >
            <div className="posts-container" >
              {posts.filter((post) => post.diaries.some((diary) =>
                  new Date(diary.date).getTime() >= date[0] &&
                  new Date(diary.date).getTime() <= date[1]))
                .slice((currentPage-1)*10, currentPage*10)
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
        {pages.map(page => (
            <button key={page} onClick={showCurrentPage} style={{margin: "-20px 5px 100px 5px", backgroundColor: "white", border:"none", fontSize: "1.4rem"}}>{page}</button>
          ))}
          </div>
      </div>
  );
};

export default PostsPerCountry;
