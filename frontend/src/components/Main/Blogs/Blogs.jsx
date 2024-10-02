import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Blogs.css";
import Blog from "./Blog/Blog";
import { API_URL } from "../../../configs";
import Loading from "./Loading/Loading";

export default function Blogs() {
    const { username } = useParams();
    const user_api_url = API_URL + "/getuser/" + username;
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const userData = (await axios.get(user_api_url)).data;
                setUser(userData);
                if (userData.id) {
                    setAdmin(userData.id === localStorage.getItem("user_id"));
                    try {
                        const blogs_api_url = `${API_URL}/blogs/${userData.id}`;
                        const response = await axios.get(blogs_api_url);
                        setBlogs(response.data.blogs);
                    } catch (error) {
                        console.error(
                            "There was an error fetching the blogs!",
                            error
                        );
                    }
                }
            } catch (error) {
                console.error(
                    "There was an error when fetching user details!",
                    error
                );
            } finally {
                setLoaded(true);
            }
        };
        fetchBlogs();
    }, [user_api_url]);

    const api_url = API_URL + "/blog";

    const handleDelete = (blogId) => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    };

    return (
        <div className="blogs my-4 px-2 px-md-4 px-lg-5">
            {loaded ? (
                user.id ? (
                    <>
                        <h3 className="blogs-title">{user.first_name} Blogs</h3>
                        {blogs.length > 0 ? (
                            blogs.map((blog, index) => {
                                return (
                                    <Blog
                                        key={index}
                                        blog={blog}
                                        api_url={api_url}
                                        onDelete={handleDelete}
                                        admin={admin}
                                    />
                                );
                            })
                        ) : (
                            <h4>No blogs available</h4>
                        )}
                    </>
                ) : (
                    <h4>User not found!</h4>
                )
            ) : (
                <Loading />
            )}
        </div>
    );
}
