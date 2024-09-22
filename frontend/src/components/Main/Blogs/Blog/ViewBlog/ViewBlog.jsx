import React from "react";
import "./ViewBlog.css";

export default function ViewBlog({ title, content, time, onEdit, onDelete }) {
    return (
        <article className="blog">
            <div className="blog-head">
                <div className="blog-head-title">
                    <h4 className="blog-title">{title}</h4>
                </div>
                <div className="blog-actions blog-view-actions row">
                    <button className="edit-button col-md-4" onClick={onEdit}>
                        Edit
                    </button>
                    <button
                        className="delete-button col-md-4"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <time>{time}</time>
            <p>{content}</p>
        </article>
    );
}
