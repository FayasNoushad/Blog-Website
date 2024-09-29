import axios from "axios";
import React, { useState } from "react";
import "./AddBlog.css";
import { API_URL } from "../../../configs";

export default function AddBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const api_url = API_URL + "/blog";
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title || !content) {
            event.preventDefault();
            return alert("Title and content required");
        }
        console.log("Added\nTitle:-", title, "\nContent:\n", content);
        axios
            .post(api_url, {
                title,
                content,
                author_id: localStorage.getItem("user_id"),
                password: localStorage.getItem("password"),
            })
            .then(() => {
                setTitle("");
                setContent("");
                return alert("Blog Added");
            })
            .catch((error) => {
                console.error(
                    "There was an error when adding the blogs!",
                    error
                );
            });
    };
    return (
        <form className="add-blog-form">
            <h4 className="add-blog-title">Write a blog</h4>
            <label>Title</label>
            <br />
            <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <label>Content</label>
            <br />
            <textarea
                name="content"
                rows="3"
                onChange={(e) => setContent(e.target.value)}
                value={content}
            ></textarea>
            <br />
            <button onClick={(e) => handleSubmit(e)}>Add Blog</button>
        </form>
    );
}
