import * as React from "react"
import "./main.css"
import AlbumsToolbar from "../components/AlbumsToolbar/AlbumsToolbar";
import SonusAuri from "../components/AlbumCovers/SonusAuri";
import Lynx from "../components/AlbumCovers/Lynx";
import Solo from "../components/AlbumCovers/Solo";
import ZeroWave from "../components/AlbumCovers/ZeroWave";
import OutOfTouch from "../components/AlbumCovers/OutOfTouch";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Container } from "react-dom";
// import { SwitchTransition } from "react-transition-group";
// import CSSTransition from "react-transition-group";
import { useState } from "react";
import { useEffect } from "react";
import AnimatedRoutes from "./AnimatedRoutes";

// const audioSource = 'https://cdn.pixabay.com/audio/2022/04/25/audio_5d61b5204f.mp3';
// const audioSource = 'https://cdn.pixabay.com/download/audio/2022/05/02/audio_eb4f57e9dc.mp3';
// const audioSource = 'https://audio.jukehost.co.uk/4EwUyGZZgDpi5VpoamnNsP7UcjuahCp6';
// const audioSource = 'https://audio.jukehost.co.uk/SVfuKTIQfieaWcE8tkWJ9fV2A59N0xrf';
// const audioSource = 'https://audio.jukehost.co.uk/TSwcmY1V3H6wLYCOzNHrgIfGMXkTXk5m';
// const audioSource = 'https://audio.jukehost.co.uk/6WEz7HiUlPvwvkJcBpVw42XO3e7ozqvP';
// const audioSource = 'https://audio.jukehost.co.uk/Pmlu8ZT4gCPGdZ5cyhsRuoxqjuEzHLzg';


function MainPage(props) {

  // const [covers, setCovers] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const covers = [
    {
      albumTitle: "Sonus Auri",
      artist: "admo",
      component: <SonusAuri albumTitle={"Sonus Auri"} artist={"admo"} released={"2019"} />,
      // background: "repeating-linear-gradient(45deg,var(--backgroundbiege),var(--backgroundbiege) 50px,var(--backgroundbrown) 50px,var(--backgroundbrown) 100px)",
      background: "linear-gradient(135deg, #000, #ffdead",
      released: "2019",
      routePath: "sonusauri",
    },
    {
      albumTitle: "Lynx",
      artist: "Hotel Pools, Windows 96",
      component: <Lynx albumTitle={"Lynx"} artist={"Hotel Pools, Windows 96"} released={"2020"} />,
      background: "linear-gradient(135deg, rgb(156, 114, 37), rgb(46, 46, 46))",
      released: "2020",
      routePath: "lynx",
    },
    {
      albumTitle: "S.O.L.O",
      artist: "Emil Rottmayer",
      component: <Solo albumTitle={"S.O.L.O"} artist={"Emil Rottmayer"} released={"2018"} />,
      background: "linear-gradient(135deg, rgb(0, 0, 0), rgb(44, 49, 87))",
      released: "2018",
      routePath: "solo",
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
  ];

  const selectAlbum = (album) => {
    // console.log(album);
    setSelectedAlbum(album);
  }

  // useEffect(() => {
  //   setSelectedAlbum(covers[0]);
  // }, []);

  return (
    <Router>
      <div className="main">
        <AlbumsToolbar selectAlbumFunction={selectAlbum} albums={covers} />

        {/* <div className="main-album-wrap" style={{ backgroundImage: selectedAlbum.background }}> */}
        <AnimatedRoutes albums={covers} />
        {/* </div> */}

        {/* <div className="cover-filter" />

        <div className="zipper-animation-wrap">

        </div> */}
      </div >
    </Router >
  )
}

export default MainPage;