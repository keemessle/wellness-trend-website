import React, { useState, useEffect } from "react";
import axios from "axios";
import "./community.css";
import {useNavigate} from "react-router-dom";
import CreatePostModal from "./CreatePostModal"; 

const Community = () => {
    const [posts, setPosts] = useState([]); 
    const [category, setCategory] = useState("ALL"); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const navigate = useNavigate();

   
    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                category === "ALL"
                    ? "/api/posts"
                    : `/api/posts/category/${category}`
            );
            setPosts(response.data);
        } catch (error) {
            console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [category]);


    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert("검색어를 입력하세요!");
            return;
        }
        try {
            const encodedSearchTerm = encodeURIComponent(searchTerm.trim()); // 검색어를 URL에 적합한 형태로 변환
            const response = await axios.get(`/api/posts/search?keyword=${encodedSearchTerm}`);
            console.log("검색 결과:", response.data); // 디버깅용
            setPosts(response.data);
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
        }
    };

  
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

        const handleOpenModal = () => {
            const userId = localStorage.getItem("userid");
            if (!userId) {
                alert("로그인이 필요합니다.");
                navigate("/login", { state: { redirectTo: "/community" } });
            } else {
                setIsModalOpen(true);
            }
        };

        const handleCloseModal = () => {
            setIsModalOpen(false);
            // 모달이 닫힌 후 게시글 갱신
            fetchPosts();
        };

    return (
        <div className="community-container">
            <div className="community-header">
                <h1>Community</h1>
            </div>

            <div className="community-content">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress} // Enter 키 이벤트 추가
                    />
                    <button onClick={handleSearch}>🔍</button>
                </div>

                <div className="category-filter">
                    {["ALL", "Physical", "Social", "Mental", "Emotional", "Environmental"].map((cat, index) => (
                        <span
                            key={index}
                            className={`category-item ${category === cat ? "active" : ""}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </span>
                    ))}
                </div>
            
                <table className={`post-table ${category !== "ALL" ? "category-hidden" : ""}`}>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Views</th>
                        <th> ♥️ </th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.id} onClick={() => navigate(`/community/${post.id}`, { state: { category } })}>
                            <td>{index + 1}</td>
                            <td>{post.category}</td>
                            <td>{post.title}</td>
                            <td>{post.name}</td>
                            <td>{post.createdAt}</td>
                            <td>{post.views}</td>
                            <td>{post.likes}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="write-button-container">
                    <button className="write-button" onClick={handleOpenModal}>
                        Click Your Thoughts
                    </button>
                </div>
            </div>
            
        <CreatePostModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleCloseModal}
        />
    </div>
    );
};

export default Community;
