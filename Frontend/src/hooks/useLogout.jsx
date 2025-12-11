import { useContext, useState } from "react";
// Context
import AppContext from "../context/AppContext.jsx";
import { useNotifications } from "../context/NotificationContext.jsx";

const useLogout = () => {

  const { setName, setEmail, setPicture, setGraphs, setIsAuth, backend_url } = useContext(AppContext);
  const { notify } = useNotifications();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/api/users/logout`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await response.json();
      if(result.status == 200){
        notify("Logged out Successfully!", 5000);
      }
    } catch (error) {
      if (error.message) notify(error.message, 5000, "Warning");
      console.log(error);
    } finally {
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
      setLoading(false);
    }
  };
  return handleLogout;
};

export default useLogout;