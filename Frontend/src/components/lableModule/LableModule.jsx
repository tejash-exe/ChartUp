import { useContext, useEffect, useRef } from "react";
// Context
import AppContext from "../../context/AppContext.jsx";
// Hooks
import useMarkLocalEdits from "../../hooks/useMarkLocalEdits.jsx";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faScroll } from "@fortawesome/free-solid-svg-icons";
// Components
import Label from "./Label.jsx";

const LableModule = ({ graph }) => {

    const { selectedGraph, setGraphs } = useContext(AppContext);

    const scrollRef = useRef(null);
    const inputRefs = useRef({});
    const lastAddedIdRef = useRef(null);

    const markLocalEdits = useMarkLocalEdits();

    useEffect(() => {
        const lastId = lastAddedIdRef.current;
        if (!lastId) return;

        const input = inputRefs.current[lastId];
        if (input) {
            input.focus();
            input.select();
        }

        requestAnimationFrame(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: "smooth"
                });
            }
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        });

        lastAddedIdRef.current = null;
    }, [graph]);

    const addLabel = () => {
        if (selectedGraph === null) return;

        const id = Date.now().toString();
        lastAddedIdRef.current = id;

        setGraphs(prev => {
            const updated = [...prev];
            const current = updated[selectedGraph];
            if (!current) return prev;

            updated[selectedGraph] = {
                ...current,
                graph: [
                    ...(current.graph || []),
                    {
                        id,
                        label: `Label ${(current.graph?.length || 0) + 1}`,
                        value: 1
                    }
                ]
            };

            return updated;
        });

        markLocalEdits();
    };

    return (
        <div className="border-2 module h-full flex flex-col border-white dark:border-gray-400/40 rounded-3xl md:w-1/2 w-full overflow-hidden">
            <div ref={scrollRef} className="overflow-y-auto h-full custom-scroll p-4 dark:text-white">
                <div className="mb-2"><FontAwesomeIcon className="pr-1" icon={faScroll} /> Labels</div>

                {graph.map((item) => (
                    <Label key={item.id} item={item} inputRefs={inputRefs} />
                ))}

                <div onClick={addLabel} className="bg-white rounded-xl px-4 py-2 sm:text-xl mb-2 flex justify-center items-center cursor-pointer border border-white text-black dark:border-gray-400/40 hover:bg-white/20 active:bg-transparent duration-200 dark:hover:text-white dark:hover:bg-transparent">
                    <FontAwesomeIcon className="pr-2 text-xl" icon={faPlus} />
                    <div>Add New Label</div>
                </div>
            </div>

        </div>
    );
};

export default LableModule;