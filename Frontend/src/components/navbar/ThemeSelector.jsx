import { useState, useEffect, useRef, useContext } from "react";
// Context
import AppContext from "../../context/AppContext.jsx";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";

const ThemeSelector = () => {

    const { theme, setTheme, setThemeOption } = useContext(AppContext);
    const themeDropdownRef = useRef(null);
    const [themeOpen, setThemeOpen] = useState(false);

    const currentIcon = theme === "dark" ? faMoon : faSun;

    useEffect(() => {
        const handleClickOutside = (event) => {
            const t = themeDropdownRef.current;
            if (t && !t.contains(event.target)) {
                setThemeOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleThemeChange = (value) => {
        setThemeOption(value);
        setThemeOpen(false);
    };

    return (
        <div className="relative" ref={themeDropdownRef}>

            <button onClick={() => { setThemeOpen((prev) => !prev) }} title="Select theme" className={"md:w-10 md:h-10 w-8 h-8 outline-none flex items-center border border-white justify-center rounded-full shadow-sm duration-200 cursor-pointer dark:border-gray-400/40" + (themeOpen ? " dark:text-white " : " bg-white hover:bg-white/20 hover:backdrop-blur-xs dark:text-white dark:hover:bg-transparent dark:bg-black/20")}>
                <FontAwesomeIcon className="md:text-[20px]" icon={currentIcon} />
            </button>

            {themeOpen && (
                <div className="absolute overflow-clip right-0 mt-2 sm:w-40 w-35 rounded-lg border border-white bg-white/60 backdrop-blur-xs shadow-lg z-50 dark:bg-blue-950/80 dark:border-gray-400/40">
                    <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Theme</div>
                    <button onClick={() => handleThemeChange("light")} className="flex w-full items-center gap-2 px-3 py-2 sm:text-sm text-xs hover:bg-white/80 cursor-pointer dark:text-slate-200 dark:hover:bg-black/80">
                        <FontAwesomeIcon icon={faSun} className="text-[14px]" />
                        <span>Light</span>
                        {theme === "light" && (
                            <span className="ml-auto text-blue-500">●</span>
                        )}
                    </button>
                    <button onClick={() => handleThemeChange("dark")} className="flex w-full items-center gap-2 px-3 py-2 sm:text-sm text-xs hover:bg-white/80 cursor-pointer dark:text-slate-200 dark:hover:bg-black/80">
                        <FontAwesomeIcon icon={faMoon} className="text-[14px]" />
                        <span>Dark</span>
                        {theme === "dark" && (
                            <span className="ml-auto text-blue-500">●</span>
                        )}
                    </button>
                    <button onClick={() => handleThemeChange("system")} className="flex w-full items-center gap-2 px-3 py-2 sm:text-sm text-xs hover:bg-white/80 cursor-pointer dark:text-slate-200 dark:hover:bg-black/80">
                        <FontAwesomeIcon icon={faTv} className="text-[14px]" />
                        <span>System</span>
                        {theme === "system" && (
                            <span className="ml-auto text-blue-500">●</span>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;