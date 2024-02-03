import * as React from "react"
import "./solo.css"
import "./common.css"
import MusicBumperSolo from "../MusicBumper/MusicBumperSolo";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdReplayCircleFilled } from "react-icons/md";
import { animate, motion } from 'framer-motion';


// const audioLink = 'https://audio.jukehost.co.uk/SVfuKTIQfieaWcE8tkWJ9fV2A59N0xrf';
// const audioLink = 'https://audio.jukehost.co.uk/4EwUyGZZgDpi5VpoamnNsP7UcjuahCp6';
const audioLink = 'https://audio.jukehost.co.uk/TSwcmY1V3H6wLYCOzNHrgIfGMXkTXk5m';
const background = "linear-gradient(135deg, rgb(0, 0, 0), rgb(44, 49, 87))";


// Actual Lynx Song
// const audioLink = 'https://audio.jukehost.co.uk/nyd2sERYdUrTl9KJnuoPS3gz2Idfqyo4';



class Solo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            context: null,
            isPlaying: false
        };

        this.pausePlay = this.pausePlay.bind(this);
        this.replay = this.replay.bind(this);
        this.setContext = this.setContext.bind(this);
    }

    setContext(c) {
        this.setState({
            context: c
        });
    }

    pausePlay() {
        let audioSource = document.getElementById("drbumper");

        if (audioSource) {
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
                >                    <div className="solo-wrapper">
                        <div className="emil-wrap">
                            <h1 className="emil-r">Emil</h1>
                            <h1 className="emil-r2">Rottmayer</h1>
                        </div>

                        <div className="solo-gradient-circle">

                        </div>

                        <div className="solo-triag-wrap">
                            <div className="solo-gradient-triangle">

                            </div>

                            <h1 className="descend-title">DESCEND</h1>
                        </div>

                        <div className="solo-gradient-box">

                        </div>

                        <div className="solo-color-bars-wrapper">
                            <div className="solo-color-bar">

                            </div>

                            <div className="solo-color-bar">

                            </div>

                            <div className="solo-color-bar">

                            </div>

                            <div className="solo-color-bar">

                            </div>

                            <div className="solo-color-bar">

                            </div>
                        </div>

                        <div className="solo-bumper-wrap">
                            <MusicBumperSolo audioSource={audioLink} setContextFunc={this.setContext} />
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
            </motion.div>
        )
    }
}

export default Solo