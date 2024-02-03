import * as React from "react";
import './musicbumper.css';
const AMPLITUDE_MAX = 255;

class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frequencyAmplitudes: Array.from(props.frequencyCount),
            isPlaying: true
        };
    }

    pausePlay() {
        if (!this.state.passthru) {
            let audioSource = document.getElementById("drbumper");
            audioSource.currentTime = 0;
            audioSource.play();
            console.log(audioSource);
        }
    }

    // Ensure this.audio has been set by ref callback
    componentDidMount() {
        // Wire up our audio
        if (!this.audioContext) {
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

            this.props.setContextFunc(this.audioContext);
        }
    }


    // Constantly get frequency data from audio so that amplitude can be updated
    animate() {

        if (!this.props.passthru) {
            let frequencyData = new Uint8Array(this.props.frequencyCount);
            this.analyzer.getByteFrequencyData(frequencyData);

            // Without the "bind(this)" silliness, we'll lose the component's context
            requestAnimationFrame(this.animate.bind(this)); // lol

            // Trigger React render with updated frequencyData
            this.setState({
                frequencyAmplitudes: Array.from(frequencyData).map(amplitude => amplitude * 100 / AMPLITUDE_MAX)
            });
        }
        else {
            // requestAnimationFrame(this.animate.bind(this)); // lol
            console.log(this.props.bars);
        }

    }

    render() {
        let delay = 0;
        let bars = [];
        let count = 0;

        if (!this.props.passthru) {
            bars = this.state.frequencyAmplitudes.map(val => {
                delay += 15;
                return <Bar amplitude={val} key={count++} aniDelay={delay} aniDur={((8 * 1000))} />
            });

            // this.props.passBackFunc(bars);
        }

        return (
            <div id="visualizer">
                <div id="controls">
                    {/* add 'controls' prop with no val to see controls */}
                    <audio id='drbumper' loop={true} ref={element => this.audioRef = element} src={this.props.audioSource} autoPlay={false} crossOrigin="anonymous">
                    </audio>
                </div>
                <div className="bars-wrapper bars-wrapper-lynx">
                    <div id="bars" className="unflip">
                        {
                            !this.props.passthru ?
                                bars
                                :
                                this.props.bars
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function Bar({ amplitude, aniDelay, aniDur }) {
    return <div className="bar bar-refactor-lynx" style={{ height: amplitude + '%', animationDelay: aniDelay + "ms", animationDuration: aniDur + "ms" }}></div>
}

function MusicBumperLynx(props) {
    return (
        <div className="bumper-wrap nobgcolor">
            <Visualizer frequencyCount={64} audioSource={props.audioSource} setContextFunc={props.setContextFunc} passBackFunc={props.passBackFunc} passthru={props.passthru} bars={props.bars} />
        </div>
    );
}

export default MusicBumperLynx;