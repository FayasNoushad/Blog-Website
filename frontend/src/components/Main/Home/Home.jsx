import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../configs";
import GetBlogs from "../GetBlogs/GetBlogs";

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const blogs_api_url = API_URL + "/blogs";

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogs_data = (await axios.get(blogs_api_url)).data.blogs;
                const users = {};
                await Promise.all(
                    blogs_data.map(async (blog) => {
                        if (users[blog.author_id]) {
                            blog.user = users[blog.author_id];
                        } else {
                            const user_api_url =
                                API_URL + "/getuserwithid/" + blog.author_id;
                            const user_data = (await axios.get(user_api_url))
                                .data;
                            users[blog.author_id] = user_data;
                            blog.user = user_data;
                        }
                    })
                );
                setBlogs(blogs_data);
            } catch (error) {
                console.error("There was an error fetching the blogs!", error);
            } finally {
                setLoaded(true);
            }
        };
        fetchBlogs();
    }, []);
    return <GetBlogs blogs={blogs} loaded={loaded} home={true} />;
}
