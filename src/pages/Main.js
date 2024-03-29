import * as React from "react"
import "./main.css"
import "../components/AlbumCovers/common.css"
import AlbumsToolbar from "../components/AlbumsToolbar/AlbumsToolbar";
import SonusAuri from "../components/AlbumCovers/SonusAuri";
import Lynx from "../components/AlbumCovers/Lynx";
import Solo from "../components/AlbumCovers/Solo";
import ZeroWave from "../components/AlbumCovers/ZeroWave";
import OutOfTouch from "../components/AlbumCovers/OutOfTouch";
import Seraphim from "../components/AlbumCovers/Seraphim";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Container } from "react-dom";
// import { SwitchTransition } from "react-transition-group";
// import CSSTransition from "react-transition-group";
import { useState } from "react";
import { useEffect } from "react";
import AnimatedRoutes from "./AnimatedRoutes";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdReplayCircleFilled } from "react-icons/md";

// const audioSource = 'https://cdn.pixabay.com/audio/2022/04/25/audio_5d61b5204f.mp3';
// const audioSource = 'https://cdn.pixabay.com/download/audio/2022/05/02/audio_eb4f57e9dc.mp3';
// const audioSource = 'https://audio.jukehost.co.uk/4EwUyGZZgDpi5VpoamnNsP7UcjuahCp6';
// const audioSource = 'https://audio.jukehost.co.uk/SVfuKTIQfieaWcE8tkWJ9fV2A59N0xrf';
// const audioSource = 'https://audio.jukehost.co.uk/TSwcmY1V3H6wLYCOzNHrgIfGMXkTXk5m';
// const audioSource = 'https://audio.jukehost.co.uk/6WEz7HiUlPvwvkJcBpVw42XO3e7ozqvP';
// const audioSource = 'https://audio.jukehost.co.uk/Pmlu8ZT4gCPGdZ5cyhsRuoxqjuEzHLzg';


function MainPage(props) {

  const [covers, setCovers] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState();

  useEffect(() => {
    setCovers([
      {
        albumTitle: "Sonus Auri",
        artist: "admo",
        component: <SonusAuri albumTitle={"Sonus Auri"} artist={"admo"} released={"2019"} setContextFunc={setContext} />,
        // background: "repeating-linear-gradient(45deg,var(--backgroundbiege),var(--backgroundbiege) 50px,var(--backgroundbrown) 50px,var(--backgroundbrown) 100px)",
        background: "linear-gradient(135deg, #000, #ffdead",
        released: "2019",
        routePath: "sonusauri",
      },
      {
        albumTitle: "Lynx",
        artist: "Hotel Pools, Windows 96",
        component: <Lynx albumTitle={"Lynx"} artist={"Hotel Pools, Windows 96"} released={"2020"} setContextFunc={setContext} />,
        background: "linear-gradient(135deg, rgb(156, 114, 37), rgb(46, 46, 46))",
        released: "2020",
        routePath: "lynx",
      },
      {
        albumTitle: "S.O.L.O",
        artist: "Emil Rottmayer",
        component: <Solo albumTitle={"S.O.L.O"} artist={"Emil Rottmayer"} released={"2018"} setContextFunc={setContext} />,
        background: "linear-gradient(135deg, #5f69b8, rgb(44, 49, 87))",
        released: "2018",
        routePath: "solo",
      },
      {
        albumTitle: "Seraphim",
        artist: "Ambulate",
        component: <Seraphim albumTitle={"Seraphim"} artist={"Ambulate"} released={"XXXX"} setContextFunc={setContext} />,
        background: "linear-gradient(135deg, #5f69b8, rgb(44, 49, 87))",
        released: "XXXX",
        routePath: "seraphim",
      },
      // {
      //   albumTitle: "Zero Wave",
      //   artist: "admo",
      //   component: <ZeroWave albumTitle={"Zero Wave"} />,
      //   background: "linear-gradient(135deg, rgb(0, 0, 0), rgb(88, 98, 174))",
      //   routePath: "zeroWave",
      // },
      // {
      //   albumTitle: "Out Of Touch",
      //   artist: "BrotherTiger",
      //   component: <OutOfTouch albumTitle={"Out OF Touch"} />,
      //   background: "linear-gradient(135deg, rgb(106, 164, 27), rgb(177, 3, 225))",
      //   routePath: "outoftouch",
      // },
    ]);
  }, []);

  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  }

  const setContext = (c) => {
    setAudioContext(c);
  }

  const pause = () => {
    let audioSource = document.getElementById("drbumper");

    if (audioSource && audioContext) {
      audioContext.suspend();
      audioSource.pause();
    }
    setIsPlaying(false);
  }

  const pausePlay = () => {
    let audioSource = document.getElementById("drbumper");

    if (audioSource) {
      if (isPlaying) {
        audioContext.suspend();
        audioSource.pause();

        setIsPlaying(false);
      }
      else if (!isPlaying) {
        audioContext.resume();
        audioSource.play();

        setIsPlaying(true);
      }
    }
  }

  const replay = () => {
    let audioSource = document.getElementById("drbumper");

    if (audioSource) {
      audioSource.currentTime = 0;
    }
  }

  const setVolume = (e) => {
    let audioSource = document.getElementById("drbumper");

    if (audioSource) {
      audioSource.volume = e.target.value / 100.0;
    }
  }

  // useEffect(() => {
  //   setSelectedAlbum(covers[0]);
  // }, []);

  return (
    <Router basename="/animated-album-covers">
      <div className="main">
        {
          covers
            ?
            <AlbumsToolbar selectAlbumFunc={selectAlbum} albums={covers} passPause={pause} />
            :
            null
        }

        {/* <div className="main-album-wrap" style={{ backgroundImage: selectedAlbum.background }}> */}
        <AnimatedRoutes albums={covers} />


        {
          !isPlaying && selectedAlbum !== "seraphim" ?
            <div className="press-play">
              <p>
                {
                  selectedAlbum
                    ?
                    "- press play below -"
                    :
                    "- select an album above- "
                }
              </p>
            </div>
            :
            null
        }

        {
          selectedAlbum && selectedAlbum !== "seraphim" ?
            <div className="controls-wrapper">
              <button onClick={pausePlay} className="play-button">
                {(
                  isPlaying ?
                    <FaPause />
                    :
                    <FaPlay />
                )}
              </button>

              <button onClick={replay} className="play-button">
                <MdReplayCircleFilled />
              </button>

              <input type="range" min={0} max={100} defaultValue={100} onChange={setVolume}>
              </input>
            </div>
            :
            null
        }
        {/* </div> */}

        {/* <div className="cover-filter" />

        <div className="zipper-animation-wrap">

        </div> */}
      </div >
    </Router >
  )
}

export default MainPage;