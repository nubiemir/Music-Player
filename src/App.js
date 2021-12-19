import React, { useState, useRef } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import "../src/styles/app.css";
import Player from "./components/player";
import Song from "./components/song";
import chillHop from "./util";
import Library from "./components/Library";
import Nav from "./components/nav";
function App() {
  // states

  const [songs, setsongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isplay, setisplay] = useState(false);
  const [pause, setpause] = useState(faPlay);
  const audioRef = useRef(null);
  const [open, setopen] = useState(false);

  return (
    <div className="App">
      <Nav open={open} setopen={setopen} />
      <Song currentsong={currentSong} />
      <Player
        currentsong={currentSong}
        setcurrentsong={setCurrentSong}
        songs={songs}
        setsongs={setsongs}
        isplay={isplay}
        setisplay={setisplay}
        pause={pause}
        setpause={setpause}
        audioRef={audioRef}
        open={open}
        setopen={setopen}
        id={currentSong.id}
      />
      <Library
        songs={songs}
        setsongs={setsongs}
        setCurrentSong={setCurrentSong}
        isplay={isplay}
        setisplay={setisplay}
        pause={pause}
        setpause={setpause}
        audioRef={audioRef}
        open={open}
        setopen={setopen}
      />
    </div>
  );
}

export default App;
