import React from "react";
import { FaFilm } from "react-icons/fa";

const LoginHeader = () => {
  return (
    <div className="text-center">
      <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
        <FaFilm className="h-10 w-10 text-purple-600" />
      </div>
      <h2 className="text-4xl font-bold text-white mb-2">TMDB Movies</h2>
      <p className="text-purple-200">Sign in to explore movies</p>
    </div>
  );
};

export default LoginHeader;
