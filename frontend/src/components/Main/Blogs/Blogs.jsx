import React from "react";
import "./Blogs.css";
import Blog from "./Blog/Blog";

export default function Blogs({ api_url, onDelete }) {
    const blogs = [
        {
            content:
                "Curabitur ultricies leo arcu, in eleifend leo iaculis ut. In hac habitasse platea dictumst. Cras varius enim vitae cursus ornare. Vivamus congue dictum mauris nec sodales. Aenean tincidunt fermentum auctor. Pellentesque vestibulum blandit sapien, in pellentesque urna blandit ac. Mauris vitae metus imperdiet, elementum enim et, varius ex.",
            id: "66f00af31106375be83559e8",
            time: "2024-09-22 17:47:55.520506",
            title: "Curabitur ultricies leo arcu",
        },
        {
            content:
                "Curabitur ultricies leo arcu, in eleifend leo iaculis ut. In hac habitasse platea dictumst. Cras varius enim vitae cursus ornare. Vivamus congue dictum mauris nec sodales. Aenean tincidunt fermentum auctor. Pellentesque vestibulum blandit sapien, in pellentesque urna blandit ac. Mauris vitae metus imperdiet, elementum enim et, varius ex.",
            id: "66f00af31106375be83559e",
            time: "2024-09-22 17:47:55.520506",
            title: "Curabitur ultricies leo arcu",
        },
    ];
    return (
        <div className="blogs my-4 px-2 px-md-4 px-lg-5">
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
