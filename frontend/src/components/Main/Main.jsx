import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./Blogs/Blogs";
import AddBlog from "./AddBlog/AddBlog";
import "./Main.css";
import Login from "./User/Login/Login";
import Register from "./User/Register/Register";

export default function Main() {
    const [userLogin, setUserLogin] = useState(
        localStorage.getItem("user_id") && localStorage.getItem("password")
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setUserLogin(
                localStorage.getItem("user_id") &&
                    localStorage.getItem("password")
            );
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <main className="py-2 px-md-4 px-lg-5">
            <Router>
                <Routes>
                    {!userLogin ? (
                        <Route path="*" element={<Login />} />
                    ) : (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/post" element={<AddBlog />} />
                            <Route path="*" element={<Blogs />} />
                        </>
                    )}
                </Routes>
            </Router>
        </main>
    );
}
