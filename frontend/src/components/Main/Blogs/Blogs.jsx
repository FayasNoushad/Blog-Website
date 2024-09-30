import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blogs.css";
import Blog from "./Blog/Blog";
import { API_URL } from "../../../configs";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const blogs_api_url = API_URL + "/blogs/" + localStorage.getItem("user_id");
    const [loading, setLoading] = useState(true);
    const api_url = API_URL + "/blog";
    useEffect(() => {
        axios
            .get(blogs_api_url)
            .then((response) => {
                console.log(response.data.blogs);
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the blogs!", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (blogId) => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    };

    return (
        <div className="blogs my-4 px-2 px-md-4 px-lg-5">
            <h3 className="blogs-title">Blogs</h3>
            {loading ? (
                <p>Loading Blogs....</p>
            ) : blogs.length > 0 ? (
                blogs.map((blog, index) => {
                    return (
                        <Blog
                            key={index}
                            blog={blog}
                            api_url={api_url}
                            onDelete={handleDelete}
                        />
                    );
                })
            ) : (
                <p className="mx-4">No blogs available</p>
            )}
        </div>
    );
}
