import React from "react";
import "./NavBar.css";

export default function Navbar({ isLogin }) {
    return (
        <nav className="navbar navbar-expand-lg bg-transparent p-2">
            <div
                className="container-fluid navbar-home-link"
                onClick={() => (location.href = "/")}
            >
                <div className="navbar-brand">
                    <img
                        src="/icon.png"
                        alt="Logo"
                        width="30"
                        height="24"
                        className="d-inline-block align-text-top brand-icon me-3"
                    />
                    Blog Website
                </div>
                <div className="ms-auto">
                    <a href="/" className="btn btn-outline-primary me-2">
                        Blogs
                    </a>
                    {isLogin ? (
                        <button
                            onClick={() => (location.href = "/post")}
                            className="btn btn-outline-primary"
                        >
                            Add Blog
                        </button>
                    ) : (
                        <button
                            onClick={() => (location.href = "/login")}
                            className="btn btn-outline-success"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
