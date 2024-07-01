import React, { useEffect, useState } from "react";
import { postListByUser } from "../config/postApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageText from "./ImageText";
import Norway from "./../image/Norway.png";

const MyTripMoreInformation = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getPostList = async (pageNumber) => {
    try {
      const response = await postListByUser(pageNumber);
      setTotalPage(response.totalPages);
      setDataList(response.content);
    } catch {
      console.log("error in getPostList");
    }
  };

  const handlePage = (pageId) => {
    setCurrentPage(pageId);
    navigate(`?page=${pageId}`);
  };

  useEffect(() => {
    localStorage.removeItem("currentPage");
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page")) || 0;
    setCurrentPage(page);
    getPostList(page);
  }, [location.search]);

  return (
    <div>
      <div className="mytrip-map-display">
        {dataList.length > 0 ? (
          dataList.map((data, index) => (
            <div key={index}>
              <Link
                to={`/detail-post/${data.id}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ImageText src={data.diaries
                  .filter((diary) => diary.photos && diary.photos.length > 0)
                  .map((diary) => diary.photos[0].photoURL)} content={data.title}></ImageText>
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
