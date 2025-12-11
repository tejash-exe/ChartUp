import { createContext, useContext, useState, useCallback, useEffect } from "react";
import Notification from "../components/notification/Notification.jsx";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {

  const [notifications, setNotifications] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [savingError, setSavingError] = useState(false);

  const notify = useCallback((message, duration = 4000, type = "Default") => {
    const id = Date.now().toString();

    setNotifications((prev) => [
      ...prev,
      { id, type, message, duration },
    ]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  const [isVisible, setIsVisible] = useState(
    typeof document !== "undefined" ? !document.hidden : true
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      notify("Back online", 3000, "Online");
    };

    const handleOffline = () => {
      setIsOnline(false)
      notify("Went offline", 3000, "Offline");
    };

    const handleVisibilityChange = () => setIsVisible(!document.hidden);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{
      notify,
      isOnline,
      setIsOnline,
      isVisible,
      setIsVisible,
      isSaving,
      setIsSaving,
      savingError,
      setSavingError,
    }}>
      <div className="fixed bottom-4 right-1/2 translate-x-1/2 z-50 flex flex-col gap-3">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            removeNotification={removeNotification}
          />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotifications must be used inside NotificationProvider!");
  }
  return ctx;
};