import * as React from "react"
import "./lynx.css"
import "./common.css"
import MusicBumperLynx from "../MusicBumper/MusicBumperLynx";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdReplayCircleFilled } from "react-icons/md";
import { animate, motion } from 'framer-motion';


// const audioLink = 'https://audio.jukehost.co.uk/SVfuKTIQfieaWcE8tkWJ9fV2A59N0xrf';
// const audioLink = 'https://audio.jukehost.co.uk/4EwUyGZZgDpi5VpoamnNsP7UcjuahCp6';
// const audioLink = 'https://audio.jukehost.co.uk/TSwcmY1V3H6wLYCOzNHrgIfGMXkTXk5m';


// Actual Lynx Song
const audioLink = 'https://audio.jukehost.co.uk/nyd2sERYdUrTl9KJnuoPS3gz2Idfqyo4';
const background = "linear-gradient(135deg, rgb(156, 114, 37), rgb(46, 46, 46))";


class Lynx extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            context: null,
            isPlaying: false,
            barsBack: []
        };

        this.pausePlay = this.pausePlay.bind(this);
        this.replay = this.replay.bind(this);
        this.setContext = this.setContext.bind(this);
        this.passBarsBack = this.passBarsBack.bind(this);
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            const container = document.querySelector('.lynx-wrapper');
            const layers = document.querySelectorAll('.space-triangle');

            let mouseX = 0;
            let mouseY = 0;
            let speedX = 0.05;
            let speedY = 0.05;
            let isMoving = false;

            container.addEventListener('mousemove', (e) => {
                mouseX = e.clientX / window.innerWidth - 0.5;
                mouseY = e.clientY / window.innerHeight - 0.5;
                isMoving = true;
            });

            function updateParallax() {
                layers.forEach((layer, index) => {
                    const speed = index === 0 ? speedX : speedY;
                    const offsetX = -mouseX * speed * (index + 1) * 2000;
                    const offsetY = -mouseY * speed * (index + 1) * 2000;
                    const rotationX = mouseY * 30 * (index + 1); // Adjust the rotational effect
                    const rotationY = -mouseX * 30 * (index + 1); // Adjust the rotational effect

                    if (isMoving) {
                        layer.style.transition = 'transform 0.3s ease-out'; // Add a smooth transition
                    } else {
                        layer.style.transition = 'transform 0.8s ease-out'; // You can adjust the transition properties accordingly
                    }

                    layer.style.transform = `translate(${offsetX}px, ${offsetY}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
                });

                isMoving = false;

                requestAnimationFrame(updateParallax);
            }


            function updateParallax2() {
                layers.forEach((layer, index) => {
                    const speed = index === 0 ? speedX : speedY;
                    const offsetX = -mouseX * speed * (index + 1) * 100;
                    const offsetY = -mouseY * speed * (index + 1) * 100;
                    const rotationX = mouseY * 10 * (index + 1); // Adjust the rotational effect
                    const rotationY = mouseX * 10 * (index + 1); // Adjust the rotational effect

                    if (isMoving) {
                        container.style.transition = 'transform 0.3s ease-out'; // Add a smooth transition
                    } else {
                        container.style.transition = 'transform 0.3s ease-out'; // You can adjust the transition properties accordingly
                    }

                    container.style.transform = `translate(${offsetX}px, ${offsetY}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
                });

                isMoving = false;

                requestAnimationFrame(updateParallax2);
            }

            updateParallax();
            updateParallax2();
        }
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

    passBarsBack(bars) {
        this.setState({
            barsBack: bars
        });
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
                    <div className="lynx-wrapper">
                        <div className="gradient-bg">
                            <MusicBumperLynx audioSource={audioLink} setContextFunc={this.setContext} passBackFunc={this.passBarsBack} />
                        </div>

                        <div className="space-triangle">

                        </div>

                        <div className="gradient-ball">
                            {/* <MusicBumperLynx audioSource={audioLink} isLinked={true} passthru={true} bars={this.state.barsBack} /> */}
                        </div>

                        <div className="vertical-colors">
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                            <div className="bar4"></div>
                            <div className="bar5"></div>
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

export default Lynx
