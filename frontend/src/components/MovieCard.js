import React, { useState } from "react";
import { Link } from "react-router-dom";
import { showToPlay } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import "./MovieCard.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export default function MovieCard({ cardNo, show_details }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  return (
    <Link
      onClick={() => {
        dispatch(showToPlay(show_details));
      }}
      to={`/watch`}
      className={`movie-card ${cardNo === 0 && "first-card"} ${
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
            backgroundImage: `url(${show_details["thumbnail"]})`,
          }}
        ></div>
        <div className={`movie-info ${!active && "active"}`}>
          <div>
            <h4 className="movie-title">{show_details["title"]}</h4>
            <p className="movie-year">2023</p>
          </div>
          <div className="duration-likes">
            <div className="duration">
              <AccessTimeIcon className="clock-icon" />
              <p className="movie-duration">{show_details["duration"]}</p>
            </div>
            <div className="likes">
              <ThumbUpOffAltIcon className="like-icon" />
              <p className="movie-likes">123</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
