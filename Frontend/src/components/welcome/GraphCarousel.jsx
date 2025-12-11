import { useContext, useEffect, useRef, useState } from "react";
// Context
import AppContext from "../../context/AppContext";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChartBar, faChartLine, faChartPie, faDownload } from "@fortawesome/free-solid-svg-icons";
// Components
import BarGraph from "../graphModule/graphs/BarGraph";
import LineGraph from "../graphModule/graphs/LineGraph";
import PieChartGraph from "../graphModule/graphs/PieChartGraph";

const GRAPH_TYPES = [
    { value: "Bar", label: "Bar graph", icon: faChartBar },
    { value: "Line", label: "Line graph", icon: faChartLine },
    { value: "Pie", label: "Pie chart", icon: faChartPie },
];

const GraphCarousel = ({ graph, defaultGraphType = "Bar", isType = false, isDownload = false }) => {

    const { theme } = useContext(AppContext);

    const dropdownRef = useRef(null);
    const chartRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [graphType, setGraphType] = useState(defaultGraphType);

    const currentType = GRAPH_TYPES.find((t) => t.value === graphType) || GRAPH_TYPES[0];

    const handleDownloadPng = () => {
        const chart = chartRef.current;
        if (!chart) return;

        const canvas = chart.canvas;

        const tmp = document.createElement("canvas");
        tmp.width = canvas.width;
        tmp.height = canvas.height;
        const ctx = tmp.getContext("2d");

        const bgColor = theme === "dark" ? "#0b1220" : "#ffffff";
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, tmp.width, tmp.height);

        ctx.drawImage(canvas, 0, 0, tmp.width, tmp.height);

        const url = tmp.toDataURL("image/jpeg", 3.0);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${graphs[selectedGraph].title || "chart"}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const onDocClick = (e) => {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    const handleSelect = (value) => {
        setGraphType(value);
        setOpen(false);
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-3 gap-3 flex-col">
                <div className="flex justify-between w-full">

                    {isType && (
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setOpen((p) => !p)}
                                className={"inline-flex items-center gap-2 p-2 rounded-md duration-200 cursor-pointer border border-white shadow-sm text-xs dark:border-gray-400/40" + (open ? " dark:text-white " : " bg-white hover:bg-white/20 hover:backdrop-blur-xs dark:hover:text-white dark:hover:bg-transparent ")} title={"Select graph type"}>
                                <FontAwesomeIcon icon={currentType.icon} />
                                <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                            </button>

                            {open && (
                                <div className="absolute overflow-clip left-0 mt-2 w-40 rounded-lg border border-white bg-white/60 dark:bg-blue-950/80 dark:border-gray-400/40 backdrop-blur-xs shadow-lg z-20">
                                    <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Graph type</div>
                                    {GRAPH_TYPES.map((type) => (
                                        <button key={type.value} onClick={() => handleSelect(type.value)} className="flex w-full items-center gap-2 px-3 py-2 hover:bg-white/80 cursor-pointer sm:text-sm text-xs dark:text-slate-200 dark:hover:bg-black/80">
                                            <FontAwesomeIcon icon={type.icon} className="text-[12px]" />
                                            <span>{type.label}</span>
                                            {graphType === type.value && <span className="ml-auto text-blue-500 text-xs">●</span>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {isDownload && (
                        <button onClick={handleDownloadPng} className="shrink-0 w-8 h-8 outline-none flex items-center border border-white justify-center rounded-full shadow-sm duration-200 cursor-pointer bg-white hover:bg-white/20 hover:backdrop-blur-xs dark:hover:text-white dark:hover:bg-transparent dark:border-gray-400/40" title="Download Image">
                            <FontAwesomeIcon icon={faDownload} />
                        </button>
                    )}

                    {!isType && !isDownload && (
                        <button className="shrink-0 invisible w-8 h-8 outline-none flex items-center border border-white justify-center rounded-full shadow-sm duration-200 cursor-pointer bg-white hover:bg-white/20 hover:backdrop-blur-xs" title="Download Image">
                            <FontAwesomeIcon icon={faDownload} />
                        </button>
                    )}
                </div>
            </div>

            <div className="relative w-full sm:h-40 h-25 rounded-lg overflow-hidden">
                {graphType === "Bar" && <BarGraph ref={chartRef} graph={graph} />}
                {graphType === "Line" && <LineGraph ref={chartRef} graph={graph} />}
                {graphType === "Pie" && <PieChartGraph ref={chartRef} graph={graph} />}
            </div>

        </div>
    );
};

export default GraphCarousel;