import React from "react";
import Hero from "../../sections/ShowHero";
import MovieCard from "../../components/MovieCard";
import "./AllShowMovies.css";
import { useSelector } from "react-redux";
import { selectShowsForShowMoviesPage } from "../../redux/features/userSlice";

export default function AllShowMovies() {
  const allShowsMovies = useSelector(selectShowsForShowMoviesPage);
  console.log(allShowsMovies);
  return (
    <div className="all-show-movies">
      <Hero height={"30vh"} />
      <div className="all-movies">
        {allShowsMovies ? (
          allShowsMovies.map((item, index) => (
            <MovieCard show_details={item} key={index} />
          ))
        ) : (
          <p>No shows or movies available.</p>
        )}
      </div>
    </div>
  );
}
