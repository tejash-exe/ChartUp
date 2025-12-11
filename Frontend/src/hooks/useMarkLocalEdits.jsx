import { useContext } from "react";
// Context
import AppContext from "../context/AppContext";

const useMarkLocalEdits = () => {
    const { unsavedRef, pausePollingRef } = useContext(AppContext);

    const markLocalEdits = () => {
        unsavedRef.current = true;
        pausePollingRef.current = Date.now() + 6000;
    };

    return markLocalEdits;
};

export default useMarkLocalEdits;