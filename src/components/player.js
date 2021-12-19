import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Player({
  currentsong,
  isplay,
  setisplay,
  pause,
  setpause,
  audioRef,
  setcurrentsong,
  id,
  i,
  songs,
  setsongs,
}) {
  //states
  const [time, setTime] = useState({
    currentTime: 0,
    durationTime: 0,
    percentage: 0,
  });

  // useEffect
  function activelibrary(nexpre) {
    const newsong = [...songs].map((song) => {
      if (song.id === nexpre.id) {
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
  // event handlers
  function playSongHandler() {
    if (isplay) {
      setpause(faPlay);
      audioRef.current.pause();
      setisplay(false);
    } else {
      setpause(faPause);
      audioRef.current.play();
      setisplay(true);
    }
  }

  function timeHandler(e) {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedcurrent = Math.round(current);
    const roundedduration = Math.round(duration);
    const animationpercentage = Math.round(
      (roundedcurrent / roundedduration) * 100
    );
    console.log(animationpercentage);
    setTime({
      ...time,
      currentTime: current,
      durationTime: duration,
      percentage: animationpercentage,
    });
  }

  function timeFormatter(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  function dragHandler(e) {
    audioRef.current.currentTime = e.target.value;
    setTime({ ...time, currentTime: e.target.value });
  }
  async function skipTrack(direction) {
    let index = [...songs].findIndex((song) => song.id === currentsong.id);
    if (direction === "forward") {
      await setcurrentsong(songs[(index + 1) % songs.length]);
      activelibrary(songs[(index + 1) % songs.length]);
    }
    if (direction === "back") {
      if (index === 0) {
        await setcurrentsong(songs[songs.length - 1]);
        if (isplay) audioRef.current.play();
        activelibrary(songs[songs.length - 1]);
        return;
      }
      await setcurrentsong(songs[index - 1]);
      activelibrary(songs[index - 1]);
    }
    if (isplay) audioRef.current.play();
  }

  async function skipend() {
    let index = [...songs].findIndex((song) => song.id === currentsong.id);

    await setcurrentsong(songs[(index + 1) % songs.length]);
    activelibrary(songs[(index + 1) % songs.length]);
    if (isplay) audioRef.current.play();
  }

  // styles

  const trackAnim = {
    transform: `translateX(${time.percentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-controler">
        <p>{timeFormatter(time.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentsong.color[0]}, ${currentsong.color[1]})`,
          }}
        >
          <input
            type="range"
            min={0}
            max={time.durationTime || "0"}
            value={time.currentTime}
            onChange={dragHandler}
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{time.durationTime ? timeFormatter(time.durationTime) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          id="skip-back"
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrack("back")}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className=" play"
          size="2x"
          icon={pause}
        />
        <FontAwesomeIcon
          className="skip-forword"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrack("forward")}
        />
      </div>
      <audio
        onLoadedMetadata={timeHandler}
        onTimeUpdate={timeHandler}
        src={currentsong.audio}
        ref={audioRef}
        onEnded={skipend}
      ></audio>
    </div>
  );
}
