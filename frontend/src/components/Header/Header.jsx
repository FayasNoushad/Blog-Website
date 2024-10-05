import React from "react";
import "./Header.css";
import Navbar from "./NavBar/Navbar";

export default function Header({ isLogin }) {
    return (
        <header>
            <Navbar isLogin={isLogin} />
        </header>
    );
}
