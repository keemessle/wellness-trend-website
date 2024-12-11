import React, { useState } from "react";
import './sidebar.css'
import { TbBrandGoogleHome } from "react-icons/tb";
import { TbLayoutDashboard } from "react-icons/tb";
import { CgUser } from "react-icons/cg";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    // 카테고리와 아이콘 정의
    const categories = [
        { name: "Home", path: "/", icon: <TbBrandGoogleHome className="sidebarIcon" /> },
        { name: "Dashboard", path: "/dashboard", icon: <TbLayoutDashboard className="sidebarIcon" /> },
        { name: "Users", path: "/users", icon: <CgUser className="sidebarIcon" /> },
        { name: "Reports", path: "/articles", icon: <MdOutlineBookmarkBorder className="sidebarIcon" /> },
        { name: "Community", path: "/community", icon: <IoChatbubblesOutline className="sidebarIcon" /> },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebarBrend">Wellty</div>
                <div className="sidebarMenu">
                    <ul>
                        {/* 카테고리 동적 생성 */}
                        {categories.map((category, index) => (
                            <li 
                                key={index} 
                                className={`sidebarItem ${loading ? "disable-hover" : ""}`}
                                onClick={() => {
                                    if (!loading) { // 로딩 상태가 아닐 때만 동작
                                        setLoading(true); // 로딩 상태 활성화
                                        navigate(category.path); // 페이지 이동
                                        setTimeout(() => setLoading(false), 1000); // 임시 로딩 종료
                                    }
                                }}
                            >
                                {category.icon}
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;


// function Sidebar() {
//     const navigate = useNavigate();
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         axios.get("/api/categories")
//              .then(response => {
//                 setCategories(response.data);
//         })
//         .catch(error => {
//             console.error("연결 오류", error);
//         })
//     }, []);

//     return ( 
//         <div className="sidebar">
//             <div className="sidebarWrapper">
//                 <div className="sidebarBrend">
//                     <h1>Wellty</h1>
//                 </div>
//                 <div className="sidebarMenu">
//                     <ul>
//                         <li onClick={() => navigate("/")}>
//                             <TbBrandGoogleHome className="sidebarIcon" />
//                             Home
//                         </li>
//                         <li onClick={() => navigate("/dashboard")}>
//                             <TbLayoutDashboard className="sidebarIcon" />
//                             Dashboard
//                         </li>
//                         <li onClick={() => navigate("/users")}>
//                             <CgUser className="sidebarIcon" />
//                             Users
//                         </li>
//                         <li onClick={() => navigate("/reports")}>
//                             <MdOutlineBookmarkBorder  className="sidebarIcon" />
//                             Reports
//                         </li>
//                         <li onClick={() => navigate("/community")}>
//                             <IoChatbubblesOutline className="sidebarIcon" />
//                             Community
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Sidebar;