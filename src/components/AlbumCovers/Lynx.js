import React, { useState, useEffect, useRef } from 'react';
import "./lynx.css"
import "./common.css"
import MusicBumperLynx from "../MusicBumper/MusicBumperLynx";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdReplayCircleFilled } from "react-icons/md";
import { animate, motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

// Actual Lynx Song
const audioLink = 'https://audio.jukehost.co.uk/nyd2sERYdUrTl9KJnuoPS3gz2Idfqyo4';
const background = "linear-gradient(135deg, rgb(156, 114, 37), rgb(46, 46, 46))";
const swipeConfidenceThreshold = 10000;


const Lynx = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
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
    }, []);


    const setContext = (c) => {
        props.setContextFunc(c);
    };

    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
        if (newDirection >= 1) {
            navigate("/solo");
        } else {
            navigate("/sonusauri");
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
                <div className="lynx-wrapper">
                    <div className="gradient-bg">
                        <MusicBumperLynx audioSource={audioLink} setContextFunc={setContext} />
                    </div>

                    <div className="space-triangle">

                    </div>

                    <div className="gradient-ball">
                        {/* <MusicBumperLynx audioSource={audioLink} isLinked={true} passthru={true} bars={state.barsBack} /> */}
                    </div>

                    <div className="vertical-colors">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                        <div className="bar4"></div>
                        <div className="bar5"></div>
                    </div>
                </div>
                <motion.div
                    className="info-about-album-wrap"
                    initial={{ x: "300%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", duration: 1, }}
                >
                    <div className="info-about-album">
                        <p>Artist: <span className="color-gold-glow">{props.artist}</span></p>
                        <p>Album Title: <span className="color-gold-glow">{props.albumTitle}</span></p>
                        <p>Release year: <span className="color-gold-glow">{props.released}</span></p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default Lynx
