import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css"
// import { baseUrl } from "./config";

function CustomPaging() {
  const path = {
     "1" :  "https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F6%2Fdiaries%2F22%2Fimages%2F1?generation=1718643796434344&alt=media",
     "2" : "https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F7%2Fdiaries%2F23%2Fimages%2F1?generation=1718643856318918&alt=media",
     "3" :"https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F8%2Fdiaries%2F24%2Fimages%2F1?generation=1718643866571072&alt=media",
     "4" : "https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F9%2Fdiaries%2F25%2Fimages%2F1?generation=1718643897600426&alt=media"
}

  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={`${path[i+1]}`}  width="300" height="300" />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={`${path[1]}`} width="300" height="300"/>
        </div>
        <div>
          <img src={`${path[2]}`} width="300" height="300" />
        </div>
        <div>
          <img src={`${path[3]}`}  width="300" height="300" />
        </div>
        <div>
          <img src={`${path[4]}`} width="300" height="300"/>
        </div>
      </Slider>
    </div>
  );
}

export default CustomPaging;
