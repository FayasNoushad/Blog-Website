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
                const response = await axios.get(blogs_api_url);
                setBlogs(response.data.blogs);
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
