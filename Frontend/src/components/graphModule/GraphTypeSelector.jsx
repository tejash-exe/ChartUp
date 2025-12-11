import { useContext, useEffect, useRef, useState } from "react";
// Context
import AppContext from "../../context/AppContext.jsx";
// Hooks
import markLocalEdits from "../../hooks/useMarkLocalEdits.jsx";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChartColumn, faChartLine, faChartPie } from "@fortawesome/free-solid-svg-icons";

const GRAPH_TYPES = [
  {
    value: "Bar",
    label: "Bar graph",
    icon: faChartColumn,
  },
  {
    value: "Line",
    label: "Line graph",
    icon: faChartLine,
  },
  {
    value: "Pie",
    label: "Pie chart",
    icon: faChartPie,
  },
];

const GraphTypeSelector = ({ graphType }) => {

  const { selectedGraph, setGraphs } = useContext(AppContext);
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);

  const currentType = GRAPH_TYPES.find((t) => t.value === graphType) || GRAPH_TYPES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = dropdownRef.current;
      if (dropdown && !dropdown.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGraphTypeChange = (typeValue) => {
    if (selectedGraph === null) return;

    setGraphs(prev => {
      const updated = [...prev];
      if (!updated[selectedGraph]) return prev;

      updated[selectedGraph] = {
        ...updated[selectedGraph],
        type: typeValue,
      };

      return updated;
    });

    markLocalEdits();
  };

  const handleSelect = (value) => {
    setOpen(false);
    handleGraphTypeChange(value);
  };

  return (
    <div className="relative" ref={dropdownRef}>

      <button onClick={() => setOpen((prev) => !prev)} className={"inline-flex items-center gap-2 p-2 rounded-md duration-200 cursor-pointer border border-white shadow-sm sm:text-sm text-xs dark:border-gray-400/40" + (open ? "  dark:text-white " : " bg-white hover:bg-white/20 hover:backdrop-blur-xs dark:hover:text-white dark:hover:bg-transparent")}>
        <FontAwesomeIcon icon={currentType.icon} />
        <span className="sm:block hidden">{currentType.label}</span>
        <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute overflow-clip right-0 mt-2 w-40 rounded-lg border border-white bg-white/60 backdrop-blur-xs shadow-lg z-20 dark:bg-blue-950/80 dark:border-gray-400/40">
          <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Graph type</div>
          
          {GRAPH_TYPES.map((type) => (
            <button key={type.value} onClick={() => handleSelect(type.value)} className="flex w-full items-center gap-2 px-3 py-2 hover:bg-white/80 cursor-pointer sm:text-sm text-xs dark:text-slate-200 dark:hover:bg-black/80" >
              <FontAwesomeIcon icon={type.icon} className="text-[12px]" />
              <span>{type.label}</span>
              {graphType === type.value && (
                <span className="ml-auto text-blue-500 text-xs">●</span>
              )}
            </button>
          ))}
          
        </div>
      )}
    </div>
  );
};

export default GraphTypeSelector;