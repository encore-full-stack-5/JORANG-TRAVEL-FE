import React, { useEffect, useState } from "react";
import {
  getMyPublishedPostApi,
  getMyPublishedPostsByPageApi,
  postListByUser,
} from "../config/postApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageText from "./ImageText";
import Norway from "./../image/Norway.png";

const MyTripMoreInformation = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getMyPublishedPosts = async (pageNumber) => {
    try {
      const response = await getMyPublishedPostsByPageApi(pageNumber);
      console.log(response, "getMyPublishedPosts");
      setTotalPage(response.totalPages);
      setDataList(response.content);
    } catch {
      console.log("error in getMyPublishedPosts");
    }
  };

  const handlePage = (pageId) => {
    setCurrentPage(pageId);
    navigate(`?page=${pageId}`);
  };

  const getImageSrc = (post) => {
    const filteredDiaries = post.diaries.filter(
      (diary) => diary.photos && diary.photos.length > 0
    );
    // console.log(filteredPost, "filteredPost");
    if (filteredDiaries && filteredDiaries.length > 0)
      return filteredDiaries[0].photos[0].photoURL;
    else return "/window.jpg";
  };

  useEffect(() => {
    localStorage.removeItem("currentPage");
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page")) || 0;
    setCurrentPage(page);
    getMyPublishedPosts(page);
  }, [location.search]);

  return (
    <div>
      <div
        id="country-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "40px",
          marginBottom: "10px",
          marginRight: "calc((100% - 5 * 200px - 5 * 30px - 5 * 6px) / 2)",
          marginLeft: "calc((100% - 5 * 200px - 5 * 30px - 5 * 6px) / 2)",
        }}
      >
        <div className="country-name">
          <div
            style={{
              fontSize: "1.8rem",
              fontWeight: "800",
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            발행한 여행일지
          </div>
          <hr style={{ width: "calc(1.8rem * 25)" }} />
        </div>
      </div>
      <div className="mytrip-display">
        {dataList.length > 0 ? (
          dataList.map((data, index) => (
            <div key={index}>
              <Link
                to={`/my/detail-post/${data.id}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ImageText
                  src={getImageSrc(data)}
                  content={data.title}
                ></ImageText>
              </Link>
            </div>
          ))
        ) : (
          <p className="trip-font-color">작성한 여행일지가 없습니다.</p>
        )}
      </div>
      {totalPage > 0 && (
        <div className="page-button-fix">
          <div className="row-center">
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePage(index)}
                disabled={index === currentPage}
                style={{
                  backgroundColor: "white",
                  border: "none",
                  fontSize: "1.4rem",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default MyTripMoreInformation;
