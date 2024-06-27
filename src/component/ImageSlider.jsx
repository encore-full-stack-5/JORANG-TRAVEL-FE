import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import React from 'react';
import "./ImageSlider.css"


const ImageSlider = (props) => {
  
  const photos = props.content;
  const images = [];
  for (let photo of photos) {
    images.push({original : photo.photoURL, thumbnail : photo.photoURL});
  }

  return <ImageGallery items={images} />;
};

export default ImageSlider;

