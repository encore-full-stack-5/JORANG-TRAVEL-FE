import React, { useEffect, useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import { Link, useParams } from "react-router-dom";
import { getRecent5PostsByCountry } from "../api/post-api";
import countries from "../countries.js";

const ShareTripCountry = () => {
  const [click, setClick] = useState(false);
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const countryInEnglish = params.country;
  // const location = useLocation();
  // const countryInKorean = location.state;
  // debugger;
  console.log(countryInEnglish);
  // console.log(location);
  useEffect(() => {
    getPosts();
  }, []);

  const countryInfo =
    "노르웨이의 국기는 1821년에 프레드리크 멜체르(Fredrik Meltzer)가 디자인한 것이다. 십자가는 북유럽 국기에서 흔히 볼 수 있는 노르딕 십자가며, 붉은색과 파란색은 과거 노르웨이와 깊은 연관을 맺었던 스웨덴과 덴마크 국기 색깔을 반영한 것이다.이 깃발은 스웨덴-노르웨이 연합 왕국 시절에 만들어졌는데 당시 국왕이었던 칼 14세 요한은 이 깃발을 노르웨이의 깃발로 인정하는 것을 거부했으나 대신 노르웨이의 시민기(市民旗)로 쓰는 것은 인정하였다. 1844년에 깃발 도안이 바뀌어 왼쪽 위 작은 사각형(칸톤)에 스웨덴-노르웨이 연합 왕국 깃발을 넣도록 했다. 그러다가 노르웨이가 1905년에 연합 왕국에서 독립하자 스웨덴-노르웨이 연합 왕국 깃발을 빼버리고 정식 국기로 삼았다. ";

  const getPosts = async () => {
    const res = await getRecent5PostsByCountry(countryInEnglish);
    setPosts(res);
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
        >
          <img
            style={{ width: "1200px", height: "280px" }}
            src={Norway}
            alt="Norway"
          />
          {click && (
            <div className="overlay">
              <div>
                <p>Norway</p>
                <p>{countryInfo}</p>
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

export default ShareTripCountry;
