import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/img1.jpg";
import { SHOWS } from "../data";

export default function Hero({ height, top_movie }) {
  const [showNames, setShowNames] = useState([]);
  useEffect(() => {
    const uniqueShowNames = [...new Set(SHOWS.map((show) => show.showName))];
    setShowNames(uniqueShowNames);
  }, []);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  window.addEventListener("resize", () => {
    window.innerWidth < 768
      ? setIsMobileScreen(true)
      : setIsMobileScreen(false);
  });
  return (
    <Link
      to={"/watch"}
      className="hero"
      style={{
        backgroundImage: `url(${logo})`,
        height: height,
      }}
    >
      <div className="content">
        <h2 className="movie-name">YKTV SHOWS</h2>
        {!isMobileScreen && (
          <p className="movie-description">
            From fun relationship stories on Lock & Key to thrilling car reviews
            on Auto Flex, glamorous homes on Cribz 254, trendy topics on
            TrendyOnTopics, and streetwise chats, we've got it all. YK TV -
            Where Nairobi comes to life!
          </p>
        )}
        <div className="shows-nav">
          {showNames.map((item, index) => (
            <div key={index} className="nav-option">
              {item}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
