import React, { useEffect, useState } from 'react';
import './widgetBottom.css';
import axios from 'axios';
import YouTube from 'react-youtube';

// 슬라이더 효과 추가 : npm install react-slick slick-carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const WidgetBottom = ({ keyword }) => {
    const [videos, setVideos] = useState([]); 
    const [error, setError] = useState(null); 

    const fetchVideos = async () => {
        try {
            const response = await axios.get(`/api/youtube-search`, {
                params: { keyword }
            });

            setVideos(response.data); 
        } catch (err) {
            setError('YouTube API 요청 실패'); // 에러 처리
        }
    };

    useEffect(() => {
        if (keyword) {
            fetchVideos();
        }
    }, [keyword]);

    // 유튜브 플레이어 옵션
    const opts = {
        width: "250",
        height: "150",
        playerVars: { 
            autoplay: 0,
            origin: "http://localhost:3000"
        },
    };

    // react-slick 설정
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        sliderToShow: 1,
        sliderToScroll: 2,
        arrows: true
    };

    return (
        <div className="related-video">
            <div className="video-title">관련 영상</div>
            {error && <div>{error}</div>}
            {/* 유튜브 비디오 리스트 */}
            <div className="video-list">
                <Slider {...sliderSettings}>
                    {videos.map((item) => (
                        <div className="video-item" key={item.videoId}>
                            <YouTube 
                                className="video-player" 
                                videoId={item.videoId} 
                                opts={opts} 
                            />
                            <div className="youtube-title">{item.title}</div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default WidgetBottom;