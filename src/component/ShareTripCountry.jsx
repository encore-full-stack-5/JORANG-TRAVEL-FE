import React, { useEffect, useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import { Link, useParams } from "react-router-dom";
import { getRecent5PostsByCountry } from "../api/post-api";
import countries from "../countries.js";
import { getCountryInfo } from "../config/postApi.jsx";

const ShareTripCountry = () => {
  const [click, setClick] = useState(false);
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const countryInEnglish = params.country;
  const [countryInfo, setCountryInfo] = useState("");
  // const location = useLocation();
  // const countryInKorean = location.state;
  // debugger;
  console.log(countryInEnglish);
  // console.log(location);

  useEffect(() => {
    localStorage.removeItem("currentPage");
    getPosts();
    getCountryInfoApi();
  }, []);

  const getPosts = async () => {
    const countryInKorean = getCountryInKorean();
    const res = await getRecent5PostsByCountry(countryInKorean);
    setPosts(res);
  };

  const getCountryInfoApi = async () => {
    console.log("getCountryInfoApi 들어옴");
    try {
      const countryInKorean = getCountryInKorean();
      const response = await getCountryInfo(countryInKorean);
      console.log(response);
      setCountryInfo(response);
    } catch (error) {
      setCountryInfo("");
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
      <div
        style={{
          marginTop: "20px",
          position: "relative",
          height: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="country-image-container"
          onClick={() => setClick(!click)}
          // onMouseLeave={() => setClick(false)}
          // onMouseOver={() => setClick(true)}
        >
          <img
            style={{ width: "1200px", height: "280px" }}
            src={Norway}
            alt="Norway"
          />
          {click && (
            <div className="country-image-overlay">
              <div>
                <p>{countryInfo.name}</p>
                <p>{countryInfo.info}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="post-per-country">
        <div className="row-center-space" style={{ alignItems: "baseline" }}>
          <p className="trip-font-color" style={{ paddingTop: "10px" }}>
            {getCountryInKorean()} 여행일지
          </p>
          <Link
            className="trip-font-color"
            style={{ paddingLeft: "5px", fontSize: "14px" }}
            to={`/posts/country/${countryInEnglish}`}
          >
            더보기
          </Link>
        </div>
      </div>

      <div style={{ display: "flex", margin: "10px 15% 0 15%" }}>
        {posts?.map((post, i) => (
          <Link
            to={`/detail-post/${post.id}`}
            key={i}
            style={{ textDecoration: "none" }}
          >
            <ImageText
              key={i}
              src={getImageSrc(post)}
              content={post.title}
            ></ImageText>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShareTripCountry;
