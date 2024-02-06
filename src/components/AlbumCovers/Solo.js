import * as React from "react"
import "./solo.css"
import "./common.css"
import MusicBumperSolo from "../MusicBumper/MusicBumperSolo";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdReplayCircleFilled } from "react-icons/md";
import { animate, motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";


// const audioLink = 'https://audio.jukehost.co.uk/SVfuKTIQfieaWcE8tkWJ9fV2A59N0xrf';
const audioLink = 'https://audio.jukehost.co.uk/4EwUyGZZgDpi5VpoamnNsP7UcjuahCp6';
// const audioLink = 'https://audio.jukehost.co.uk/TSwcmY1V3H6wLYCOzNHrgIfGMXkTXk5m';
const background = "linear-gradient(135deg, #444b83, rgb(44, 49, 87))";
const swipeConfidenceThreshold = 10000;

const Solo = (props) => {
    const navigate = useNavigate();

    const setContext = (c) => {
        props.setContextFunc(c);
    };

    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {


        if (newDirection >= 1) {
            navigate("/sonusauri");
        } else {
            navigate("/lynx");
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
                <div className="solo-wrapper">
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
                        <MusicBumperSolo audioSource={audioLink} setContextFunc={setContext} />
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
        </motion.div>
    )
}

export default Solo