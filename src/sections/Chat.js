import React, { useState } from "react";
import "./Chat.css";

const Chat = React.forwardRef(({ containerRef }, ref) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  window.addEventListener("resize", () => {
    window.innerWidth < 768
      ? setIsMobileScreen(true)
      : setIsMobileScreen(false);
  });
  return (
    <div ref={ref} className={`chat ${isMobileScreen && "mobile-view"}`}>
      <div ref={containerRef} className="container">
        <div className="comment-input-div">
          <textarea
            rows={3}
            cols={isMobileScreen ? 30 : 50}
            placeholder="comment"
          />
          <div className="comment-btn">Comment</div>
        </div>

        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className="comment">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              nisi, facere odit, accusantium voluptas veniam quas placeat
              similique deserunt officiis beatae rerum tenetur eligendi?
              Doloribus dolorum laboriosam id excepturi maiores!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});
export default Chat;
