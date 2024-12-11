import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./editpost.css";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const location = useLocation();
    const previousCategory = location.state?.category || "ALL"; // 이전 카테고리

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                const { title, content, category } = response.data;
                setTitle(title);
                setContent(content);
                setCategory(category);
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
            }
        };
        fetchPost();
    }, [id]);

    // 게시글 수정 //
    const handleSubmit = async () => {
        const name = localStorage.getItem("userid");
        try {
            await axios.put(`/api/posts/${id}`, { title, content, category, name });
            alert("게시글이 수정되었습니다.");
            navigate(`/community/${id}`, { replace: true });// 수정 후 상세 페이지로 이동(replace 걸어줘서 수정 이력 덮음)
        } catch (error) {
            console.error("게시글 수정 실패:", error);
            alert("게시글 수정 중 오류가 발생했습니다.");
        }
    };

    // 수정 취소 기능 //
    const handleCancel = () => {
        if (window.confirm("수정 작업을 취소하시겠습니까?")) {
            navigate(`/community/${id}`); // 상세 페이지로 이동
        }
    };

    return (
        <div className="edit-post-container">
            <h2>Edit Your Post</h2>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Physical">Physical</option>
                <option value="Social">Social</option>
                <option value="Mental">Mental</option>
                <option value="Emotional">Emotional</option>
                <option value="Environmental">Environmental</option>
            </select>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className="edit-post-buttons">
                <button onClick={handleSubmit}>수정</button>
                <button className="cancel-button" onClick={handleCancel}>취소</button>
            </div>
        </div>
    );
};

export default EditPost;
