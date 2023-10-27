import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectShowToPlay } from "../../redux/features/userSlice.js";
import Chat from "../../sections/Chat.js";
import "./Watch.css";

export default function Watch() {
  const showToPlay_ = useSelector(selectShowToPlay);

  let videoContainerRef = useRef();
  let watchRef = useRef();
  let chatRef = useRef();
  let chatContainerRef = useRef();

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

  useEffect(() => {
    watchRef.current?.addEventListener("scroll", () => {
      let chatTop = chatRef.current?.getBoundingClientRect().top;
      if (chatTop < 500) {
        videoContainerRef.current.style.transform = "scale(0.5)";
        videoContainerRef.current.style.position = "sticky";
        videoContainerRef.current.style.top = `-10vh`;
        chatContainerRef.current.style.overflowY = "scroll";
      } else {
        videoContainerRef.current.style.transform = "scale(1)";
        videoContainerRef.current.style.position = "relative";
        videoContainerRef.current.style.top = `0`;
        chatContainerRef.current.style.overflowY = "hidden";
      }
    });
  }, [isMobileScreen]);

  return (
    <div ref={watchRef} className="watch">
      <div ref={videoContainerRef} className="video-container">
        <iframe
          src={showToPlay_["movie"]}
          title="Google Video"
          allowFullScreen
          width="100%"
          height="100%"
          allow="autoplay"
          style={{ backgroundColor: "black" }}
        ></iframe>
      </div>
      <Chat ref={chatRef} containerRef={chatContainerRef} />
    </div>
  );
}
