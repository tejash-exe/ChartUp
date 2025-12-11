import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
// Context
import AppContext from "../../context/AppContext";
// Hooks
import useLogin from "../../hooks/useLogin";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const WelcomeLoginButton = ({ message }) => {

    const navigate = useNavigate();
    const { isAuth } = useContext(AppContext);
    const { loginWithGoogle, loading, success, setSuccess } = useLogin();
    
    const handleLogin = () => {
        if (!isAuth) {
            loginWithGoogle();
        }
        else {
            navigate("/");
        }
    };

    useEffect(() => {
        if (success) {
            setSuccess(false);
            navigate("/");
        }
    }, [success]);

    return (
        <button onClick={handleLogin} className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white backdrop-blur-xs border border-white text-black font-medium shadow-sm cursor-pointer hover:bg-white/10 duration-200 dark:hover:bg-slate-300 dark:hover:border-slate-300">
            {!loading ? message : <FontAwesomeIcon className="animate-spin" icon={faSpinner} />}
        </button>
    );
};

export default WelcomeLoginButton;