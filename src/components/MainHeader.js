import React, { useEffect, useState } from "react";
import "./MainHeader.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../assets/img/yktv_logo.jpeg";
import MenuIcon from "@mui/icons-material/Menu";
import { selectUser } from "../redux/features/userSlice";
import { useSelector } from "react-redux";

export default function MainHeader({ searchInputText, setSearchInputText }) {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth < 992
        ? setIsMobileScreen(true)
        : setIsMobileScreen(false);
    });
    window.innerWidth < 992
      ? setIsMobileScreen(true)
      : setIsMobileScreen(false);
  }, []);

  useEffect(() => {
    console.log(searchInputText);
  }, [searchInputText]);
  return (
    <div className="main-header">
      <div className="container">
        <Link
          onClick={() => setIsMobileNavActive(false)}
          to={"/"}
          className="logo link"
        >
          <img src={logo} alt="" />
        </Link>
        <div
          className={`nav-items ${isMobileScreen && "mobile-view"} ${
            isMobileNavActive && "active"
          }`}
        >
          <nav>
            {isMobileNavActive && (
              <div className="search-div">
                <SearchIcon />
                <input
                  type="text"
                  value={searchInputText}
                  onChange={(e) => setSearchInputText(e.target.value)}
                />
              </div>
            )}
            <Link
              onClick={() => setIsMobileNavActive(false)}
              className="link nav-item"
              to={"/"}
            >
              Home
            </Link>
            <Link
              onClick={() => setIsMobileNavActive(false)}
              className="link nav-item"
              to={"/shows"}
            >
              Shows
            </Link>
          </nav>
          {!isMobileNavActive && (
            <div className="search-div">
              <SearchIcon />
              <input
                type="text"
                name="search-text"
                id="search-text"
                value={searchInputText}
                onChange={(e) => setSearchInputText(e.target.value)}
              />
            </div>
          )}

          {!user ? (
            <div className="nav">
              <Link
                onClick={() => setIsMobileNavActive(false)}
                to={"/signup"}
                className="link nav-item"
              >
                Signup
              </Link>
              <Link
                onClick={() => setIsMobileNavActive(false)}
                to={"/login"}
                className="login link"
              >
                <PersonIcon />
                Login
              </Link>
            </div>
          ) : (
            <div className="profile">
              <Link
                onClick={() => setIsMobileNavActive(false)}
                to={"/profile"}
                className="link"
              >
                <AccountCircleIcon className="profile-avatar" />
              </Link>
            </div>
          )}
        </div>
        {isMobileScreen && (
          <MenuIcon
            className={`menu-icon ${isMobileScreen && "active"}`}
            onClick={() =>
              setIsMobileNavActive((current) => (current = !current))
            }
          />
        )}
      </div>
    </div>
  );
}
