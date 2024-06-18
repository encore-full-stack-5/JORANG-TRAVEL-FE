import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";

import React from "react";
import Slider from "react-slick";

const ImageSlider = ({ images }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="image-slider-container">
      <Slider {...settings}>
        <div>
          <img src="https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F6%2Fdiaries%2F22%2Fimages%2F1?generation=1718643796434344&alt=media" />
        </div>
        <div>
          <img src="https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F7%2Fdiaries%2F23%2Fimages%2F1?generation=1718643856318918&alt=media" />
        </div>
        <div>
          <img src="https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F8%2Fdiaries%2F24%2Fimages%2F1?generation=1718643866571072&alt=media" />
        </div>
        <div>
          <img src="https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F9%2Fdiaries%2F25%2Fimages%2F1?generation=1718643897600426&alt=media" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
