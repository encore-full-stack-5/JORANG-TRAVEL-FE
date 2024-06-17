import React, { useEffect, useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import jorangImage from "./../image/jorangImage.png";
import filterImage from "./../image/filterImage.png";
import searchImage from "./../image/searchImage.png";
import Search from "./Search";
import { getAllPosts } from "../api/post-api";

const Mytrip = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const res = await getAllPosts();
    setPosts(res);
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <Search placeholder="가고 싶은 나라나 도시를 선택해주세요" />
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
      {/* posts[0].diaries[0].photos[0].photoURL */}
      <div className="trip-image-display">
        <ImageText
          src={Norway}
          content="안녕하세요hihihihihihihihihihihi"
        ></ImageText>
        <ImageText
          src={jorangImage}
          content="hihihihihihihihihihihi반갑습니다"
        ></ImageText>
        <ImageText
          src={Norway}
          content="안녕하세요hihihihihihihihihihihi"
        ></ImageText>
        <ImageText
          src={jorangImage}
          content="hihihihihihihihihihihi반갑습니다"
        ></ImageText>
        <ImageText
          src={searchImage}
          content="안녕하세요hihihihihihihihihihihi"
        ></ImageText>
      </div>

      <div className="trip-text-display">
        <p className="trip-font-color">이번주 Hot한 여행일지 Top5</p>
      </div>

      <div className="trip-image-display">
        <ImageText
          src={Norway}
          content="안녕하세요hihihihihihihihihihihi"
        ></ImageText>
        <ImageText
          src={jorangImage}
          content="hihihihihihihihihihihi반갑습니다"
        ></ImageText>
        <ImageText
          src={Norway}
          content="안녕하세요hihihihihihihihihihihi"
        ></ImageText>
        <ImageText
          src={jorangImage}
          content="hihihihihihihihihihihi반갑습니다"
        ></ImageText>
        <ImageText
          src={searchImage}
          content="안녕하세요hihihihihihihihihihihi"
        ></ImageText>
      </div>
    </div>
  );
};

export default Mytrip;
