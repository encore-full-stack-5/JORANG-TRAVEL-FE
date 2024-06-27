import React, { useState } from "react";
import WorldMap from "react-world-map";
import "./Home.css";
import countries from "../countries.js";
import { Link } from "react-router-dom";

const Home = () => {
  const [selectedContinent, setSelectedContinent] = useState();
  const [[top, left], setPosition] = useState([]);
  const [isHomeModalOpen, setIsHomeModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [hoveredContinent, setHoveredContinent] = useState("");

  const handleMouseOver = (e) => {
    console.log(e);
    if (e.target.nodeName === "path") {
      switch (e.target.parentNode.id) {
        case "AS":
          setHoveredContinent("아시아");
          setPosition([43, 60]);
          break;
        case "EU":
          setHoveredContinent("유럽");
          setPosition([39, 49]);
          break;
        case "OC":
          setHoveredContinent("오세아니아");
          setPosition([78, 74]);
          break;
        case "AF":
          setHoveredContinent("아프리카");
          setPosition([60, 47]);
          break;
        case "NA":
          setHoveredContinent("북아메리카");
          setPosition([43, 23]);
          break;
        case "SA":
          setHoveredContinent("남아메리카");
          setPosition([71, 29]);
          break;
      }
    } else if (e.target.nodeName === "svg") {
      setHoveredContinent("");
    }
  };

  const openModal = (e) => {
    setIsHomeModalOpen(true);
    if (e === "as") setSelectedContinent("아시아");
    else if (e === "eu") setSelectedContinent("유럽");
    else if (e === "oc") setSelectedContinent("오세아니아");
    else if (e === "af") setSelectedContinent("아프리카");
    else if (e === "na") setSelectedContinent("북아메리카");
    else setSelectedContinent("남아메리카");
  };

  const closeModal = () => {
    setIsHomeModalOpen(false);
  };

  const handleInputValue = (e) => {
    setSearch(e.target.value);
  };

  const clickOutsideModal = (e) => {
    if (e.target.className == "bg-modal") {
      setIsHomeModalOpen(false);
    }
  };

  return (
    <>
      <div className="world-map-container" onMouseOver={handleMouseOver}>
        <WorldMap onSelect={openModal} />
        <span id="continent" style={{ top: `${top}%`, left: `${left}%` }}>
          {hoveredContinent}
        </span>
      </div>
      {isHomeModalOpen && (
        <div className="bg-modal" onClick={clickOutsideModal}>
          <div className="home-modal">
            <div className="modal-content">
              <div className="button-container">
                <button className="close-button" onClick={closeModal}>
                  X
                </button>
              </div>
              <div className="inline-container">
                <span className="selected-continent">{selectedContinent}</span>
                <input
                  type="text"
                  className="home-input"
                  placeholder="여행하고 싶은 나라를 입력해주세요"
                  onChange={handleInputValue}
                />
              </div>
              <div className="modal-container">
                {Object.keys(countries[selectedContinent])
                  .sort()
                  .map((countryInKorean, index) =>
                    countryInKorean.includes(search) ? (
                      <Link
                        className="modal-item"
                        key={index}
                        to={`/posts/country/${countries[selectedContinent][countryInKorean]}/intro`}
                      >
                        {countryInKorean}
                      </Link>
                    ) : null
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
