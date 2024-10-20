import { useState } from "react";

function useToken() {
    function getToken() {
        const userToken = localStorage.getItem("token");
        return userToken && userToken;
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        if (userToken === undefined) {
            return false;
        }
        localStorage.setItem("token", userToken);
        setToken(userToken);
        return true;
    }

    function removeToken() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return {
        setToken: saveToken,
        token,
        removeToken,
    };
}

export default useToken;
