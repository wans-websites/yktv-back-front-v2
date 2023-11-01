import React, { useEffect, useState } from "react";
import "./Show.css";
import ShowGallery from "./ShowGallery";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  showsForShowMoviesPage,
  showToPlay,
} from "../redux/features/userSlice";

export default function Show({ width, height, top, show, idName }) {
  const dispatch = useDispatch();
  const isEvenTop = parseInt(top.split("v")[0]) % 2 === 0;

  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth < 768
        ? setIsMobileScreen(true)
        : setIsMobileScreen(false);
    });
    window.innerWidth < 768
      ? setIsMobileScreen(true)
      : setIsMobileScreen(false);
  }, []);

  return (
    <>
      {!isMobileScreen ? (
        <div
          id={idName}
          className="show"
          style={{
            width: width,
            height: height,
            top: top,
          }}
        >
          <div className="container">
            <div className={`top-movie ${isEvenTop ? "reverse" : ""}`}>
              <Link
                to={`/watch`}
                className="thumbnail"
                style={{
                  backgroundImage: `url(${show["showMovies"][0]["thumbnail"]})`,
                }}
              ></Link>
              <div className="show-info">
                <h2 className="show-title">{show["showName"]}</h2>
                <p className="show-description">{show["showDescription"]}</p>
                <div className="view-all-btn">
                  <Link
                    to={"/show-content"}
                    onClick={() =>
                      dispatch(showsForShowMoviesPage(show["showMovies"]))
                    }
                    className="view-all-btn-inner-div link"
                  >
                    VIEW ALL
                  </Link>
                </div>
              </div>
            </div>
            <div className="all-movies">
              {Array.from(
                { length: show["showMovies"].length },
                (_, index) =>
                  index < 4 && (
                    <ShowGallery
                      key={index}
                      cardNo={index}
                      movie={show["showMovies"][index]}
                    />
                  )
              )}
              <div className="more-div">
                <Link
                  to={"/show-content"}
                  onClick={() =>
                    dispatch(showsForShowMoviesPage(show["showMovies"]))
                  }
                  className="more-inner-div link"
                >
                  <KeyboardDoubleArrowRightIcon className="more" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link
          className="show"
          style={{
            width: width,
            height: height,
            top: top,
            backgroundImage: `url(${show["showMovies"][0]["thumbnail"]})`,
          }}
          to={"/watch"}
        >
          <h1>{show["showName"]}</h1>
        </Link>
      )}
    </>
  );
}
