import { useEffect, useRef, useContext } from "react";
// Context
import AppContext from "../context/AppContext.jsx";
import { useNotifications } from "../context/NotificationContext.jsx";

const useGraphsAutosave = () => {

  const { graphs, isAuth, backend_url, unsavedRef, setIsAuth, setName, setPicture, setEmail, setGraphs } = useContext(AppContext);
  const { isOnline, isVisible, notify, setIsSaving, setSavingError } = useNotifications();

  const saveTimeoutRef = useRef(null);
  const lastSavedSnapshotRef = useRef(null);

  useEffect(() => {
    if (!isAuth) return;

    let active = true;

    const saveLoop = async () => {
      if (!active) return;

      if (!isVisible) {
        saveTimeoutRef.current = setTimeout(saveLoop, 5000);
        return;
      }

      if (!isOnline) {
        saveTimeoutRef.current = setTimeout(saveLoop, 5000);
        return;
      }

      try {
        setIsSaving(true);
        setSavingError(false);

        if (!graphs) {
          saveTimeoutRef.current = setTimeout(saveLoop, 5000);
          return;
        }

        const snapshot = JSON.stringify(graphs);

        if (lastSavedSnapshotRef.current === snapshot) {
          saveTimeoutRef.current = setTimeout(saveLoop, 5000);
          return;
        }

        const res = await fetch(`${backend_url}/api/users/save-graphs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ graphs }),
        });

        const result = await res.json();

        if (result.status == 200) {
          lastSavedSnapshotRef.current = snapshot;
          if (unsavedRef) unsavedRef.current = false;
        }
        else if (result.status == 469) {
          notify("Session Expired", 5000, "Warning");
          localStorage.setItem("name", "");
          localStorage.setItem("email", "");
          localStorage.setItem("picture", "");
          localStorage.setItem("graphs", JSON.stringify([]));
          localStorage.setItem("isAuth", JSON.stringify(false));
          setEmail("");
          setName("");
          setPicture("");
          setGraphs([]);
          setIsAuth(false);
        }
        else {
          throw new Error(result);
        }
      } catch (err) {
        if(err.message) notify(err.message, 5000, "Warning");
        console.log("Autosave failed :", err);
        setSavingError(true);
      } finally {
        setIsSaving(false);
      }

      if (active) {
        saveTimeoutRef.current = setTimeout(saveLoop, 5000);
      }
    };

    saveLoop();

    return () => {
      active = false;
      clearTimeout(saveTimeoutRef.current);
    };

  }, [graphs, isAuth, backend_url, isOnline, isVisible, unsavedRef]);
};

export default useGraphsAutosave;