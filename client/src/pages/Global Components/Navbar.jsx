import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo & Brand */}
                <div className="nav-brand" onClick={() => navigate("/")}>
                    <div className="nav-mark">
                        <img src={Logo} alt="Fit Plan Hub" />
                    </div>
                    <span className="brand-name">Fit Plan Hub</span>
                </div>

                {/* Links */}
                <div className="nav-links">
                    <a href="#home" className="nav-item">Home</a>
                    <a href="#plans" className="nav-item">Plans</a>
                    <a href="#reasons" className="nav-item">Reasons</a>
                </div>

                {/* User Action Section */}
                <div className="nav-auth">
                    {user ? (
                        <div className="user-profile">
                            <span className="username">Hi, {user}</span>
                            <div className="avatar-circle">
                                {/* User Image or Initials */}
                                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user}`} alt="User" />
                            </div>
                            <button
                                className="btn-logout"
                                onClick={() => logout()}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="btn-login"
                                onClick={() => navigate("/Login")}
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;