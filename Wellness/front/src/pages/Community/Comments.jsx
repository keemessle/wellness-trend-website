import React, { useState, useEffect } from "react";
import axios from "axios";
import "./comments.css";

const Comments = ({ postId, postName }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [parentId, setParentId] = useState(null); // 대댓글용
    const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
    const [editContent, setEditContent] = useState(""); // 수정 중인 댓글 내용

    const loggedInUser = localStorage.getItem("userid");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comments/post/${postId}`);
                setComments(response.data);
            } catch (error) {
                console.error("댓글 불러오기 실패:", error);
            }
        };
        fetchComments();
    }, [postId]);

    // 댓글 작성 //
    const handleCommentSubmit = async () => {
        if (!loggedInUser) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (!newComment.trim()) {
            alert("댓글을 입력하세요.");
            return;
        }

        try {
            await axios.post("/api/comments", {
                postId,
                name: loggedInUser,
                content: newComment,
            });

            // 댓글 작성 후 초기화
            setNewComment("");
            // 댓글 목록 갱신
            const response = await axios.get(`/api/comments/post/${postId}`);
            setComments(response.data);
        } catch (error) {
            console.error("댓글 작성 실패:", error);
            alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 댓글 삭제
    const handleCommentDelete = async (commentId) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`/api/comments/${commentId}`);
                // 삭제 후 댓글 목록 갱신
                const response = await axios.get(`/api/comments/post/${postId}`);
                setComments(response.data);
                alert("댓글이 삭제되었습니다.");
            } catch (error) {
                console.error("댓글 삭제 실패:", error);
                alert("댓글 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    // 댓글 수정 버튼 클릭 //
    const handleEditButtonClick = (comment) => {
        setEditingCommentId(comment.id); // 수정 중인 댓글 ID 설정
        setEditContent(comment.content); // 기존 댓글 내용으로 초기화
    };

    // 댓글 수정 저장 //
    const handleCommentUpdate = async () => {
        if (!editContent.trim()) {
            alert("수정할 내용을 입력해주세요.");
            return;
        }

        try {
            await axios.put(`/api/comments/${editingCommentId}`, { content: editContent });
            setEditingCommentId(null); // 수정 상태 초기화
            setEditContent(""); // 수정 내용 초기화
            // 댓글 목록 갱신
            const response = await axios.get(`/api/comments/post/${postId}`);
            setComments(response.data);
        } catch (error) {
            console.error("댓글 수정 실패:", error);
            alert("댓글 수정 중 오류가 발생했습니다.");
        }
    };


    return (
        <div className="comments-container">
            <h2>댓글</h2>
            <ul className="comments-list">
                {comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <div className="comment-header">
                            <strong>{comment.name}</strong>
                            {/* 게시글 작성자와 댓글 작성자를 비교하여 '글쓴이' 표시 */}
                            {comment.name === postName && <span className="name-label"> (글쓴이)</span>}
                        </div>
                        <div className="comment-body">
                            {editingCommentId === comment.id ? (
                                <textarea
                                    className="edit-textarea"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                            ) : (
                                <p className="comment-content">{comment.content}</p>
                            )}
                            <div className="comment-actions">
                                <span className="comment-time">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                                {loggedInUser === comment.name && (
                                    <>
                                        {editingCommentId === comment.id ? (
                                            <button
                                                className="comment-save-button"
                                                onClick={handleCommentUpdate}
                                            >
                                                저장
                                            </button>
                                        ) : (
                                            <button
                                                className="comment-edit-button"
                                                onClick={() => handleEditButtonClick(comment)}
                                            >
                                                수정
                                            </button>
                                        )}
                                        <button
                                            className="comment-delete-button"
                                            onClick={() => handleCommentDelete(comment.id)}
                                        >
                                            삭제
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="comment-input">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={parentId ? "대댓글 작성" : "댓글 작성"}
                    className="comment-textarea"
                />
                <button onClick={handleCommentSubmit} className="comment-submit-button">
                    작성
                </button>
            </div>
        </div>
    );
};

export default Comments;
