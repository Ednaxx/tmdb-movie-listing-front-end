import React from "react";
import { FaFilm, FaSignOutAlt } from "react-icons/fa";
import { useUserStore } from "../../store";

const Navbar = () => {
  const username = useUserStore((state) => state.username);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <FaFilm className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">TMDB Movies</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">
              Welcome, {username || "User"}!
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-gray-100 transition-colors duration-200 font-medium shadow-md"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
