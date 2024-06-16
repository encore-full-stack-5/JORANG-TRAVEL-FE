// import React, { useState } from "react";
// import WorldMap from "react-world-map";
// import "./Home.css";

// const Home = () => {
//   const [selected, setSelected] = useState();
//   const [selectedContinent, setSelectedContinent] = useState();
//   const [x, setX] = useState();
//   const [y, setY] = useState();
//   const handleMouseOver = (e) => {
//     if (e.target.id.substring(0, 4) === "path") {
//       // setSelectedContinent(e.target.parentNode.id);
//       console.log(e.pageX);
//       console.log(e.pageY);
//       // showContinent(e);
//       // document.getElementById("continent").value = e.target.parentNode.id;
//     }
//   };

//   // const showContinent = (e) => {
//   //   e.preventDefault();
//   //   setX(e.pageX);
//   //   setY(e.pageY);
//   // };

//   // const countryInAs = ["한국", "일본", "중국"];

//   return (
//     <>
//       <div className="world-map-container" onMouseOver={handleMouseOver}>
//         <WorldMap selected={selected} onSelect={setSelected} />
//       </div>
//       <span id="continent" style={{ top: `${30}%`, left: `${60}%` }}>
//         안녕하세요
//       </span>
//     </>
//   );
// };

// export default Home;
