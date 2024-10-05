import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./Blogs/Blogs";
import AddBlog from "./AddBlog/AddBlog";
import "./Main.css";
import Login from "./User/Login/Login";
import Register from "./User/Register/Register";
import Home from "./Home/Home";

export default function Main() {
    return (
        <main className="py-2 px-md-4 px-lg-5">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/post" element={<AddBlog />} />
                    <Route path="/:username" element={<Blogs />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </Router>
        </main>
    );
}
