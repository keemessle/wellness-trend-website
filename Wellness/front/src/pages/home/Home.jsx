import React from "react";
import './home.css'

export default function Home() {
    return (
        <div className="home">
            <div className="home-top-container">
                <div className="top-image" />
                <h1>Wellness</h1>
                <div className="home-description">
                    <p>Do you know wellness<br/>Do you know wellness</p>
                    <p>Do you know wellness trends<br/>Do you know wellness trends</p>
                </div>
            </div>
            <div className="home-middle-container">
                <div className="image-wrapper">
                    <img src="/img1.jpeg" />
                </div>
                <div className="image-wrapper">
                    <img src="/img2.png" />
                </div>
                <div className="image-wrapper">
                    <img src="/img3.jpg" />
                </div>
            </div>
            <div className="home-bottom-container">
                <p>여긴 바텀</p>
            </div>
        </div>
    )
}