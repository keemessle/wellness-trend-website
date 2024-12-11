import React, { useState } from "react";
import axios from "axios";
import "./createpost.css";
import {useNavigate} from "react-router-dom";

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Physical");
    const navigate = useNavigate();

    if (!isOpen) return null; // 모달이 열리지 않았을 경우 아무것도 렌더링하지 않음

    const handleSubmit = async () => {
        const name = localStorage.getItem("userid"); // 로그인된 사용자 ID
        if (!name) {
            alert("로그인이 필요합니다.");
            onClose();
            navigate(`/login`, { state: { from: "/community" } }); // 로그인 화면으로 이동 시 이전 위치 전달
            return;
        }

        // 제목과 내용 유효성 검사
        if (!title.trim()) {
            alert("제목을 입력해주세요!");
            return;
        }
        if (!content.trim()) {
            alert("내용을 입력해주세요!");
            return;
        }

        const post = { title, content, category, name }; // name을 로그인된 사용자로 설정
        try {
            await axios.post("/api/posts/create", post);
            alert("작성 성공!");
            onSubmit(); // 부모 컴포넌트에서 호출하여 UI 갱신
            onClose(); // 모달 닫기
        } catch (error) {
            alert("게시글 작성 실패. 다시 시도해주세요.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <h1>Write Your Thoughts</h1>
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
                    <button className="modal-submit-button" onClick={handleSubmit}>Submit</button>
                </div>
        </div>
    );
};

                export default CreatePostModal;
