import React, { useEffect, useState } from "react";
import logo from "../assets/img/yktv_logo.jpeg";
import "./Footer.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Footer() {
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
    <div className="footer">
      {!isMobileScreen && (
        <>
          <div className="feedback">Feedback</div>
          <div className="help">Help</div>
          <div className="faq">FAQ</div>
        </>
      )}
      <div className="logo-footer">
        <img src={logo} alt="YKTV logo" />
        <p>©2023 All rights reserved</p>
      </div>
      {!isMobileScreen && (
        <div className="social-platforms">
          Follow us on
          <div className="youtube">
            <YouTubeIcon />
          </div>
          <div className="fb">
            <FacebookIcon />
          </div>
          <div className="instagram">
            <InstagramIcon />
          </div>
        </div>
      )}
    </div>
  );
}
