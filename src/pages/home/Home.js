import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import "./Home.css";
import { SHOWS } from "../../data";
import HomeHero from "../../sections/HomeHero";
export default function Home({ searchInputText }) {
  const [movies, setMovies] = useState([]);
  const [totalViewsList, setTotalViewsList] = useState([]);
  const [weeklyViewsList, setWeeklyViewsList] = useState([]);
  const [dailyViewsList, setDailyViewsList] = useState([]);
  const [ysktvShows, setYsktvShows] = useState([]);

  useEffect(() => {
    for (let i = 0; i < SHOWS.length; i++) {
      for (let j = 0; j < SHOWS[i]["showMovies"].length; j++) {
        setMovies((prevList) => [...prevList, SHOWS[i]["showMovies"][j]]);
      }
    }
  }, []);

  useEffect(() => {
    let allMovies = [];
    for (const show of SHOWS) {
      allMovies = allMovies.concat(show.showMovies);
    }

    const sortedPopularMovies = allMovies.sort(
      (a, b) => b.totalViews - a.totalViews
    );
    const popularMovies = sortedPopularMovies.slice(0, 4);
    setTotalViewsList(popularMovies);

    const sortedTrendingMovies = allMovies.sort((a, b) => {
      const aLatestWeekViews = a.weeklyViews[a.weeklyViews.length - 1] || 0;
      const bLatestWeekViews = b.weeklyViews[b.weeklyViews.length - 1] || 0;
      return bLatestWeekViews - aLatestWeekViews;
    });
    const trendingMovies = sortedTrendingMovies.slice(0, 4);
    setWeeklyViewsList(trendingMovies);

    const sortedBingeMovies = allMovies.sort((a, b) => {
      const aLatestDayViews =
        a.dailyWatchTime[a.dailyWatchTime.length - 1] || 0;
      const bLatestDayViews =
        b.dailyWatchTime[b.dailyWatchTime.length - 1] || 0;
      return bLatestDayViews - aLatestDayViews;
    });
    const bingeMovies = sortedBingeMovies.slice(0, 4);
    setDailyViewsList(bingeMovies);

    let YKTVshows = [];
    for (const movie of allMovies) {
      if (movie["isYKTVshow"]) {
        YKTVshows = YKTVshows.concat(movie);
      }
    }
    setYsktvShows(YKTVshows);
  }, []);

  return (
    <div className="home">
      <HomeHero height={"50vh"} top_movie={movies[4]} />
      <div className="all-movies">
        <h2>
          Trending <span>.</span>
        </h2>
        <div className="movies">
          {weeklyViewsList?.map(
            (movie, index) =>
              index < 5 && <MovieCard key={index} show_details={movie} />
          )}
        </div>
        <h2>
          Popular <span>.</span>
        </h2>
        <div className="movies">
          {totalViewsList?.map(
            (movie, index) =>
              index < 4 && <MovieCard key={index} show_details={movie} />
          )}
        </div>
        <h2>
          Binge <span>.</span>
        </h2>
        <div className="movies">
          {dailyViewsList?.map(
            (movie, index) =>
              index < 4 && <MovieCard key={index} show_details={movie} />
          )}
        </div>
        <h2>
          YKTV Originals <span>.</span>
        </h2>
        <div className="movies">
          {ysktvShows?.map(
            (movie, index) =>
              index < 4 && <MovieCard key={index} show_details={movie} />
          )}
        </div>
      </div>
    </div>
  );
}
