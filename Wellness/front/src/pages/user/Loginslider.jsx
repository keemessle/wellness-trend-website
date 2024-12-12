import React, { useState } from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import "./loginslider.css";

export default function LoginSlider() {
    // const [isSignUp, setIsSignUp] = useState(false);    // 기본값은 로그인 모드
    const [activeForm, setActiveForm] = useState("");
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); // 이전 경로 가져오기

    // const toggleMode = () => {
    //     setIsSignUp(!isSignUp);
    //     setErrorMessage("");
    //     setUserid(""); 
    //     setPassword(""); 
    //     setConfirmPassword("");
    // };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/login", { userid, password });
            if (response.status === 200) {
                alert("로그인 성공");
                localStorage.setItem("userid", userid);

                // 리다이렉션 경로 확인
                const redirectTo = location.state?.redirectTo || "/"; // 없으면 홈 화면
                navigate(redirectTo);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage("아이디 또는 비밀번호를 확인하세요.");
            }
        }
    };

    // 회원가입 요청
    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/signup", { userid, password });
            if (response.status === 201) {
                alert("회원가입 성공");

                // 회원가입 성공 시 로그인 창으로 이동
                setActiveForm("signin");
                setUserid("");             // 입력 필드 초기화
                setPassword("");
                setConfirmPassword("");
                setErrorMessage("");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage("이미 존재하는 아이디입니다.");
            } else if (error.response && error.response.status === 400) {
                setErrorMessage("입력값이 유효하지 않습니다.");
            }
        }
    };

    return (
        <div className="slider-container">
            <div className={`forms-container ${activeForm ? "active" : ""}`}>
                {/* 로그인 폼 */}
                {activeForm === "signin" && (
                    <div className="sign-in-container">
                        <form className="sign-in-form" onSubmit={handleLogin}>
                            <h3>Welcome Back!</h3>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <input
                                type="text"
                                placeholder="ID"
                                value={userid}
                                onChange={(e) => setUserid(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn sign-in-btn">SIGN IN</button>
                        </form>
                    </div>
                )}

                {/* 회원가입 폼 */}
                {activeForm === "signup" && (
                    <div className="sign-up-container">
                        <form className="sign-up-form" onSubmit={handleSignup}>
                            <h3>New here?</h3>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <input
                                type="text"
                                placeholder="ID"
                                value={userid}
                                onChange={(e) => setUserid(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn sign-up-btn">SIGN UP</button>
                        </form>
                    </div>
                )}
            </div>

            {/* 오버레이 */}
            <div className="overlay-container">
                <div className="overlay">
                    {/* Overlay Left */}
                    <div 
                        className={`overlay-panel overlay-left ${
                            activeForm === "signin" ? "hidden" : ""
                        }`}
                    >
                        <h3>Welcome Back!</h3>
                        <p className="overlay-description">Sign in to continue enjoying our amazing platform.</p>
                        <button className="btn transparent" onClick={() => setActiveForm("signin")}>
                            SIGN IN
                        </button>
                    </div>
                    {/* Overlay Right */}
                    <div
                        className={`overlay-panel overlay-right ${
                            activeForm === "signup" ? "hidden" : ""
                        }`}
                    >
                        <h3>New here?</h3>
                        <p className="overlay-description">Sign up to explore more features and enjoy our services.</p>
                        <button className="btn transparent" onClick={() => setActiveForm("signup")}>
                            SIGN UP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}