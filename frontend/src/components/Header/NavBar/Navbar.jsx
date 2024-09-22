import React from "react";

export default function Navbar() {
    return (
        <nav className="navbar bg-transparent p-2">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img
                        src="/icon.png"
                        alt="Logo"
                        width="30"
                        height="24"
                        className="d-inline-block align-text-top brand-icon me-3"
                    />
                    Blog Website
                </a>
            </div>
        </nav>
    );
}
