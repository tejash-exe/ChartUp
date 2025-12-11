import { useContext, useEffect, useState } from "react";
// Context
import AppContext from "../context/AppContext.jsx";
// Hooks
import useGraphsAutosave from "../hooks/useGraphsAutosave.jsx";
import useGraphsPolling from "../hooks/useGraphsPolling.jsx";
// Components
import Navbar from "../components/navbar/Navbar.jsx";
import GraphModule from "../components/graphModule/GraphModule.jsx";
import LableModule from "../components/lableModule/LableModule.jsx";

const App = () => {

  const { graphs, selectedGraph } = useContext(AppContext);

  const [graph, setGraph] = useState(() => {
    return selectedGraph !== null && graphs[selectedGraph]
      ? graphs[selectedGraph].graph
      : [];
  });

  useEffect(() => {
    if (selectedGraph !== null && graphs[selectedGraph]) {
      setGraph(graphs[selectedGraph].graph);
    } else {
      setGraph([]);
    }
  }, [selectedGraph, graphs]);

  useGraphsAutosave();
  useGraphsPolling();

  return (
    <div id="page" className=" md:h-screen min-h-screen flex flex-col overflow-clip bg-radial-[at_2%_2%] from-white from-0% dark:from-10% dark:via-60% dark:to-90% via-blue-200 via-50% to-blue-300 to-100% dark:from-blue-950 dark:via-gray-950 dark:to-black">

      <Navbar />

      {graphs[0] ? (
        <div id="mainContainer" className="flex flex-1 md:flex-row flex-col min-h-0 w-full mb-6 md:mt-2 mt-10 md:px-6 px-3 md:gap-6">

          <GraphModule graph={graph} />
          <LableModule graph={graph} />

        </div>
      ) : (
        <div className="flex justify-center items-center flex-1">
          <div className="justify-center items-center p-6 border border-white rounded-lg mb-20 shadow-lg bg-white/20 cursor-default mx-4 flex flex-col">
            <div className="text-xl font-semibold mb-2">Start your Journey 🚀</div>
            <div>Click "Add new graph" from the top</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;