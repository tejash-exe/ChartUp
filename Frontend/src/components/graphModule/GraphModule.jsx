import { useContext, useRef } from "react";
// Context
import AppContext from "../../context/AppContext.jsx";
import { useNotifications } from "../../context/NotificationContext.jsx";
// Hooks
import markLocalEdits from "../../hooks/useMarkLocalEdits.jsx";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faDownload, faTrash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
// Components
import BarGraph from "./graphs/BarGraph.jsx";
import LineGraph from "./graphs/LineGraph.jsx";
import PieChartGraph from "./graphs/PieChartGraph.jsx";
import GraphTypeSelector from "./GraphTypeSelector.jsx";
import TitleInput from "./TitleInput.jsx";

const GraphModule = ({ graph }) => {
    
    const { isAuth, graphs, selectedGraph, setGraphs, setSelectedGraph } = useContext(AppContext);
    const { isSaving, savingError } = useNotifications();
    const chartRef = useRef(null);
    
    const activeGraph = selectedGraph !== null ? graphs[selectedGraph] : null;
    const graphType = activeGraph?.type || "bar";

    const handleDownloadPng = () => {
        const chart = chartRef.current;
        if (!chart) return;

        const url = chart.toBase64Image();
        const link = document.createElement("a");
        link.href = url;
        link.download = `${graphs[selectedGraph].title}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDeleteGraph = () => {
        if (selectedGraph === null) return;

        setGraphs(prev => {
            if (!prev.length) return prev;

            const newGraphs = prev.filter((_, idx) => idx !== selectedGraph);

            if (newGraphs.length === 0) {
                setSelectedGraph(null);
            } else if (selectedGraph >= newGraphs.length) {
                setSelectedGraph(newGraphs.length - 1);
            } else {
                setSelectedGraph(selectedGraph);
            }

            return newGraphs;
        });

        markLocalEdits();
    };


    return (
        <div className="md:w-1/2 w-full module">
            <div className="md:p-4 p-2 bg-white/20 dark:bg-black/20 dark:border-gray-400/40 rounded-3xl border border-white/50 backdrop-blur-sm">

                <div className="flex h-min mb-2 justify-between items-center">
                    <TitleInput />
                    <div className='flex justify-end gap-4 items-center'>
                        <button onClick={handleDownloadPng} className="shrink-0 md:w-10 md:h-10 w-8 h-8 outline-none flex items-center border border-white justify-center rounded-full shadow-sm duration-200 cursor-pointer bg-white hover:bg-white/20 hover:backdrop-blur-xs dark:border-gray-400/40 dark:hover:text-white dark:hover:bg-transparent" title='Download PNG'>
                            <FontAwesomeIcon icon={faDownload} />
                        </button>
                        <GraphTypeSelector graphType={graphType} />
                    </div>
                </div>

                <div className="relative w-full h-72">
                    {graphType === "Bar" && (
                        <BarGraph ref={chartRef} graph={graph} />
                    )}
                    {graphType === "Line" && (
                        <LineGraph ref={chartRef} graph={graph} />
                    )}
                    {graphType === "Pie" && (
                        <PieChartGraph ref={chartRef} graph={graph} />
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center mx-2 my-4">
                {isAuth && isSaving && <div className='text-slate-500'><FontAwesomeIcon className='mr-1 animate-spin' icon={faArrowsRotate}/>Autosaving</div>}
                {isAuth && !isSaving && savingError && <div className='text-slate-500'><FontAwesomeIcon className='mr-1' icon={faTriangleExclamation}/>Error while saving</div>}
                {isAuth && !isSaving && !savingError && <div className='text-slate-500'><FontAwesomeIcon className='mr-1' icon={faFloppyDisk}/>Autosaved</div>}
                {!isAuth && <div></div>}
                <button onClick={handleDeleteGraph} className="border-2 rounded-md text-sm px-3 py-2 text-white bg-red-500 cursor-pointer hover:bg-red-500/60 shadow-sm duration-200 border-red-500"><FontAwesomeIcon className='mr-1' icon={faTrash}/>Delete graph</button>
            </div>
        </div>
    );
};

export default GraphModule;