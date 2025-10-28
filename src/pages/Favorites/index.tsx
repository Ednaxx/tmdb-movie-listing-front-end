import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "../../components/shared/Navbar";
import { useFavoritesStore } from "../../store/favorites";
import {
  FaHeart,
  FaTrash,
  FaShare,
  FaCopy,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const Favorites = () => {
  const {
    favorites,
    fetchFavorites,
    removeFavorite,
    isLoading,
    error,
    shareToken,
    shareUrl,
    generateShareLink,
    revokeShareLink,
  } = useFavoritesStore();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleCopyShareLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGenerateLink = async () => {
    await generateShareLink();
  };

  const handleRevokeLink = async () => {
    await revokeShareLink();
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Favorites
            </h1>
            <p className="text-gray-600">
              {favorites.length} movie{favorites.length !== 1 ? "s" : ""} in
              your collection
            </p>
          </div>
          <Link
            to="/movies"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Discover Movies
          </Link>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FaShare className="text-purple-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-900">
              Share Your Favorites
            </h2>
          </div>

          {shareToken ? (
            <div>
              <p className="text-gray-600 mb-4">
                Your favorites list is publicly accessible via this link:
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={shareUrl || ""}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button
                  onClick={handleCopyShareLink}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <FaCheck /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy
                    </>
                  )}
                </button>
              </div>
              <button
                onClick={handleRevokeLink}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <FaTimes /> Revoke Share Link
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                Generate a public link to share your favorites list with others.
              </p>
              <button
                onClick={handleGenerateLink}
                disabled={isLoading || favorites.length === 0}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors font-medium flex items-center gap-2"
              >
                <FaShare /> Generate Share Link
              </button>
              {favorites.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Add some favorites first to generate a share link
                </p>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <FaTimes className="text-red-600" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Favorites Grid */}
        {isLoading && favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading favorites...</p>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={getImageUrl(favorite.movie_poster_path)}
                    alt={favorite.movie_title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-pink-600 text-white px-2 py-1 rounded-full flex items-center gap-1">
                    <FaHeart size={12} />
                  </div>
                  <button
                    onClick={() => removeFavorite(favorite.tmdb_movie_id)}
                    disabled={isLoading}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                    title="Remove from favorites"
                  >
                    <FaTrash className="text-red-600" size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                    {favorite.movie_title}
                  </h3>
                  <div className="text-xs text-gray-500">
                    Added on{" "}
                    {new Date(favorite.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FaHeart className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Favorites Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start building your collection by adding movies to your favorites!
            </p>
            <Link
              to="/movies"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Discover Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
