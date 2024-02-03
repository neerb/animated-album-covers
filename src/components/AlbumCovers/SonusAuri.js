import * as React from "react"
import "./sonusauri.css"
import "./common.css"
import MusicBumper from "../../components/MusicBumper/MusicBumper"
import cherry from "../../images/cherry.png"
import WaveGuy from "../Animations/WaveGuy";
import MarqueeCard from "../MarqueeCard/MarqueeCard"
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdReplayCircleFilled } from "react-icons/md";
import { animate, motion } from 'framer-motion';

// const titleText = "SONUS AURI";

const audioLink = "https://audio.jukehost.co.uk/IUZyy60KTs4EpTG2DoJNTcIK7NC8gwib";
// const background = "repeating-linear-gradient(45deg,var(--backgroundbiege),var(--backgroundbiege) 50px,var(--backgroundbrown) 50px,var(--backgroundbrown) 100px)";
const background = "linear-gradient(45deg, #5e3333, #49432b";


class SonusAuri extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            context: null,
            isPlaying: false,
        };

        this.pausePlay = this.pausePlay.bind(this);
        this.replay = this.replay.bind(this);
        this.setContext = this.setContext.bind(this);
        this.setVolume = this.setVolume.bind(this);
    }

    componentDidMount() {
        const letters = "!@#$%^&*()<>?{}:~_+2468ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let interval = null;

        document.querySelector("#toptitle").onmouseover = event => {
            let iteration = 0;

            clearInterval(interval);

            interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return this.props.albumTitle[index];
                        }

                        return letters[Math.floor(Math.random() * letters.length)]
                    })
                    .join("");

                if (iteration >= this.props.albumTitle.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        }

        const mouseoverEvent = new Event('mouseover');
        document.querySelector("#toptitle").dispatchEvent(mouseoverEvent);
    }

    setContext(c) {
        this.setState({
            context: c
        });
    }

    pausePlay() {
        let audioSource = document.getElementById("drbumper");

        if (audioSource) {
            console.log("state: " + this.state.context);
            if (this.state.context.state === 'running') {
                this.state.context.suspend();
                audioSource.pause();

                this.setState({
                    isPlaying: false
                })
            }
            else if (this.state.context.state === 'suspended') {
                this.state.context.resume();
                audioSource.play();

                this.setState({
                    isPlaying: true
                })
            }
        }
    }

    replay() {
        let audioSource = document.getElementById("drbumper");

        if (audioSource) {
            audioSource.currentTime = 0;
        }
    }

    setVolume(e) {
        let audioSource = document.getElementById("drbumper");

        if (audioSource) {
            console.log(e.target.value);
            audioSource.volume = e.target.value / 100.0;
        }
    }

    render() {
        return (
            <motion.div
                className="full-wrapper"
                style={{ backgroundImage: background }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {
                    !this.state.isPlaying ?
                        <div className="press-play">
                            <p>
                                - press play below -
                            </p>
                        </div>
                        :
                        null
                }
                <motion.div
                    className="page-wrapper"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", duration: 0.8, }}
                >
                    <div className="sonus-wrapper">
                        <div className="title-text-wrap">
                            <h1 id='toptitle' className="title-text">{this.props.albumTitle}</h1>
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
                                    <MusicBumper audioSource={audioLink} setContextFunc={this.setContext} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="controls-wrapper">
                        <button onClick={this.pausePlay} className="play-button">
                            {(
                                this.state.isPlaying ?
                                    <FaPause />
                                    :
                                    <FaPlay />
                            )}
                        </button>

                        <button onClick={this.replay} className="play-button">
                            <MdReplayCircleFilled />
                        </button>
                        <input type="range" min={0} max={100} defaultValue={100} onChange={this.setVolume}>
                        </input>
                    </div>
                </motion.div>

                <motion.div
                    className="info-about-album-wrap"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", duration: 1, }}
                >
                    <div className="info-about-album">
                        <p>Artist: <span className="color-gold-glow">{this.props.artist}</span></p>
                        <p>Album Title: <span className="color-gold-glow">{this.props.albumTitle}</span></p>
                        <p>Release year: <span className="color-gold-glow">{this.props.released}</span></p>
                    </div>
                </motion.div>
            </motion.div >
        )
    }
}

export default SonusAuri
