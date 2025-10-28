import React from "react";
import { Navigate } from "react-router";
import { useLogin } from "./hooks";
import { LoginHeader, LoginForm, LoginExtras } from "../../components/Login";

const Login = () => {
  const {
    formData,
    isLoading,
    error,
    isAuth,
    handleInputChange,
    handleSubmit,
  } = useLogin();

  if (isAuth) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <LoginHeader />

        <div className="bg-white rounded-lg shadow-xl p-8">
          <LoginForm
            formData={formData}
            isLoading={isLoading}
            error={error}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />

          <LoginExtras />
        </div>
      </div>
    </div>
  );
};

export default Login;
