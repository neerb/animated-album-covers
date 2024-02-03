import React, { useEffect, useState } from 'react'
import "./albumstoolbar.css"
import $ from 'jquery';
import { Link, useLocation } from 'react-router-dom';

function ListItem(props) {
    return (
        <Link to={props.routePath} style={{ textDecoration: "none" }}>
            <li className={props.activeSelection} onClick={props.onClick} id={props.passId}>
                <span className='color-albumtitle'>{props.albumTitle}</span>
                <span> ({props.artist})</span>
            </li >
        </Link>
    );
}


function AlbumsToolbar(props) {
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        props.passPause();

        $("*").removeClass("album-selected");
        if (pathname.length > 1) {
            $('#' + pathname.substring(1, pathname.length)).addClass("album-selected");
        }
    }, [location]);


    return (
        <div className='toolbar-wrapper'>
            <div className='album-routes'>
                <ul>
                    {
                        props.albums.map(a => {
                            return <ListItem key={a.albumTitle} passId={a.routePath} routePath={a.routePath} albumTitle={a.albumTitle} artist={a.artist} />
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default AlbumsToolbar
