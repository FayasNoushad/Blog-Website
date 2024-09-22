import React, { useState, useEffect } from "react";
import axios from "axios";
import Blogs from "./Blogs/Blogs";
import AddBlog from "./AddBlog/AddBlog";
import "./Main.css";

export default function Main() {
    const [blogs, setBlogs] = useState([]);
    const url = "http://127.0.0.1:5000/blogs";

    useEffect(() => {
        axios
            .get(url)
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

    return (
        <main>
            <AddBlog url={url} onAdd={handleAdd} />
            <hr />
            <Blogs blogs={blogs} />
        </main>
    );
}
