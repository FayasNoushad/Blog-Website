import React from "react";
import "./EditBlog.css";

export default function EditBlog({
    title,
    content,
    setTitle,
    setContent,
    onSubmit,
    onCancel,
}) {
    return (
        <form className="blog blog-form">
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={Math.max(2, Math.ceil(content.length / 100))}
            />

            <div className="blog-actions blog-form-actions">
                <button
                    className="edit-submit-button"
                    onClick={(e) => onSubmit(e)}
                >
                    Submit
                </button>
                <button
                    className="edit-cancel-button"
                    onClick={(e) => onCancel(e)}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
