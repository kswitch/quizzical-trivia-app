import React from 'react'
import bottomLeftImage from './../images/bottom-left-img.png'

export default function BottomLeftImage(props) {
    return (
        <div className={`intro-page-img-div-bottom-left ${props.gameStarted ? 'game-started-bottom' : '' }`}>
            <img className="intro-page-img bottom-left" src={bottomLeftImage} alt="Blue Blob" />
        </div>
    )
}