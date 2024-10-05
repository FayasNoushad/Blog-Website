import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
    const [userLogin, setUserLogin] = useState(
        localStorage.getItem("user_id") && localStorage.getItem("password")
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setUserLogin(
                localStorage.getItem("user_id") &&
                    localStorage.getItem("password")
            );
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <>
            <Header isLogin={userLogin} />
            <Main />
            <Footer />
        </>
    );
}

export default App;
