import { useState, useEffect, useRef, useContext } from "react";
// Context
import AppContext from "../../context/AppContext.jsx";
// Hooks
import useMarkLocalEdits from "../../hooks/useMarkLocalEdits.jsx";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const TitleInput = () => {

    const { graphs, selectedGraph, setGraphs } = useContext(AppContext);
    const titleInputRef = useRef(null);

    const markLocalEdits = useMarkLocalEdits();

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 870);

    const currentTitle = selectedGraph !== null && graphs[selectedGraph] ? graphs[selectedGraph].title : "Untitled Graph";

    const inputWidth = isSmallScreen ? "6rem" : `${Math.max((currentTitle || "").length, 8)}ch`;

    const handleButtonClick = () => {
        titleInputRef.current?.focus();
        titleInputRef.current?.select();
    };

    useEffect(() => {
        const updateSize = () => {
            setIsSmallScreen(window.innerWidth < 870);
        };

        window.addEventListener("resize", updateSize);
        window.addEventListener("orientationchange", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
            window.removeEventListener("orientationchange", updateSize);
        };
    }, []);


    const handleTitleChange = (rawTitle) => {
        if (selectedGraph === null) return;

        const newTitle = rawTitle.slice(0, 20);

        setGraphs((prev) => {
            const updated = [...prev];
            if (!updated[selectedGraph]) return prev;

            updated[selectedGraph] = {
                ...updated[selectedGraph],
                title: newTitle,
            };

            return updated;
        });

        markLocalEdits();
    };

    const handleTitleBlur = (rawTitle) => {
        if (selectedGraph === null) return;

        if (titleInputRef.current) {
            titleInputRef.current.scrollLeft = 0;
            titleInputRef.current.setSelectionRange(0, 0);
        }

        if (rawTitle.trim() !== "") return;

        setGraphs((prev) => {
            const updated = [...prev];
            if (!updated[selectedGraph]) return prev;

            updated[selectedGraph] = {
                ...updated[selectedGraph],
                title: "Untitled Graph",
            };

            return updated;
        });

        markLocalEdits();
    };

    return (
        <div className='bg-orange-400/50 dark:bg-[rgba(249,115,22,1)] rounded-3xl py-2 px-4 backdrop-blur-sm shadow-sm border border-white dark:border-gray-400/40'>

            <input ref={titleInputRef} type="text" className="mr-2 bg-transparent outline-none sm:text-sm text-xs min-w-0 truncate" value={currentTitle} maxLength={20} style={{ width: inputWidth, transition: "width 120ms ease-out" }} onChange={(e) => handleTitleChange(e.target.value)} onBlur={(e) => handleTitleBlur(e.target.value)} />

            <button className="text-blue-600 hover:text-white duration-200 cursor-pointer" onClick={handleButtonClick}>
                <FontAwesomeIcon icon={faPen} />
            </button>
            
        </div>
    );
};

export default TitleInput;