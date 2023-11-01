import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ShowGallery.css";

export default function ShowGallery({ cardNo, movie }) {
  const [active, setActive] = useState(false);
  return (
    <Link
      to={`/watch`}
      className={`show-gallery ${cardNo === 0 && "first-card"} ${
        cardNo === 4 && "last-card"
      }`}
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      <div className="container">
        <div
          className={`thumbnail ${active && "active"}`}
          style={{
            backgroundImage: `url(${movie["thumbnail"]})`,
          }}
        >
          <div className={`show-info ${!active && "active"}`}>
            <h4 className="show-title">{movie["title"]}</h4>
            <div className="duration-year">
              <p className="show-year">{movie["year"]}</p>
              <p className="dot">.</p>
              <p className="show-duration">{movie["duration"]}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
