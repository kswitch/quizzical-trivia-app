import React from 'react'
import topRightImage from './../images/top-right-img.png'

export default function TopRightImage(props) {
    return (
        <div className={`intro-page-img-div-top-right ${props.gameStarted ? 'game-started-top' : '' }`}>
            <img className="intro-page-img top-right" src={topRightImage} alt="Yellow Blob" />
        </div>
    )
}