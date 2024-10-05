import React, { useState, useEffect } from "react";
import "./GetBlogs.css";
import Blog from "./Blog/Blog";
import Loading from "./Loading/Loading";

export default function GetBlogs({
    blogs,
    loaded,
    user = false,
    admin = false,
    handleDelete = false,
    home = false,
}) {
    return (
        <div className="blogs my-4 px-2 px-md-4 px-lg-5">
            {loaded ? (
                home || user.id ? (
                    <>
                        <h3 className="blogs-title">
                            {home ? "Home" : `${user.first_name} Blogs`}
                        </h3>
                        {blogs.length > 0 ? (
                            blogs.map((blog, index) => {
                                if (home) {
                                    return (
                                        <Blog
                                            key={index}
                                            blog={blog}
                                            home={true}
                                        />
                                    );
                                } else {
                                    return (
                                        <Blog
                                            key={index}
                                            blog={blog}
                                            api_url={api_url}
                                            onDelete={handleDelete}
                                            admin={admin}
                                        />
                                    );
                                }
                            })
                        ) : (
                            <h4>No blogs available</h4>
                        )}
                    </>
                ) : (
                    <h4>User not found!</h4>
                )
            ) : (
                <Loading />
            )}
        </div>
    );
}
