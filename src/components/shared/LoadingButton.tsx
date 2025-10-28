import React from "react";

interface LoadingButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingButton = ({
  type = "button",
  onClick,
  disabled,
  isLoading,
  loadingText = "Carregando...",
  children,
  variant = "primary",
  size = "md",
  className = "",
}: LoadingButtonProps) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white",
    success: "bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white",
  };

  const sizes = {
    sm: "py-1 px-2 text-xs",
    md: "py-2 px-4 text-sm",
    lg: "py-3 px-6 text-base",
  };

  const baseClass =
    "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center";
  const buttonClass = `${baseClass} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClass}
    >
      {isLoading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      )}
      {isLoading ? loadingText : children}
    </button>
  );
};

export default LoadingButton;
