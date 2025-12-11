import { useState, useContext } from "react";
// Context
import AppContext from "../context/AppContext.jsx";
import { useNotifications } from "../context/NotificationContext.jsx";
// Packages
import { useGoogleLogin } from "@react-oauth/google";

const useLogin = () => {

    const { setName, setEmail, setPicture, setGraphs, setIsAuth, backend_url } = useContext(AppContext);
    const { notify } = useNotifications();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const responseGoogle = async (authResult) => {
        if (loading) return;

        try {
            setLoading(true);
            if (authResult.code) {
                const response = await fetch(`${backend_url}/api/users/login?code=${authResult.code}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const result = await response.json();

                if (result.status == 200) {
                    localStorage.setItem("name", result.data.user.name);
                    localStorage.setItem("email", result.data.user.email);
                    localStorage.setItem("picture", result.data.user.picture);
                    localStorage.setItem("graphs", result.data.user.graphs);
                    setName(result.data.user.name);
                    setEmail(result.data.user.email);
                    setPicture(result.data.user.picture);
                    setGraphs(result.data.user.graphs);

                    localStorage.setItem("isAuth", JSON.stringify(true));
                    setIsAuth(true);
                    notify(`Welcome! ${result.data.user.name}`);
                    setSuccess(true);
                }
                else {
                    throw new Error(result);
                }
            }
        } catch (error) {
            if(error.message) notify(error.message, 5000, "Warning");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
        ux_mode: "popup",
        prompt: "select_account",
    });

    return { loginWithGoogle, loading, success, setSuccess };
};

export default useLogin;