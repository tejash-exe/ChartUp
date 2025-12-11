import { useEffect, useState, useContext, useRef } from "react";
// Context
import AppContext from "../../context/AppContext.jsx";
// Hooks
import useMarkLocalEdits from "../../hooks/useMarkLocalEdits.jsx";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";

const GraphSelector = () => {

  const { graphs, selectedGraph, setSelectedGraph, setGraphs } = useContext(AppContext);
  const [graphOpen, setGraphOpen] = useState(false);
  const graphDropdownRef = useRef(null);

  const markLocalEdits = useMarkLocalEdits();

  const hasGraphs = graphs && graphs.length > 0;
  const currentGraphTitle = hasGraphs && graphs[selectedGraph] ? graphs[selectedGraph].title : "Select graph";

  const addNewGraph = () => {
    setGraphs((prev) => {
      const updated = [
        ...prev,
        {
          title: "Untitled Graph",
          type: "Bar",
          graph: [],
        }
      ];

      setSelectedGraph(updated.length - 1);
      return updated;
    });

    markLocalEdits();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = graphDropdownRef.current;
      if (dropdown && !dropdown.contains(event.target)) {
        setGraphOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGraphChange = (index) => {
    setSelectedGraph(index);
    setGraphOpen(false);
  };

  const handleAddNewGraph = () => {
    setGraphOpen(false);
    addNewGraph();
  };

  return (
    <div className="absolute md:relative md:top-0 top-18 z-50" ref={graphDropdownRef}>
      {hasGraphs ? (
        <button title="Select graph" onClick={() => setGraphOpen((prev) => !prev)} className={"inline-flex items-center h-8 gap-2 px-3 py-1.5 rounded-md md:text-sm text-xs duration-200 cursor-pointer border border-white shadow-sm dark:border-gray-400/40" + (graphOpen ? " dark:text-white " : " bg-white hover:bg-white/20 hover:backdrop-blur-xs dark:text-white dark:hover:bg-transparent dark:bg-black/20 ")}>
          <span>{currentGraphTitle}</span>
          <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] transition-transform ${graphOpen ? "rotate-180" : ""}`} />
        </button>
      ) : (
        <button onClick={handleAddNewGraph} className="inline-flex items-center h-8 gap-2 px-3 py-1.5 rounded-md md:text-sm text-xs duration-200 cursor-pointer dark:border-gray-400/40 border border-white shadow-sm text-nowrap bg-white hover:bg-white/20 hover:backdrop-blur-xs dark:text-white dark:hover:bg-transparent dark:bg-black/20 ">
          <FontAwesomeIcon icon={faPlus} />
          <span>Add new Graph</span>
        </button>
      )}

      {graphOpen && (
        <div className="absolute overflow-clip left-0 mt-2 sm:w-50 w-40 rounded-lg border border-white bg-white/60 backdrop-blur-xs shadow-lg z-20 dark:bg-blue-950/80 dark:border-gray-400/40">
          <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"> Select Graph </div>

          {hasGraphs &&
            graphs.map((graph, index) => (
              <button key={index} onClick={() => handleGraphChange(index)} className="flex w-full items-center gap-2 px-3 py-2 sm:text-sm text-xs hover:bg-white/80 cursor-pointer dark:text-slate-200 dark:hover:bg-black/80">
                <span className="truncate">{graph.title}</span>
                {selectedGraph === index && (<span className="ml-auto text-blue-500 text-xs shrink-0">●</span>)}
              </button>
            ))}

          <button onClick={handleAddNewGraph} className="flex w-full items-center gap-2 px-3 py-2 sm:text-sm text-xs hover:bg-white border-t border-white cursor-pointer dark:border-gray-400/40 dark:text-slate-200 dark:hover:bg-black/80">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add new Graph</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default GraphSelector;