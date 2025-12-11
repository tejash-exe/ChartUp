import { useEffect } from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircleInfo, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";

const Notification = ({ notification, removeNotification }) => {
  
  const { id, message, duration, type } = notification;

  useEffect(() => {
    const t = setTimeout(() => removeNotification(id), duration);
    return () => clearTimeout(t);
  }, [duration, id, removeNotification]);

  return (
    <div className="relative w-72 max-w-sm rounded-md border border-white bg-white/20 backdrop-blur-xs shadow-lg shadow-blue-500/10 pt-3 text-sm flex items-center gap-3 flex-col dark:bg-blue-950/80 dark:border-gray-400/40 ">
      <div className="flex items-center justify-between w-full px-3">
        <div className="flex items-center w-full min-w-0">
          {(type == "Default") && <div className="text-blue-500 mr-2 shrink-0">
            <FontAwesomeIcon icon={faCircleInfo} />
          </div>}
          {(type == "Online") && <div className="text-green-500 mr-2 shrink-0">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>}
          {(type == "Offline") && <div className="text-red-500 mr-2 shrink-0">
            <FontAwesomeIcon icon={faXmark} />
          </div>}
          {(type == "Warning") && <div className="text-yellow-300 mr-2 shrink-0">
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </div>} 
          <div className="flex-1 min-w-0">
            <div className="text-xs truncate text-gray-700 dark:text-gray-300">
              {message}
            </div>
          </div>
        </div>
        <button onClick={() => removeNotification(id)} className="ml-2 text-xs text-gray-500 hover:text-gray-800 shrink-0 cursor-pointer">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="w-full px-1 pt-1">
        <div className="w-full h-1 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-blue-500/80 notification-timer" style={{ animationDuration: `${duration}ms` }} />
        </div>
      </div>
    </div>
  );
};

export default Notification;