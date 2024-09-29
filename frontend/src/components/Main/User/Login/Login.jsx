import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { API_URL } from "../../../../configs";
import { useNavigate } from "react-router-dom";
import Main from "../../Main";

export default function Login() {
    const api_url = API_URL + "/getuser";
    const navigate = useNavigate();
    const [isEmail, setIsEmail] = useState(true);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            [isEmail ? "email" : "username"]: isEmail ? email : username,
            password: password,
        };
        axios
            .post(api_url, data)
            .then((response) => {
                localStorage.setItem("user_id", response.data.id);
                localStorage.setItem("password", password);
                setEmail("");
                setUsername("");
                setPassword("");
                console.log(data);
                navigate("/");
            })
            .catch((error) => {
                console.error(
                    "There was an error when adding the blogs!",
                    error
                );
            });
    };

    return (
        <form className="login-form">
            <h3 className="text-center pb-4">Login</h3>
            {isEmail ? (
                <div className="form-group pb-3">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            ) : (
                <div className="form-group pb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            )}
            <div className="form-group pb-3">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="text-center mt-3">
                <button
                    type="submit"
                    className="btn btn-primary mb-1"
                    onClick={(event) => handleSubmit(event)}
                >
                    Submit
                </button>
                <br />
                <button
                    className="btn btn-secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsEmail((prevIsEmail) => !prevIsEmail);
                    }}
                >
                    Login with {isEmail ? "Username" : "Email"}
                </button>
            </div>
        </form>
    );
}
