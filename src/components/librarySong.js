import React from "react";

export default function LibrarySong({
  song,
  setCurrentSong,
  isplay,
  setisplay,
  audioRef,
  songs,
  id,
  setsongs,
}) {
  // state

  async function songSelectHandler() {
    await setCurrentSong(song);
    if (isplay) audioRef.current.play();
    const newsong = [...songs].map((song) => {
      if (song.id === id) {
        return { ...song, active: true };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setsongs(newsong);
  }

  return (
    <div
      onClick={songSelectHandler}
      className={`librarySong ${song.active ? "selected" : null}`}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}
