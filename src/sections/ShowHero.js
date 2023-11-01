import React, { useEffect, useState } from "react";
import "./Hero.css";
import logo from "../assets/img/img1.jpg";
import { SHOWS } from "../data";
import { useLocation } from "react-router-dom";

export default function Hero({ height, top_movie }) {
  const location = useLocation();
  const [showNames, setShowNames] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(false);

  useEffect(() => {
    const uniqueShowNames = [...new Set(SHOWS.map((show) => show.showName))];
    setShowNames(uniqueShowNames);
  }, []);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavOptionClick = (e, showName, index) => {
    const targetDiv = document.getElementById(showName);
    setClickedIndex(index);

    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
    const navOptionList = document.querySelectorAll(".nav-option");
    navOptionList.forEach((navOption) => {
      navOption.classList.remove("clicked");
    });

    e.target.classList.add("clicked");
  };

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${logo})`,
        height: height,
      }}
    >
      <div className="content">
        <h2 className="movie-name">YK TV SHOWS</h2>
        {!isMobileScreen && (
          <p className="movie-description">
            From fun relationship stories on Lock & Key to thrilling car reviews
            on Auto Flex, glamorous homes on Cribz 254, trendy topics on
            TrendyOnTopics, and streetwise chats, we've got it all. YK TV -
            Where Nairobi comes to life!
          </p>
        )}
        {location.pathname === "/shows" && (
          <div className="shows-nav">
            {showNames.map((item, index) => (
              <div
                onClick={(e) => handleNavOptionClick(e, item, index)}
                key={index}
                className={`nav-option ${clickedIndex >= index && "hide"}`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
