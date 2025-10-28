import React from "react";
import { Navigate, Link } from "react-router";
import { FaFilm, FaExclamationCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSignup } from "./hooks";

const Signup = () => {
  const {
    formData,
    isLoading,
    error,
    isAuth,
    handleInputChange,
    handleSubmit,
  } = useSignup();

  if (isAuth) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <FaFilm className="h-10 w-10 text-purple-600" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">TMDB Movies</h2>
          <p className="text-purple-200">Create your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <FaExclamationCircle className="h-5 w-5 text-red-400" />
                  <p className="ml-2 text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Choose a username"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter password (min. 6 characters)"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.username.trim() ||
                  !formData.email.trim() ||
                  !formData.password.trim() ||
                  !formData.confirmPassword.trim()
                }
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading && (
                  <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                )}
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
