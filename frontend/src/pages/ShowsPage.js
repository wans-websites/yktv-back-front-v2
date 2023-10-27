import React from "react";
import "./ShowsPage.css";
import Hero from "../sections/ShowHero";
import Shows from "../sections/Shows";

export default function ShowsPage() {
  return (
    <div className="shows-page">
      <Hero height={"20vh"} />
      <Shows />
    </div>
  );
}
