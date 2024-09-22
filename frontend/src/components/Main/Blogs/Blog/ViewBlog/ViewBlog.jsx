import React from "react";
import "./ViewBlog.css";

export default function ViewBlog({ title, content, time, onEdit, onDelete }) {
    return (
        <article className="blog">
            <div className="blog-head">
                <h4 className="blog-title">{title}</h4>
                <div className="blog-actions blog-view-actions">
                    <button className="edit-button" onClick={onEdit}>
                        Edit
                    </button>
                    <button className="delete-button" onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
            <time>{time}</time>
            <p>{content}</p>
        </article>
    );
}
