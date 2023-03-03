import React from 'react'

export default function IntroPage(props) {
    return (
        <div className="intro-page">
            <h2 className="intro-page-title">Quizzical</h2>
            <p className="intro-page-text">Some description if needed</p>
            <button onClick={props.gameStarted} className="intro-page-btn btn">Start Quiz</button>
        </div>
    )
}