import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import React from 'react';
import "./MyGallery.css"


const MyGallery = () => {

  const path = {
    "1" :  "https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F6%2Fdiaries%2F22%2Fimages%2F1?generation=1718643796434344&alt=media",
    "2" : "https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F7%2Fdiaries%2F23%2Fimages%2F1?generation=1718643856318918&alt=media",
    "3" :"https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F8%2Fdiaries%2F24%2Fimages%2F1?generation=1718643866571072&alt=media",
    "4" : "https://storage.googleapis.com/download/storage/v1/b/jorang/o/posts%2F9%2Fdiaries%2F25%2Fimages%2F1?generation=1718643897600426&alt=media"
  }

  const images = [
    {
      original: path[1],
      thumbnail: path[1],
    },
    {
      original: path[2],
      thumbnail: path[2],
    },
    {
      original: path[3],
      thumbnail: path[3],
    },
    {
      original: path[4],
      thumbnail: path[4],
    },
    {
      original: path[4],
      thumbnail: path[4],
    },
  ];
  
  return <ImageGallery items={images} />;
};

export default MyGallery;

