import { useEffect, useRef, useContext } from "react";
// Context
import AppContext from "../context/AppContext.jsx";
import { useNotifications } from "../context/NotificationContext.jsx";

const useGraphsPolling = () => {

  const { backend_url, setGraphs, unsavedRef, pausePollingRef, isAuth, setIsAuth, setName, setEmail, setPicture } = useContext(AppContext);
  const { isOnline, isVisible, notify, isSaving } = useNotifications();

  const lastUpdatedRef = useRef(null);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    let active = true;

    const scheduleNext = (fn = poll) => {
      if (!active) return;
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        if (active) fn();
      }, 5000);
    };

    const poll = async () => {
      if (!active) return;

      if (!isAuth) {
        scheduleNext();
        return;
      }

      if (isSaving) {
        scheduleNext();
        return;
      }

      if (Date.now() < (pausePollingRef?.current || 0)) {
        scheduleNext();
        return;
      }

      if (unsavedRef?.current) {
        scheduleNext();
        return;
      }

      if (!isOnline || !isVisible) {
        return;
      }

      try {
        const res = await fetch(`${backend_url}/api/users/get-graphs`, {
          method: "GET",
          credentials: "include",
        });

        const result = await res.json();

        if (result.status == 200) {
          const { graphs: serverGraphs, updatedAt } = result.data;

          if (lastUpdatedRef.current !== updatedAt) {
            lastUpdatedRef.current = updatedAt;
            setGraphs(serverGraphs || []);
            console.log("Graphs Updated!");
          }
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
        console.log("Polling error: ", err);
      }

      if (active && isOnline && isVisible) {
        scheduleNext();
      }
    };

    poll();

    return () => {
      active = false;
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [backend_url, isOnline, isVisible, unsavedRef, pausePollingRef, isAuth]);

  return;
};

export default useGraphsPolling;