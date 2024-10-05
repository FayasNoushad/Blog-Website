import React, { useState } from "react";
import axios from "axios";
import "./Blog.css";
import EditBlog from "./EditBlog/EditBlog";
import ViewBlog from "./ViewBlog/ViewBlog";

export default function Blog({
    blog,
    api_url = false,
    onDelete = false,
    admin = false,
    home = false,
}) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const d = new Date(blog.time);
    const blogTime = `${
        months[d.getMonth()]
    } ${d.getDate()} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);

    const [isEditable, setIsEditable] = useState(false);

    const handleEdit = () => {
        setIsEditable((prevState) => !prevState);
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        axios
            .put(api_url, {
                id: blog.id,
                title,
                content,
                author_id: localStorage.getItem("user_id"),
                password: localStorage.getItem("password"),
            })
            .then((response) => {
                console.log(response);
                setIsEditable(false);
            })
            .catch((error) => {
                console.error("There was an error when editing blog!", error);
            });
    };

    const handleEditCancel = (event) => {
        event.preventDefault();
        setTitle(blog.title);
        setContent(blog.content);
        setIsEditable(false);
    };

    const handleDelete = () => {
        axios
            .delete(api_url, {
                data: {
                    id: blog.id,
                    author_id: localStorage.getItem("user_id"),
                    password: localStorage.getItem("password"),
                },
            })
            .then((response) => {
                onDelete(blog.id);
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error(
                    "There was an error when deleting the blog!",
                    error
                );
            });
    };
    if (home) {
        return (
            <ViewBlog
                title={title}
                content={content}
                time={blogTime}
                admin={admin}
                user={blog.user}
            />
        );
    } else {
        return isEditable ? (
            <EditBlog
                title={title}
                content={content}
                setTitle={setTitle}
                setContent={setContent}
                onSubmit={handleEditSubmit}
                onCancel={handleEditCancel}
            />
        ) : (
            <ViewBlog
                title={title}
                content={content}
                time={blogTime}
                onEdit={handleEdit}
                onDelete={handleDelete}
                admin={admin}
            />
        );
    }
}
