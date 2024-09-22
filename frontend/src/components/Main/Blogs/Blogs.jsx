import React from "react";
import "./Blogs.css";

export default function Blogs({ blogs }) {
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
                            <h4 className="blog-title">{blog.title}</h4>
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
