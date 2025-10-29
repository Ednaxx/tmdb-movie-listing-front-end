import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { tmdbService } from "../../services/tmdb";
import { FavoriteMovie } from "../../types/tmdb";
import { FaHeart, FaArrowLeft } from "react-icons/fa";

const SharedFavorites = () => {
  const { shareToken } = useParams<{ shareToken: string }>();
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSharedFavorites = async () => {
      if (!shareToken) {
        setError("Invalid share link");
        setIsLoading(false);
        return;
      }

      try {
        const data = await tmdbService.getSharedFavorites(shareToken);
        setFavorites(data);
      } catch (err) {
        setError(
          "Failed to load shared favorites. The link may be invalid or expired.",
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSharedFavorites();
  }, [shareToken]);

  const getImageUrl = (path: string | null) => {
    if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Go to home"
            >
              <FaArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Shared Favorites</h1>
              <p className="text-purple-100 text-sm">
                Someone shared their favorite movies with you
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading shared favorites...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Go to Home
              </Link>
            </div>
          </div>
        )}

        {/* Favorites Grid */}
        {!isLoading && !error && favorites.length > 0 && (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {favorites.length} movie{favorites.length !== 1 ? "s" : ""} in
                this collection
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favorites.map((favorite) => (
                <Link
                  key={favorite.id}
                  to={`/movie/${favorite.tmdb_movie_id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow block"
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
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-purple-600 transition-colors">
                      {favorite.movie_title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && favorites.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FaHeart className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Favorites Shared
            </h3>
            <p className="text-gray-600">
              This collection doesn&apos;t have any movies yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedFavorites;
