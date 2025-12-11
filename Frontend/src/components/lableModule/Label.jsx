import { useContext } from "react";
// Context
import AppContext from "../../context/AppContext.jsx";
// Hooks
import useMarkLocalEdits from "../../hooks/useMarkLocalEdits.jsx";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Label = ({ item, inputRefs }) => {

    const { setGraphs, selectedGraph } = useContext(AppContext);

    const markLocalEdits = useMarkLocalEdits();

    const handleLabelChange = (id, newLabel) => {
        if (selectedGraph === null) return;

        if (newLabel.length > 20) return;

        setGraphs((prev) => {
            const updated = [...prev];
            const current = updated[selectedGraph];
            if (!current) return prev;

            const oldGraph = current.graph || [];

            updated[selectedGraph] = {
                ...current,
                graph: oldGraph.map((item) =>
                    item.id === id ? { ...item, label: newLabel } : item
                ),
            };

            return updated;
        });

        markLocalEdits();
    };

    const handleValueChange = (id, newValue) => {
        const num = Number(newValue);
        if (num < 0) return;

        if (selectedGraph === null) return;

        setGraphs((prev) => {
            const updated = [...prev];
            const current = updated[selectedGraph];
            if (!current) return prev;

            const oldGraph = current.graph || [];

            updated[selectedGraph] = {
                ...current,
                graph: oldGraph.map((item) =>
                    item.id === id
                        ? { ...item, value: num }
                        : item
                ),
            };

            return updated;
        });

        markLocalEdits();
    };

    const incrementValue = (id) => {
        if (selectedGraph === null) return;

        setGraphs((prev) => {
            const updated = [...prev];
            const current = updated[selectedGraph];
            if (!current) return prev;

            const oldGraph = current.graph || [];

            updated[selectedGraph] = {
                ...current,
                graph: oldGraph.map((item) =>
                    item.id === id ? { ...item, value: item.value + 1 } : item
                ),
            };

            return updated;
        });

        markLocalEdits();
    };

    const decrementValue = (id) => {
        if (selectedGraph === null) return;

        setGraphs((prev) => {
            const updated = [...prev];
            const current = updated[selectedGraph];
            if (!current) return prev;

            const oldGraph = current.graph || [];

            updated[selectedGraph] = {
                ...current,
                graph: oldGraph.map((item) =>
                    item.id === id
                        ? { ...item, value: item.value > 0 ? item.value - 1 : 0 }
                        : item
                ),
            };

            return updated;
        });

        markLocalEdits();
    };

    const deleteLabel = (id) => {
        if (selectedGraph === null) return;

        setGraphs((prev) => {
            const updated = [...prev];
            const current = updated[selectedGraph];
            if (!current) return prev;

            const oldGraph = current.graph || [];

            updated[selectedGraph] = {
                ...current,
                graph: oldGraph.filter((item) => item.id !== id),
            };

            return updated;
        });

        markLocalEdits();
    };

    return (
        <div className="bg-blue-300/20 dark:bg-blue-300/10 border dark:border-gray-400/40 border-white/80 mb-2 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-between shadow-sm" >

            <input ref={(el) => (inputRefs.current[item.id] = el)} value={item.label} onChange={(e) => handleLabelChange(item.id, e.target.value)} className="flex-1 min-w-0 truncate mr-3 bg-transparent outline-none sm:text-sm text-xs" />

            <div className="flex items-center gap-2">

                <button onClick={() => decrementValue(item.id)} className="sm:w-7 sm:h-7 w-5 h-5 flex items-center justify-center rounded-full border border-white/50 backdrop-blur-sm bg-white/20 duration-300 hover:bg-white sm:text-xs text-[8px] cursor-pointer shadow-sm dark:border-gray-400/40 dark:bg-blue-300/10 dark:hover:text-black " ><FontAwesomeIcon icon={faMinus} /></button>

                <input type="number" value={item.value} onChange={(e) => handleValueChange(item.id, e.target.value)} className="sm:w-14 w-10 truncate text-center border border-white/50 backdrop-blur-sm bg-white/20 rounded-md sm:text-sm text-xs py-1 outline-none focus:bg-white duration-300 shadow-sm dark:border-gray-400/40 dark:bg-blue-300/10 dark:focus:text-black " />

                <button onClick={() => incrementValue(item.id)} className="sm:w-7 sm:h-7 w-5 h-5 flex items-center justify-center rounded-full border border-white/50 backdrop-blur-sm bg-white/20 duration-300 hover:bg-white sm:text-xs text-[8px] cursor-pointer shadow-sm dark:border-gray-400/40 dark:bg-blue-300/10 dark:hover:text-black "><FontAwesomeIcon icon={faPlus} /></button>

                <button onClick={() => deleteLabel(item.id)} className="ml-2 border border-white/50 backdrop-blur-sm bg-white/20 duration-300 hover:bg-white cursor-pointer sm:w-7 sm:h-7 w-5 h-5 rounded-full text-red-500 shadow-sm sm:text-sm text-[10px] dark:border-gray-400/40 dark:bg-blue-300/10 "> <FontAwesomeIcon icon={faTrash} /></button>

            </div>
        </div>
    );
};

export default Label;