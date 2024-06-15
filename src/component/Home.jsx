import React, { useState } from "react";
import WorldMap from "react-world-map";
import "./Home.css";
import countries from "../countries.js";

const Home = () => {
  const [selectedContinent, setSelectedContinent] = useState();
  const [[top, left], setPosition] = useState([]);
  const [isHomeModalOpen, setIsHomeModalOpen] = useState(false);

  const handleMouseOver = (e) => {
    if (e.target.id.substring(0, 4) === "path")
      switch (e.target.parentNode.id) {
        case "AS":
          document.getElementById("continent").textContent = "아시아";
          setPosition([43, 60]);
          break;
        case "EU":
          document.getElementById("continent").textContent = "유럽";
          setPosition([39, 49]);
          break;
        case "OC":
          document.getElementById("continent").textContent = "오세아니아";
          setPosition([78, 74]);
          break;
        case "AF":
          document.getElementById("continent").textContent = "아프리카";
          setPosition([60, 47]);
          break;
        case "NA":
          document.getElementById("continent").textContent = "북아메리카";
          setPosition([43, 23]);
          break;
        case "SA":
          document.getElementById("continent").textContent = "남아메리카";
          setPosition([71, 29]);
          break;
      }
    else document.getElementById("continent").textContent = null;
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

  return (
    <>
      <div className="world-map-container" onMouseOver={handleMouseOver}>
        <WorldMap onSelect={openModal} />
        <span
          id="continent"
          style={{ top: `${top}%`, left: `${left}%` }}
        ></span>
      </div>
      {isHomeModalOpen ? (
        <div className="bg-modal">
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
                />
              </div>
              <div className="modal-container">
                {countries[selectedContinent].sort().map((country, index) => (
                  <button className="modal-item" key={index}>
                    {country}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Home;
