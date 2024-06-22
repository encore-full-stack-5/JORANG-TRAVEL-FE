import React, { useEffect, useState } from "react";
import Norway from "./../image/Norway.png";
import ImageText from "./ImageText";
import jorangImage from "./../image/jorangImage.png";
import filterImage from "./../image/filterImage.png";
import { Link } from "react-router-dom";
import { getPostById, getUserLikePosts } from "../config/postApi";

const Mytrip = () => {
  const [likePosts, setLikePosts] = useState([]);
  const [postDetails, setPostDetails] = useState({});

  const getUserLikePostsApi = async () => {
    try {
      const response = await getUserLikePosts();
      console.log(response);
      setLikePosts(response);
    } catch (error) {
      console.log("Error in getUserLikePostsApi", error);
    }
  };

  // const getPostByIdApi = async (id) => {
  //   try {
  //     const response = await getPostById(id);
  //     setPostDetails({ ...postDetails, id: response });
  //   } catch {
  //     console.log("error in getPostByIdApi");
  //   }
  // };

  useEffect(() => {
    getUserLikePostsApi();
  }, []);

  // useEffect(() => {
  //   if (likePosts.length > 0) {
  //     likePosts.forEach((post) => {
  //       getPostByIdApi(post.postId);
  //     });
  //   }
  // }, [likePosts]);

  return (
    <div>
      {/* <div className="mytrip-row">
        <div className="trip-text-display">
          <p className="trip-font-color">여행기</p>
        </div>
        <Link to="/traveldiary" style={{ textDecoration: "none" }}>
          <button
            className="post-signature-color-oval"
            style={{ width: "150px" }}
          >
            여행기 추가하기
          </button>
        </Link>
      </div>
      <div className="row-left-center-space">
        <div
          className="trip-image-display"
          style={{
            justifyContent: "flex-start",
          }}
        >
          <ImageText
            src={Norway}
            content="안녕하세요hihihihihihihihihihihi"
          ></ImageText>
          <ImageText
            src={jorangImage}
            content="hihihihihihihihihihihi반갑습니다"
          ></ImageText>
        </div>
      </div> */}
      <div className="trip-text-display">
        <p className="trip-font-color">찜한 여행기</p>
      </div>

      {likePosts?.map((post, index) => (
        <div
          key={index}
          className="trip-image-display"
          style={{
            justifyContent: "flex-start",
          }}
        >
          {alert("들어옴")}

          <Link
            to={`/detail-post/${post.postId}`}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <ImageText src={Norway} content="title"></ImageText>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Mytrip;
