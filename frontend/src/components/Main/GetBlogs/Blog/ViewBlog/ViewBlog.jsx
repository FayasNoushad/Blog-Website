import React from "react";
import "./ViewBlog.css";
import { useNavigate } from "react-router-dom";

export default function ViewBlog({
    title,
    content,
    time,
    onEdit = false,
    onDelete = false,
    token,
    user = false,
    userId = false,
}) {
    const navigate = useNavigate();
    const handleClick = (username) => {
        navigate("/" + username);
    };
    return (
        <article className="blog">
            <div className="blog-head">
                <div className="blog-head-title">
                    <h4 className="blog-title">{title}</h4>
                </div>
                {user && (
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleClick(user.username)}
                    >
                        Written by {user.first_name}
                    </button>
                )}
                {token && localStorage.getItem("user_id") === userId && (
                    <div className="blog-actions blog-view-actions row px-2">
                        <button
                            className="edit-button col-md-4 p-2"
                            onClick={(e) => onEdit(e)}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-button col-md-4 p-2"
                            onClick={(e) => onDelete(e)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <time>{time}</time>
            <p>{content}</p>
        </article>
    );
}
