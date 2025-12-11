import { createContext, useEffect, useState, useRef } from "react";
import useTheme from "../hooks/useTheme.jsx";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

  const backend_url = "http://localhost:5000";

  const unsavedRef = useRef(false);
  const pausePollingRef = useRef(0);

  const [isAuth, setIsAuth] = useState(() => {
    const saved = localStorage.getItem("isAuth");
    return saved ? JSON.parse(saved) : false;
  });
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [picture, setPicture] = useState(localStorage.getItem("picture") || "");
  const [graphs, setGraphs] = useState(() => {
    const saved = localStorage.getItem("graphs");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedGraph, setSelectedGraph] = useState(() => {
    const saved = localStorage.getItem("selectedGraph");
    return saved ? JSON.parse(saved) : null;
  });

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  useTheme(theme, setTheme);

  useEffect(() => {
    setSelectedGraph((prev) => {
      if (!graphs || graphs.length === 0) return null;
      if (prev !== null && graphs[prev]) return prev;
      return 0;
    });
  }, [graphs]);

  useEffect(() => {
    if (selectedGraph !== null && graphs[selectedGraph]) {
      document.title = `${graphs[selectedGraph].title} | ChartUp`;
    } else {
      document.title = "ChartUp";
    }
  }, [selectedGraph, graphs]);

  useEffect(() => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
  }, [isAuth]);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem("picture", picture);
  }, [picture]);

  useEffect(() => {
    localStorage.setItem("graphs", JSON.stringify(graphs));
  }, [graphs]);

  useEffect(() => {
    localStorage.setItem("selectedGraph", JSON.stringify(selectedGraph));
  }, [selectedGraph]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        backend_url,

        unsavedRef,
        pausePollingRef,

        isAuth,
        setIsAuth,

        name,
        setName,

        email,
        setEmail,

        picture,
        setPicture,

        graphs,
        setGraphs,

        selectedGraph,
        setSelectedGraph,

        theme,
        setTheme,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;