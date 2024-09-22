import React from "react";
import "./Blogs.css";
import Blog from "./Blog/Blog";

export default function Blogs({ api_url, blogs, onDelete }) {
    return (
        <div className="blogs">
            <h3 className="blogs-title">Blogs</h3>
            {blogs.length > 0 ? (
                blogs.map((blog, index) => {
                    return (
                        <Blog
                            key={index}
                            blog={blog}
                            api_url={api_url}
                            onDelete={onDelete}
                        />
                    );
                })
            ) : (
                <p>No blogs available</p>
            )}
        </div>
    );
}
