import React from 'react';
import { Navigate } from 'react-router-dom';

// 로컬 스토리지에서 로그인 상태 확인
const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('userid'); // 'userid'가 존재하면 true

    // console.log('userid in localStorage:', localStorage.getItem('userid')); // 디버깅
    // console.log('isAuthenticated:', isAuthenticated); // 디버깅용

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
