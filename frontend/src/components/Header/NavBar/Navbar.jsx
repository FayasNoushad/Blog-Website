import React from "react";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-transparent p-2">
            <div className="container-fluid">
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
                    <a href="/post" className="btn btn-outline-primary">
                        Add Blog
                    </a>
                </div>
            </div>
        </nav>
    );
}
