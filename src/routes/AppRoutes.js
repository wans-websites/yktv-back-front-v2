import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Categories from "../pages/categories/Categories";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/registration/signup/Signup";
import Login from "../pages/registration/login/Login";
import MainHeader from "../components/MainHeader";
import ShowsPage from "../pages/ShowsPage";
import Watch from "../pages/watch/Watch";
import AllShowMovies from "../pages/allshowsmovies/AllShowMovies";
import { useState } from "react";

export default function AppRoutes() {
  let location = useLocation();
  const [searchInputText, setSearchInputText] = useState("");

  return (
    <>
      {location.pathname === "/signup" || location.pathname === "/login" ? (
        <>
          <Header />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      ) : (
        <>
          <MainHeader
            searchInputText={searchInputText}
            setSearchInputText={setSearchInputText}
          />
          <Routes>
            <Route
              index
              path="/"
              element={<Home searchInputText={searchInputText} />}
            />
            <Route path="/watch" element={<Watch />} />
            <Route path="/shows" element={<ShowsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/show-content" element={<AllShowMovies />} />
          </Routes>
        </>
      )}
    </>
  );
}
