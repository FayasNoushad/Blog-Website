import React from "react";
import "./ViewBlog.css";

export default function ViewBlog({
    title,
    content,
    time,
    onEdit,
    onDelete,
    admin,
}) {
    return (
        <article className="blog">
            <div className="blog-head">
                <div className="blog-head-title">
                    <h4 className="blog-title">{title}</h4>
                </div>
                {admin && (
                    <div className="blog-actions blog-view-actions row px-2">
                        <button
                            className="edit-button col-md-4 p-2"
                            onClick={onEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-button col-md-4 p-2"
                            onClick={onDelete}
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
