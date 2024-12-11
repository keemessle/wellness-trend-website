import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../assets/img/profile.png';
import './userinfo.css'

import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


// 회원 정보 화면//
export default function UserInfo() {
    const userid = localStorage.getItem('userid'); 
    const [posts, setPosts] = useState([]); 
    const [comments, setComments] = useState([]); 
    const [activeTab, setActiveTab] = useState("posts");
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 추가 

    useEffect(() => {
        const fetchUserContent = async () => {
            try {
                // 내가 쓴 게시글 가져오기
                const postResponse = await axios.get(`/api/posts/user/${userid}`);
                setPosts(postResponse.data);

                // 내가 쓴 댓글 가져오기
                const commentResponse = await axios.get(`/api/comments/user/${userid}`);
                setComments(commentResponse.data);
            } catch (error) {
                console.error("사용자 데이터 불러오기 실패:", error);
            }
        };

        fetchUserContent();
    }, [userid]);

    const handleLogout = () => {
        localStorage.removeItem('userid'); 
        window.location.href = '/users'; 
    };

    // 날짜 포맷 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // YYYY-MM-DD 형식으로 변환
    };

    return (
        <div className="user-info">
            <div className="user-header">
                <h1>{userid}님 Info</h1>
                <div className="user-image-container">
                    <img
                        src="./profile.png"
                        alt="User Avatar"
                        className="user-avatar"
                    />
                </div>
                    <p> Welcome😉 {userid}님</p>
                </div>
                <div className="tabs">
                <span
                    className={`tab ${activeTab === "posts" ? "active" : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    내 게시글
                </span>
                <span
                    className={`tab ${activeTab === "comments" ? "active" : ""}`}
                    onClick={() => setActiveTab("comments")}
                >
                    내 댓글
                </span>
            </div>

            {activeTab === "posts" && (
                <div className="userinfo-content">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="item"
                                onClick={() => navigate(`/community/${post.id}`)} // 클릭 시 PostDetail로 이동
                                style={{cursor: "pointer"}} // 커서 스타일 추가
                            >
                                <h3 className="post-title">{post.title}</h3>
                                <p span className="post-date">{post.createdAt}</p>
                            </div>
                        ))
                    ) : (
                        <div className="empty">
                            <p>등록한 게시글이 없습니다.</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "comments" && (
                <div className="userinfo-content">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="item"
                                    onClick={() => navigate(`/community/${comment.postId}`)} // 댓글이 달린 게시물 상세보기로 이동
                                    style={{cursor: "pointer"}}
                            >
                                <p className="comment-text">{comment.content}</p>
                                <span className="comment-date">{formatDate(comment.createdAt)}</span>
                            </div>
                        ))
                    ) : (
                        <div className="empty">
                            <p>등록한 댓글이 없습니다. 지금 바로 새로운 댓글을 등록해보세요!</p>
                        </div>
                    )}
                </div>
            )}
            <button onClick={handleLogout}><FiLogOut /></button>
        </div>
    );
}
