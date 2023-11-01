import React, { useState } from "react";
import "./HomeHero.css";
import { Link } from "react-router-dom";

export default function HomeHero({ height, top_movie }) {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  window.addEventListener("resize", () => {
    window.innerWidth < 768
      ? setIsMobileScreen(true)
      : setIsMobileScreen(false);
  });
  return (
    <Link
      to={"/watch"}
      className="home-hero"
      style={{
        backgroundImage: `url(${
          top_movie && top_movie.thumbnail ? top_movie.thumbnail : "Loading..."
        })`,
        height: height,
      }}
    >
      <div className="content">
        <h2 className="movie-name">
          {top_movie && top_movie.title ? top_movie.title : "Loading..."}
        </h2>
        {!isMobileScreen && (
          <p className="movie-description">
            {top_movie && top_movie.description
              ? top_movie.description
              : "Loading..."}
          </p>
        )}
      </div>
    </Link>
  );
}
