import React from "react";
import LibrarySong from "./librarySong";

export default function Library({
  songs,
  setCurrentSong,
  isplay,
  setisplay,
  pause,
  setpause,
  audioRef,
  setsongs,
  open,
}) {
  return (
    <div className={`library ${open ? "active" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {[...songs].map((song, i) => (
          <LibrarySong
            id={song.id}
            key={i}
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            setsongs={setsongs}
            isplay={isplay}
            setisplay={setisplay}
            pause={pause}
            setpause={setpause}
            audioRef={audioRef}
          />
        ))}
      </div>
    </div>
  );
}
