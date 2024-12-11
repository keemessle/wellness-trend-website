import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./favorites.css";

const Favorites = ({ userid }) => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!userid); // 로그인 상태 관리


    useEffect(() => {
        if(!userid){
            setIsLoggedIn(false); // 로그인 상태 false 설정
            return;
        }
        // 사용자 즐겨찾기 데이터 가져오기
        const fetchFavorites = async () => {
            try{
                const response = await axios.get(`/api/favorites?user_id=${userid}`);
                setFavorites(response.data);
            }catch(error){
                console.error("Error fetching favorites", error);

            }
        };
        fetchFavorites();
    }, [userid]);

    // 즐겨찾기 삭제 기능 //
    const removeFavorite = async (exerciseId) => {
        await axios.delete("/api/favorites", {
            data: { user_id: userid, exercise_id: exerciseId },
        });
        setFavorites(favorites.filter((item) => item.exercise_id !== exerciseId));
    };

    // 로그인 화면으로 이동
    const handleLoginRedirect = () => {
        navigate('/login');
    };

    if (!isLoggedIn) {
        // 로그인 되지 않은 경우 화면
        return (
            <div className="login-required-container">
                <h2>로그인이 필요합니다</h2>
                <button className="login-button" onClick={handleLoginRedirect}>Login</button>
            </div>
        );
    }
    // 로그인 상태
    return (
        <div className="favorites-container">
            
            {/* <h3 className="favorites-title">Your Favorites</h3>
            <div className="favorites-list">
                {favorites.length === 0 ? (
                    <p>No favorites.</p>
                ) : (
                    favorites.map((favorite) => (
                        <div key={favorite.exercise_id} className="favorite-card">
                            <h3>{favorite.exercise_name}</h3>
                            <p>Type: {favorite.exercise_type}</p>
                            <button
                                className="remove-btn"
                                onClick={() => removeFavorite(favorite.exercise_id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div> */}
        </div>
    );
};

export default Favorites;
