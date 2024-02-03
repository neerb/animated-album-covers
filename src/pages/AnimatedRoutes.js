import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes(props) {
    return (
        <AnimatePresence>
            <Routes>
                <Route path="/" element={
                    <div className='home'>

                    </div>} />
                {
                    props.albums.map(a => {
                        return <Route path={"/" + a.routePath} element={a.component} key={a.routePath} />
                    })
                }
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
