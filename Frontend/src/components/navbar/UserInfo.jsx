import { useState, useEffect, useRef, useContext } from "react";
// Context
import AppContext from "../../context/AppContext";
// Hooks
import useLogout from "../../hooks/useLogout.jsx";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const UserInfo = () => {

    const { isAuth, name, picture, email } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const handleLogout = useLogout();

    const handleButtonClick = () => {
        setOpen(false);
        handleLogout();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            
            <button onClick={() => setOpen((v) => !v)} className="md:w-10 md:h-10 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center outline-none cursor-pointer" title={name || "Guest"}>
                <img src={picture || "./user.png"} referrerPolicy="no-referrer" alt={name || "Guest avatar"} className="w-full h-full object-cover" />
            </button>

            {open && (
                <div className="md:absolute fixed top-auto overflow-clip right-0 mr-5 mt-2 md:w-60 w-50 rounded-lg border border-white bg-white/60 backdrop-blur-xs shadow-lg z-50 dark:border-gray-400/40 dark:bg-blue-950/80">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="md:w-10 md:h-10 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                            <img src={picture || "./user.png"} referrerPolicy="no-referrer" alt={name || "Guest avatar"} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                            <div className="sm:text-sm text-xs font-medium truncate dark:text-white">{name || "Guest"}</div>
                            <div className="sm:text-xs text-[10px] text-gray-500 truncate dark:text-slate-300">{email || "No email"}</div>
                        </div>
                    </div>
                    {isAuth && <button onClick={handleButtonClick} className="flex w-full bg-red-600 text-white items-center gap-2 px-3 py-3 sm:text-sm text-xs hover:bg-red-700 duration-200 cursor-pointer">
                        <FontAwesomeIcon icon={faSignOutAlt} className="sm:text-[14px] text-xs" />
                        <span>Logout</span>
                    </button>}
                </div>
            )}
        </div>
    );
};

export default UserInfo;