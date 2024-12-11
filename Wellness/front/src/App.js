import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './pages/user/PrivateRoute';
import UserInfo from "./pages/user/UserInfo";
import LoginSlider from './pages/user/Loginslider';
import Community from "./pages/Community/Community";
import CreatePostModal from "./pages/Community/CreatePostModal";
import PostDetail from "./pages/Community/PostDetail";
import EditPost from "./pages/Community/EditPost";
import Reports from "./pages/reports/Reports";

// import Login from './pages/user/Login';
import './app.css';
// import axios from "axios";

function App() {
  // const userid = localStorage.getItem('userid');

  return (
    <Router>
      <div className="App">
        <Topbar className="topbar" />
        <Sidebar className="sidebar" />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/dashboard" element={<Dashboard />} />

            {/* Users */}
            <Route path="/create" element={<PrivateRoute><CreatePostModal/></PrivateRoute>} />
            <Route path="/login" element={<LoginSlider />} />
            <Route path="/users" element={<PrivateRoute><UserInfo /></PrivateRoute>} />

            {/* Reports */}
            <Route path="/articles" element={<Reports />} />

            {/* Community */}
            <Route path="/community" element={<Community/>} />
            <Route path="/community/:id" element={<PostDetail/>} />
            <Route path="/community/edit/:id" element={<EditPost/>} />

          </Routes>    
        </div>
      </div>
    </Router>
  )
}


export default App