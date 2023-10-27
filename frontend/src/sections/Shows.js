import React from "react";
import "./Shows.css";
import Show from "../components/Show.js";
import { SHOWS } from "../data";

export default function Shows() {
  let width = 95;
  let height = 75;
  let top = 10;

  return (
    <div className="shows">
      {Array.from({ length: SHOWS.length }, (_, index) => (
        <Show
          idName={SHOWS[index]["showName"]}
          key={index}
          width={`${width - (index + 1)}vw`}
          height={`${height - (index + 1)}vh`}
          top={`${top + index}vh`}
          show={SHOWS[index]}
        />
      ))}
    </div>
  );
}
