import * as React from "react";
import './musicbumper.css';
const AMPLITUDE_MAX = 255;

class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frequencyAmplitudes: Array.from(props.frequencyCount),
            context: null,
            songPos: 0,
            isPlaying: false
        };
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
        let delay = 0;
        let count = 0;

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

        return (
            <div id="visualizer">
                <div id="controls">
                    {/* add 'controls' prop with no val to see controls */}
                    <audio id='drbumper' loop={true} ref={element => this.audioRef = element} src={this.props.audioSource} autoPlay={false} crossOrigin="anonymous">
                    </audio>
                </div>
                <div className="bars-wrapper">
                    <div id="bars" className="unflip">
                        {bars}
                    </div>
                </div>
            </div >
        )
    }
}

function Bar({ amplitude, aniDelay, aniDur }) {
    return <div className="bar" style={{ height: amplitude + '%', animationDelay: aniDelay + "ms", animationDuration: aniDur + "ms" }}></div>
}

function InvertedBar({ amplitude }) {
    return <div className="inverted-bar" style={{ height: ((amplitude <= 0) ? (100 - amplitude) : (100 - amplitude - 7)) + '%' }} ></ div >
}
function MusicBumper(props) {
    return (
        <div className="bumper-wrap">
            <Visualizer frequencyCount={32} audioSource={props.audioSource} setContextFunc={props.setContextFunc} />
        </div>
    );
}

export default MusicBumper;