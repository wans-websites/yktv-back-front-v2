import React, { useEffect, useState } from "react";
import logo from "../assets/img/yktv_logo.jpeg";
import "./Footer.css";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
import {
  PiTiktokLogoBold,
  PiFacebookLogoBold,
  PiInstagramLogoBold,
} from "react-icons/pi";

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
          <div>
            <a href="https://www.tiktok.com/@yktvonline" className="youtube">
              <PiTiktokLogoBold size={20} style={{ color: "#007aff" }} />
            </a>
            <a href="https://facebook.com/YKTVOnline/" className="fb">
              <PiFacebookLogoBold
                size={20}
                style={{ color: "#007aff", margin: "0 40 0 40" }}
              />
            </a>
            <a
              href="https://www.instagram.com/yktvonline/"
              className="instagram"
            >
              <PiInstagramLogoBold size={20} style={{ color: "#007aff" }} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
