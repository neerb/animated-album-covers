import * as React from "react";
import './marqueecard.css';

function MarqueeCard(props) {
    return (
        <div className="marquee-wrap">
            <div className="marquee-inner">
                <span className="marquee-left">{"@ ADMO @ ADMO @ AMDO @ ADMO @ ADMO @ AMDO"}</span>
                <span className="marquee-left">{"@ ADMO @ ADMO @ AMDO @ ADMO @ ADMO @ AMDO"}</span>
            </div>
            <div className="marquee-inner">
                <span className="marquee-right">{"@ ADMO @ ADMO @ AMDO @ ADMO @ ADMO @ AMDO"}</span>
                <span className="marquee-right">{"@ ADMO @ ADMO @ AMDO @ ADMO @ ADMO @ AMDO"}</span>
            </div>
            <div className="marquee-inner">
                <span className="marquee-left">{"@ ADMO @ ADMO @ AMDO @ ADMO @ ADMO @ AMDO"}</span>
                <span className="marquee-left">{"@ ADMO @ ADMO @ AMDO @ ADMO @ ADMO @ AMDO"}</span>
            </div>
            <div className="marquee-inner">
                <span className="marquee-right">{"@ ADMO @ ADMO @ AMDO @ ADMO @ ADMO @ AMDO"}</span>
                <span className="marquee-right">{"@ ADMO @ ADMO @ AMDO @ ADMO @ ADMO @ AMDO"}</span>
            </div>
            <div className="marquee-inner">
                <span className="marquee-left">{"@ ADMO @ ADMO @ AMDO @ ADMO @ ADMO @ AMDO"}</span>
                <span className="marquee-left">{"@ ADMO @ ADMO @ AMDO @ ADMO @ ADMO @ AMDO"}</span>
            </div>
            {/* <span className="marquee-right">{"RIGHT->RIGHT->RIGHT->"}</span> */}
        </div>
    );
}

export default MarqueeCard;