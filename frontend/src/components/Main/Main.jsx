import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./Blogs/Blogs";
import AddBlog from "./AddBlog/AddBlog";
import "./Main.css";
import Login from "./User/Login/Login";
import Register from "./User/Register/Register";
import Home from "./Home/Home";
import Logout from "./User/Logout/Logout";
import useToken from "./User/useToken";

export default function Main() {
    const { token, removeToken, setToken } = useToken();
    return (
        <main className="py-2 px-md-4 px-lg-5">
            <Router>
                <Routes>
                    <Route
                        path="/register"
                        element={<Register setToken={setToken} />}
                    />
                    <Route
                        path="/login"
                        element={<Login setToken={setToken} />}
                    />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/post" element={<AddBlog token={token} />} />
                    <Route
                        path="/:username"
                        element={<Blogs token={token} />}
                    />
                    <Route path="*" element={<Home />} />
                </Routes>
            </Router>
        </main>
    );
}
