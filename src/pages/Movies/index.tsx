import React from "react";
import Navbar from "../../components/shared/Navbar";

const Movies = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Movie Listing</h2>
        <p className="text-gray-600">Movie content will be displayed here...</p>
      </div>
    </div>
  );
};

export default Movies;
