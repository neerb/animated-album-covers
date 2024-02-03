import * as React from "react"
import "./zerowave.css"
import MusicBumperSolo from "../MusicBumper/MusicBumperSolo";


// const audioLink = 'https://audio.jukehost.co.uk/SVfuKTIQfieaWcE8tkWJ9fV2A59N0xrf';
// const audioLink = 'https://audio.jukehost.co.uk/4EwUyGZZgDpi5VpoamnNsP7UcjuahCp6';
const audioLink = 'https://audio.jukehost.co.uk/TSwcmY1V3H6wLYCOzNHrgIfGMXkTXk5m';


// Actual Lynx Song
// const audioLink = 'https://audio.jukehost.co.uk/nyd2sERYdUrTl9KJnuoPS3gz2Idfqyo4';



class ZeroWave extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     const container = document.querySelector('.lynx-wrapper');
    //     const layers = document.querySelectorAll('.space-triangle');

    //     let mouseX = 0;
    //     let mouseY = 0;
    //     let speedX = 0.05;
    //     let speedY = 0.05;
    //     let isMoving = false;

    //     container.addEventListener('mousemove', (e) => {
    //         mouseX = e.clientX / window.innerWidth - 0.5;
    //         mouseY = e.clientY / window.innerHeight - 0.5;
    //         isMoving = true;
    //     });

    //     function updateParallax() {
    //         layers.forEach((layer, index) => {
    //             const speed = index === 0 ? speedX : speedY;
    //             const offsetX = -mouseX * speed * (index + 1) * 2000;
    //             const offsetY = -mouseY * speed * (index + 1) * 2000;
    //             const rotationX = mouseY * 30 * (index + 1); // Adjust the rotational effect
    //             const rotationY = -mouseX * 30 * (index + 1); // Adjust the rotational effect

    //             if (isMoving) {
    //                 layer.style.transition = 'transform 0.3s ease-out'; // Add a smooth transition
    //             } else {
    //                 layer.style.transition = 'transform 0.8s ease-out'; // You can adjust the transition properties accordingly
    //             }

    //             layer.style.transform = `translate(${offsetX}px, ${offsetY}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    //         });

    //         isMoving = false;

    //         requestAnimationFrame(updateParallax);
    //     }

    //     function updateParallax2() {
    //         layers.forEach((layer, index) => {
    //             const speed = index === 0 ? speedX : speedY;
    //             const offsetX = -mouseX * speed * (index + 1) * 100;
    //             const offsetY = -mouseY * speed * (index + 1) * 100;
    //             const rotationX = mouseY * 10 * (index + 1); // Adjust the rotational effect
    //             const rotationY = mouseX * 10 * (index + 1); // Adjust the rotational effect

    //             if (isMoving) {
    //                 container.style.transition = 'transform 0.3s ease-out'; // Add a smooth transition
    //             } else {
    //                 container.style.transition = 'transform 0.3s ease-out'; // You can adjust the transition properties accordingly
    //             }

    //             container.style.transform = `translate(${offsetX}px, ${offsetY}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    //         });

    //         isMoving = false;

    //         requestAnimationFrame(updateParallax2);
    //     }

    //     updateParallax();
    //     updateParallax2();
    // }

    render() {
        return (
            <div className="zero-wrapper">

            </div>
        )
    }
}

export default ZeroWave