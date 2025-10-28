import React from "react";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

interface AlertMessageProps {
  type: "error" | "success" | "warning";
  message?: string;
  children?: React.ReactNode;
}

const AlertMessage = ({ type, message, children }: AlertMessageProps) => {
  const styles = {
    error: {
      container: "bg-red-50 border border-red-200 rounded-lg p-4",
      icon: "text-red-400",
      text: "text-red-800",
    },
    success: {
      container: "bg-green-50 border border-green-200 rounded-lg p-4",
      icon: "text-green-600",
      text: "text-green-800",
    },
    warning: {
      container: "bg-yellow-50 border border-yellow-200 rounded-lg p-4",
      icon: "text-yellow-600",
      text: "text-yellow-800",
    },
  };

  const currentStyle = styles[type] || styles.error;
  const IconComponent =
    type === "success" ? FaCheckCircle : FaExclamationCircle;

  return (
    <div className={currentStyle.container}>
      <div className="flex items-center">
        <IconComponent className={`h-5 w-5 ${currentStyle.icon} mr-2`} />
        <div className="flex-1">
          {message && (
            <p className={`text-sm ${currentStyle.text}`}>{message}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AlertMessage;
