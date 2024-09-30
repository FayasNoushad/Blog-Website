import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../configs";

export default function Register() {
    const api_url = API_URL + "/user";
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordWrong, setIsPasswordWrong] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            setIsPasswordWrong(true);
            return;
        }
        if (!(firstName || username || email || password || confirmPassword)) {
            return alert("Fill all required fields");
        }
        const data = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password: password,
        };
        axios
            .post(api_url, data)
            .then((response) => {
                localStorage.setItem("user_id", response.data.id);
                localStorage.setItem("password", password);
                setFirstName("");
                setLastName("");
                setEmail("");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                navigate("/");
            })
            .catch((error) => {
                console.error("There was an error when register!", error);
            });
    };

    return (
        <form className="register-form">
            <h3 className="text-center pb-4">Register</h3>
            <div className="form-group pb-3">
                <label htmlFor="firstName">First name</label>
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={(event) => {
                        setFirstName(event.target.value);
                    }}
                />
            </div>
            <div className="form-group pb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => {
                        setLastName(event.target.value);
                    }}
                />
            </div>
            <div className="form-group pb-3">
                <label htmlFor="username">Username</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span
                            className="input-group-text"
                            id="inputGroupPrepend2"
                        >
                            @
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                </div>
            </div>
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
            <div className="form-group pb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                {isPasswordWrong && (
                    <small className="password-wrong">
                        * Confirm password is wrong
                    </small>
                )}
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                        if (password === e.target.value) {
                            setIsPasswordWrong(false);
                        }
                        setConfirmPassword(e.target.value);
                    }}
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
                    onClick={(event) => {
                        event.preventDefault();
                        navigate("/login");
                    }}
                >
                    Already Registerd? Login
                </button>
            </div>
        </form>
    );
}
