import React, { useState, useEffect, useRef } from 'react';
import "./common.css"
import { animate, motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import MusicBumper from './Seraphim/SeraphimBumper';

// Actual Lynx Song
const audioLink = 'https://audio.jukehost.co.uk/nyd2sERYdUrTl9KJnuoPS3gz2Idfqyo4';

const styles = {
    background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(99,0,0,1) 17%, rgba(105,0,0,1) 35%, rgba(255,240,152,1) 50%, rgba(105,0,0,1) 65%, rgba(99,0,0,1) 83%, rgba(0,0,0,1) 100%)",
    // backgroundImage: "linear-gradient(var(--bggc) .1em, transparent .1em), linear-gradient(90deg, var(--bggc) .1em, transparent .1em)",
    // backgroundSize: "1.6em 1.6em",
    // backgroundAttachment: "fixed",
};

const swipeConfidenceThreshold = 10000;


const Lynx = (props) => {
    const navigate = useNavigate();

    useEffect(() => {

    }, []);


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
            navigate("/solo");
        }
    };

    return (
        <motion.div
            className="full-wrapper"
            style={styles}
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
                <div className="seraphim-wrapper">
                    <MusicBumper />
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

export default Lynx
