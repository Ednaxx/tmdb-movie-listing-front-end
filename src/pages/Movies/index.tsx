import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Navbar from "../../components/shared/Navbar";
import { tmdbService } from "../../services/tmdb";
import { useFavoritesStore } from "../../store/favorites";
import { Movie } from "../../types/tmdb";
import { FaSearch, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const {
    favorites,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    isLoading: favoritesLoading,
  } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleSearch = async (page: number = 1) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);
    try {
      const data = await tmdbService.searchMovies(searchQuery, page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to search movies. Please try again.");
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleToggleFavorite = async (movie: Movie) => {
    const movieId = movie.id;
    if (isFavorite(movieId)) {
      await removeFavorite(movieId);
    } else {
      await addFavorite({
        tmdb_movie_id: movieId,
        movie_title: movie.title,
        movie_poster_path: movie.poster_path,
      });
    }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Movies
          </h1>
          <p className="text-gray-600">
            Search for movies and add them to your favorites
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for movies..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={isSearching || !searchQuery.trim()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
            <Link
              to="/favorites"
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium flex items-center gap-2"
            >
              <FaHeart />
              Favorites ({favorites.length})
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Movies Grid */}
        {movies.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <Link to={`/movie/${movie.id}`} className="block">
                      <img
                        src={getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        className="w-full h-80 object-cover"
                      />
                    </Link>
                    <button
                      onClick={() => handleToggleFavorite(movie)}
                      disabled={favoritesLoading}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
                    >
                      {isFavorite(movie.id) ? (
                        <FaHeart className="text-pink-600" size={20} />
                      ) : (
                        <FaRegHeart className="text-gray-600" size={20} />
                      )}
                    </button>
                  </div>
                  <Link to={`/movie/${movie.id}`} className="block p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-purple-600 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "N/A"}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar size={14} />
                        <span className="text-gray-700 font-medium">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => handleSearch(currentPage - 1)}
                  disabled={currentPage === 1 || isSearching}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handleSearch(currentPage + 1)}
                  disabled={currentPage === totalPages || isSearching}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isSearching && movies.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No movies found. Try a different search term.
            </p>
          </div>
        )}

        {!searchQuery && movies.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg">
              Start searching to discover amazing movies!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
