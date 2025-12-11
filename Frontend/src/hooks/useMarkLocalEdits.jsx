import { useContext } from "react";
// Context
import AppContext from "../context/AppContext";

const markLocalEdits = () => {
    const { unsavedRef, pausePollingRef } = useContext(AppContext);
    unsavedRef.current = true;
    pausePollingRef.current = Date.now() + 6000;
};

export default markLocalEdits;