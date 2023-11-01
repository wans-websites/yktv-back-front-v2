import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../assets/img/yktv_logo.jpeg";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  let location = useLocation();
  const [currentPath, setCurrentPath] = useState(null);
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    setCurrentPath(location.pathname);
    if (currentPath === "/login") {
      setIsLogin(true);
    } else if (currentPath === "/signup") {
      setIsLogin(false);
    }
  }, [currentPath, isLogin, location.pathname]);
  return (
    <div className="header">
      <div className="content">
        <Link to={"/"}>
          <img src={logo} alt="YK TV logo" />
        </Link>
        <Link to={isLogin ? "/signup" : "/login"} className="header-btn">
          <PersonIcon color="white" />
          {isLogin ? "Sign up" : "Log in"}
        </Link>
      </div>
    </div>
  );
}
