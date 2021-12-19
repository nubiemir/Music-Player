import React from "react";

export default function Song({ currentsong }) {
  return (
    <div className="song">
      <img src={currentsong.cover} alt={currentsong.name}></img>
      <h2>{currentsong.name}</h2>
      <h3>{currentsong.artist}</h3>
    </div>
  );
}
