// jw
import React, { useEffect, useState } from "react";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import axios from "axios";
import "./postdetail.css";
import Comments from "./Comments";

// 버튼 아이콘
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin2Line } from "react-icons/ri";


const PostDetail = () => {
    const { id } = useParams(); // URL에서 게시글 ID 가져오기
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [isName, setIsName] = useState(false); // 작성자인지 여부 확인
    const location = useLocation(); // 전달된 state 접근

    const category = location.state?.category || "ALL"; // 전달받은 카테고리 (기본값: "ALL")

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) {
                console.error("게시물 ID가 없습니다.");
                return;
            }

            try {
                // 조회수 증가 요청
                await axios.post(`/api/posts/${id}/view`, {});

                // 게시글 데이터 가져오기
                const response = await axios.get(`/api/posts/${id}`);
                setPost(response.data);

                // 로그인된 사용자와 게시글 작성자 비교
                const loggedInUser = localStorage.getItem("userid");
                setIsName(response.data.name === loggedInUser);
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
            }
        };

        console.log("현재 게시물 ID:", id); // 확인용 콘솔
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await axios.delete(`/api/posts/${id}`);
                alert("삭제 성공");
                navigate("/community", { state: { category } }); // 삭제 후 이전 카테고리로 이동); // 삭제 후 커뮤니티 페이지로 이동
            } catch (error) {
                console.error("게시글 삭제 실패:", error);
                alert("게시글 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    const handleEdit = () => {
        // 수정 화면으로 이동, 해당 게시글 ID 전달, 현재 카테고리도 전달
        navigate(`/community/edit/${id}`, { state: { category } });
    };

    const handleLike = async () => {
        if (isName) {
            // 작성자일 경우 경고 메시지
            alert(`${post.name}님 게시물에는 좋아요를 누를 수 없습니다.`);
            return;
        }
        try {
            await axios.post(`/api/posts/${id}/like`);
            setPost((prevPost) => ({ ...prevPost, likes: prevPost.likes + 1 }));
        } catch (error) {
            console.error("좋아요 요청 중 오류 발생:", error);
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-detail-container">
            {/* 제목 */}
            <h1>{post.title}</h1>

            {/* 작성자와 조회수 */}
            <div className="post-meta">
                <span>작성자: {post.name}</span>
                <span>조회수: {post.views}</span>
            </div>

            {/* 게시글 본문 */}
            <div className="post-content">
                <p>{post.content}</p>
            </div>

            {/* 생성일 */}
            <div className="post-date">
                날짜: {post.createdAt}
            </div>

            {/* 제목 및 작성자, 생성일 정보 */}
            {/*<div className="post-header">*/}
            {/*    <h1>{post.title}</h1>*/}
            {/*    <div className="post-meta">*/}
            {/*        <span>작성자: {post.name}</span>*/}
            {/*        <span>생성일: {post.createdAt}</span>*/}
            {/*        <span>조회수: {post.views}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <button className="like-button" onClick={handleLike}>
                ♥️ {post.likes}
            </button>
            {/* 수정 및 삭제 버튼 */}
            {isName && (
                <div className="post-actions">
                    <button className="edit-button" onClick={handleEdit}>
                        <TbEdit />
                    </button>
                    <button className="delete-button" onClick={handleDelete}>
                        <RiDeleteBin2Line />
                    </button>
                </div>
            )}
            <button className="back-button" onClick={() => navigate("/community", {state: {category}})}>
                Back
            </button>
            <Comments postId={post.id} postName={post.name} />
        </div>
    );
};

export default PostDetail;
