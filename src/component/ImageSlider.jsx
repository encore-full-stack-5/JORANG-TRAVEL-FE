// import React, { useState } from "react";

// const ImageSlider = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((currentIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   return (
//     <div className="slider-container">
//       <button onClick={prevSlide} className="slider-button">
//         Prev
//       </button>
//       {images.length > 0 && (
//         <img src={images[currentIndex]} alt="Slide" className="slide-image" />
//       )}
//       <button onClick={nextSlide} className="slider-button">
//         Next
//       </button>
//     </div>
//   );
// };

// export default ImageSlider;
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// const ImageSlider = ({ images }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="slider-container">
//       <Slider {...settings}>
//         {images.map((image, index) => (
//           <div key={index}>
//             <img src={URL.createObjectURL(image)} alt={`slide-${index}`} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default ImageSlider;
