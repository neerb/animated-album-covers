import * as React from "react";
import './seraphim.css';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { MdReplayCircleFilled } from "react-icons/md";
import songdata from "./musicselection.json"

const AMPLITUDE_MAX = 255;

let delay = 0;

class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        let songsT = songdata.songs;

        // Shuffle song array
        this.shuffle(songsT);

        this.state = {
            frequencyAmplitudes: Array.from(props.frequencyCount),
            context: null,
            songs: songsT,
            currentSong: songsT[0].source,
            songTitle: songsT[0].title,
            songPos: 0,
            isPlaying: false
        };

        this.pausePlay = this.pausePlay.bind(this);
        this.replay = this.replay.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
        this.playPrevSong = this.playPrevSong.bind(this);
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    pausePlay() {
        console.log(this.state.currentSong);

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

    playNextSong() {
        let audioSource = document.getElementById("drbumper");

        // this.state.context.suspend();
        // audioSource.pause();

        if (this.state.isPlaying)
            this.pausePlay();

        if (this.state.songPos + 1 < this.state.songs.length) {
            this.setState({
                currentSong: this.state.songs[this.state.songPos + 1].source,
                songTitle: this.state.songs[this.state.songPos + 1].title,
                songPos: this.state.songPos + 1
            }, () => {
                try {
                    this.pausePlay();
                } catch (e) {
                    console.log(e);
                }
            });
        }
        else {
            this.setState({
                currentSong: this.state.songs[0].source,
                songTitle: this.state.songs[0].title,
                songPos: 0
            }, () => {
                try {
                    this.pausePlay();
                } catch (e) {
                    console.log(e);
                }
            });
        }

        // this.state.context.resume();
        // audioSource.play();
    }

    playPrevSong() {
        let audioSource = document.getElementById("drbumper");

        // this.state.context.suspend();
        // audioSource.pause();
        if (this.state.isPlaying)
            this.pausePlay();

        if (this.state.songPos - 1 >= 0) {
            this.setState({
                currentSong: this.state.songs[this.state.songPos - 1].source,
                songTitle: this.state.songs[this.state.songPos - 1].title,
                songPos: this.state.songPos - 1
            }, () => {
                this.pausePlay();
            });
        }
        else {
            this.setState({
                currentSong: this.state.songs[this.state.songs.length - 1].source,
                songTitle: this.state.songs[this.state.songs.length - 1].title,
                songPos: this.state.songs.length - 1
            }, () => {
                this.pausePlay();
            });
        }

        // this.pausePlay();

        // this.state.context.resume();
        // audioSource.play();
    }

    // Ensure this.audio has been set by ref calls-back
    componentDidMount() {
        if (this.state.currentSong && typeof window !== 'undefined') {
            // Wire up our audio
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.source = this.audioContext.createMediaElementSource(this.audioRef);
            this.volumeControl = this.audioContext.createGain();
            this.source.connect(this.audioContext.destination);
            this.source.connect(this.volumeControl);

            // Create our analyZer 🇺🇸
            this.analyzer = this.audioContext.createAnalyser();
            this.analyzer.fftSize = this.props.frequencyCount * 2;
            this.volumeControl.connect(this.analyzer);
            this.analyzer.connect(this.audioContext.destination);

            // Analyzer will know user's set volume
            this.volumeControl.gain.value = this.audioRef.volume;

            // Kick off our animation
            this.animate();
            console.log(this.audioContext);
            this.setState({
                context: this.audioContext
            });
        }
    }

    // Constantly get frequency data from audio so that amplitude can be updated
    animate() {
        let frequencyData = new Uint8Array(this.props.frequencyCount);
        this.analyzer.getByteFrequencyData(frequencyData);

        // Without the "bind(this)" silliness, we'll lose the component's context
        requestAnimationFrame(this.animate.bind(this)); // lol

        // Trigger React render with updated frequencyData
        this.setState({
            frequencyAmplitudes: Array.from(frequencyData).map(amplitude => amplitude * 100 / AMPLITUDE_MAX)
        });
    }

    render() {
        let count = 0;
        delay = 0;

        // const s-bars = this.state.frequencyAmplitudes.map(val => {
        //     delay += 15;
        //     return <s-bar amplitude={val} aniDelay={delay} aniDur={((8 * 1000))} />
        // });

        const bars = [...this.state.frequencyAmplitudes].reverse().map(val => {
            // console.log("lh: " + delay);
            // console.log("lh" + count);
            delay += 15;
            count++;
            return <Bar amplitude={val} key={count} aniDelay={delay} aniDur={((8 * 1000))} isPlay={this.state.isPlaying} />
        }).concat(this.state.frequencyAmplitudes.map(val => {
            // console.log("rh: " + delay);
            // console.log("rh" + count);
            delay -= 15;
            count++;
            return <Bar amplitude={val} key={count} aniDelay={delay} aniDur={((8 * 1000))} isPlay={this.state.isPlaying} />
        }));


        // const inverteds-bars = this.state.frequencyAmplitudes.map(val => {
        //     count++;
        //     return <Inverteds-bar amplitude={val} key={count} />
        // });

        const invertedbars = [...this.state.frequencyAmplitudes].reverse().map(val => {
            count++;
            return <InvertedBar amplitude={val} key={count} />
        }).concat(this.state.frequencyAmplitudes.map(val => {
            count++;
            return <InvertedBar amplitude={val} key={count} />
        }));

        return (
            <div id="s-visualizer">
                <div id="controls">
                    {/* add 'controls' prop with no val to see controls */}

                    <audio id='drbumper' onEnded={(e) => {
                        this.playNextSong();
                    }} loop={false} ref={element => this.audioRef = element} src={this.state.currentSong} autoPlay={false} crossOrigin="anonymous">
                    </audio>


                    {/* <button className="play-button" onClick={this.pausePlay}>
                        ??
        </button> */}
                </div>

                <div className="dancing-shapes" onClick={this.pausePlay}>
                    <div className="box">
                    </div>
                    <div className="box">
                    </div>
                    <div className="box">
                    </div>

                    <div className="box">
                    </div>
                    <div className="box">
                    </div>
                </div>

                <div className="now-playing-wrap">
                    <span className="now-playing-left">{"- NOW PLAYING: " + this.state.songTitle}</span>
                    <span className="now-playing-left">{"- NOW PLAYING: " + this.state.songTitle}</span>
                </div>

                <div className="eyewrap">
                    {
                        !this.state.isPlaying
                            ?
                            <div className="not-playing">
                                <p>
                                    - press play -
                                </p>
                            </div>
                            :
                            null
                    }

                    <div className="s-bawrap">
                        <div className="s-bars-wrapper">
                            <div id="inverted-s-bars">
                                {invertedbars}
                            </div>
                        </div>
                        <div className="s-bars-wrapper overlay">
                            <div id="s-bars">
                                {bars}
                            </div>
                        </div>
                    </div>

                    <div className="s-bawrap flip-down">
                        <div className="s-bars-wrapper">
                            <div id="inverted-s-bars">
                                {invertedbars}
                            </div>
                        </div>
                        <div className="s-bars-wrapper overlay">
                            <div id="s-bars">
                                {bars}
                            </div>
                        </div>
                    </div>

                </div>


                <div className="now-playing-wrap">
                    <span className="now-playing-right">{"- NOW PLAYING: " + this.state.songTitle}</span>
                    <span className="now-playing-right">{"- NOW PLAYING: " + this.state.songTitle}</span>
                </div>

                <div id="controls">
                    <hr></hr>

                    <button onClick={this.playPrevSong}>
                        <FaBackward />
                    </button>

                    <button onClick={this.pausePlay}>
                        {(
                            this.state.isPlaying ?
                                <FaPause />
                                :
                                <FaPlay />
                        )}
                    </button>

                    <button onClick={this.replay}>
                        <MdReplayCircleFilled />
                    </button>

                    <button onClick={this.playNextSong}>
                        <FaForward />
                    </button>

                    <hr></hr>
                </div>


                <div className="dancing-shapes" onClick={this.pausePlay}>
                    <div className="box">
                    </div>
                    <div className="box">
                    </div>
                    <div className="box">
                    </div>

                    <div className="box">
                    </div>
                    <div className="box">
                    </div>
                </div>

            </div >
        )
    }
}

function Bar({ amplitude, aniDelay, aniDur, isPlay }) {
    return <div className="s-bar" style={{ height: amplitude + '%', animationPlayState: (isPlay ? "running" : "paused"), animationDelay: aniDelay + "ms", animationDuration: aniDur + "ms" }}></div>
}

function InvertedBar({ amplitude }) {
    return <div className="inverted-s-bar" style={{ height: ((amplitude <= 0) ? (100 - amplitude) : (100 - amplitude - 7)) + '%' }} ></ div >
}

function SeraphimBumper(props) {
    return (
        <div className="s-bumper-wrap">
            <Visualizer frequencyCount={32} audioSource={null} />
        </div>
    );
}

export default SeraphimBumper;