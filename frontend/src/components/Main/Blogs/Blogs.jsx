import React from "react";
import "./Blogs.css";
import axios from "axios";

export default function Blogs({ api_url, blogs, onDelete }) {
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

    const handleDelete = (blogId) => {
        axios
            .delete(api_url, { data: { id: blogId } })
            .then((response) => {
                onDelete(blogId);
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error(
                    "There was an error when deleting the blog!",
                    error
                );
            });
    };
    return (
        <div className="blogs">
            <h3 className="blogs-title">Blogs</h3>
            {blogs.length > 0 ? (
                blogs.map((blog, index) => {
                    const d = new Date(blog.time);
                    const blogTime = `${
                        months[d.getMonth()]
                    } ${d.getDate()} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
                    return (
                        <article className="blog" key={index}>
                            <div className="blog-head">
                                <h4 className="blog-title">{blog.title}</h4>
                                <div className="blog-actions">
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(blog.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <time>{blogTime}</time>
                            <p>{blog.content}</p>
                        </article>
                    );
                })
            ) : (
                <p>No blogs available</p>
            )}
        </div>
    );
}
