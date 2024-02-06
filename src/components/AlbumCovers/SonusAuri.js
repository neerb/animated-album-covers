import React, { useState, useEffect, useRef } from 'react';
import "./sonusauri.css"
import "./common.css"
import MusicBumper from "../../components/MusicBumper/MusicBumper"
import cherry from "../../images/cherry.png"
import WaveGuy from "../Animations/WaveGuy";
import MarqueeCard from "../MarqueeCard/MarqueeCard"
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom"

// const titleText = "SONUS AURI";

const audioLink = "https://audio.jukehost.co.uk/IUZyy60KTs4EpTG2DoJNTcIK7NC8gwib";
// const background = "repeating-linear-gradient(45deg,var(--backgroundbiege),var(--backgroundbiege) 50px,var(--backgroundbrown) 50px,var(--backgroundbrown) 100px)";
const background = "linear-gradient(45deg, #5e3333, #49432b";
const swipeConfidenceThreshold = 10000;

const SonusAuri = (props) => {
    const navigate = useNavigate();
    const topTitleRef = useRef(null);

    // Equivalent of componentDidMount and componentWillUnmount using useEffect
    useEffect(() => {
        const letters = "!@#$%^&*()<>?{}:~_+2468ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let interval = null;

        const animateTitle = (event) => {
            let iteration = 0;

            clearInterval(interval);

            interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return props.albumTitle[index];
                        }

                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");

                if (iteration >= props.albumTitle.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        };

        if (topTitleRef.current) {
            topTitleRef.current.addEventListener('mouseover', animateTitle);

            // Dispatch mouseover event to start the animation on mount
            const mouseoverEvent = new Event('mouseover');
            topTitleRef.current.dispatchEvent(mouseoverEvent);
        }

        // Cleanup function equivalent to componentWillUnmount
        return () => {
            if (topTitleRef.current) {
                topTitleRef.current.removeEventListener('mouseover', animateTitle);
            }
            clearInterval(interval);
        };
    }, [props.albumTitle]); // This effect depends on `props.albumTitle`


    const setContext = (c) => {
        props.setContextFunc(c);
    };

    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
        if (newDirection >= 1) {
            navigate("/lynx");
        } else {
            navigate("/solo");
        }
    };

    return (
        <motion.div
            className="full-wrapper"
            style={{ backgroundImage: background }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="page-wrapper"
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", duration: 0.8 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                    }
                }}
            >
                <div className="sonus-wrapper">
                    <div className="title-text-wrap">
                        <h1 id='toptitle' className="title-text">{props.albumTitle}</h1>
                    </div>

                    <div className="title-bars">
                        <h1 className="compilation-text">Compilation</h1>
                        <hr className="bar-color1"></hr>
                        <hr className="bar-color2"></hr>
                        <hr className="bar-color1"></hr>
                    </div>

                    <div className="main-visual-wrapper">
                        <div className="visual-division column-left">
                            <div className="fluctuation-box border-color2">
                                <MarqueeCard />
                            </div>

                            <div className="orbital-box">
                                <div className="orbital1 orbital-border2 rotate-left flex-center">
                                    <div className="orbital1 orbital-border1 rotate-right flex-center">
                                        <div className="orbital1 orbital-border2 rotate-left flex-center">
                                            <div className="orbital1 orbital-border1 rotate-right flex-center">
                                                <div className="orbital1 orbital-border2 rotate-left flex-center">
                                                    <div className="orbital1 orbital-border1 rotate-right flex-center">
                                                        <div className="orbital1 orbital-border2 rotate-left flex-center">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="spin-ovals-wrap flex-center rotateani-r">
                                    <div className="hide-ovals oval flex-center rotateani">
                                        <div className="oval flex-center rotateani">
                                            <div className="oval flex-center rotateani">
                                                <div className="oval flex-center rotateani">
                                                    <div className="oval flex-center rotateani">
                                                        <div className="oval flex-center rotateani">
                                                            <div className="oval flex-center rotateani">
                                                                <div className="oval flex-center rotateani">
                                                                    <div className="oval flex-center rotateani">
                                                                        <div className="oval flex-center rotateani">
                                                                            <div className="oval flex-center rotateani">
                                                                                <div className="oval flex-center rotateani">
                                                                                    <div className="oval flex-center rotateani">
                                                                                        <div className="oval flex-center rotateani">

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="parallax-box1 border-color1">
                                <WaveGuy />
                            </div>
                        </div>

                        <div className="visual-division column-right">
                            <div className="text-info-box">
                                A finely curated collection of today's best electronic music.
                                Each one of these tracks was hand picked and created
                                specifically for this compilation.
                                Please enjoy the sounds of audio gold.
                                <img src={cherry} className="info-image"></img>
                            </div>

                            <div className="parallax-box2 border-color2">

                            </div>

                            <div className="music-visualizer-wrap border-color1">
                                <MusicBumper audioSource={audioLink} setContextFunc={setContext} />
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
            <motion.div
                className="info-about-album-wrap"
                initial={{ y: "300%" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", duration: 1, }}
            >
                <div className="info-about-album">
                    <p>Artist: <span className="color-gold-glow">{props.artist}</span></p>
                    <hr></hr>
                    <p>Album Title: <span className="color-gold-glow">{props.albumTitle}</span></p>
                    <hr></hr>
                    <p>Release year: <span className="color-gold-glow">{props.released}</span></p>
                </div>
            </motion.div>
        </motion.div >
    )
}

export default SonusAuri
