import React, { useState, useEffect } from "react";
import axios from "axios";
import Blogs from "./Blogs/Blogs";
import AddBlog from "./AddBlog/AddBlog";
import "./Main.css";

export default function Main() {
    const [blogs, setBlogs] = useState([]);
    const api_url = "http://127.0.0.1:5000/blogs";

    useEffect(() => {
        axios
            .get(api_url)
            .then((response) => {
                console.log(response.data.blogs);
                setBlogs(response.data.blogs);
            })
            .catch((error) => {
                console.error("There was an error fetching the blogs!", error);
            });
    }, []);

    const handleAdd = (blog) => {
        setBlogs((prevBlogs) => [...prevBlogs, blog]);
    };

    const handleDelete = (blogId) => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    };

    return (
        <main className="py-2 px-md-4 px-lg-5">
            <AddBlog api_url={api_url} onAdd={handleAdd} />
            <hr />
            <Blogs api_url={api_url} blogs={blogs} onDelete={handleDelete} />
        </main>
    );
}
