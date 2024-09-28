import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./Blogs/Blogs";
import AddBlog from "./AddBlog/AddBlog";
import "./Main.css";

export default function Main() {
    return (
        <main className="py-2 px-md-4 px-lg-5">
            <Router>
                <Routes>
                    <Route path="/post" element={<AddBlog />} />
                    <Route path="*" element={<Blogs />} />
                </Routes>
            </Router>
        </main>
    );
}
