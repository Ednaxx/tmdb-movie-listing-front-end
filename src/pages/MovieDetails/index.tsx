import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import Navbar from "../../components/shared/Navbar";
import { tmdbService } from "../../services/tmdb";
import { useFavoritesStore } from "../../store/favorites";
import { MovieDetails as MovieDetailsType } from "../../types/tmdb";
import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaClock,
  FaCalendar,
  FaDollarSign,
  FaPlay,
  FaExternalLinkAlt,
} from "react-icons/fa";

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "cast" | "videos" | "reviews"
  >("overview");

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
    isLoading: favoritesLoading,
  } = useFavoritesStore();

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (!movieId) return;

      setIsLoading(true);
      setError(null);
      try {
        const data = await tmdbService.getMovieDetails(parseInt(movieId));
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  const handleToggleFavorite = async () => {
    if (!movie) return;

    if (isFavorite(movie.id)) {
      await removeFavorite(movie.id);
    } else {
      await addFavorite({
        tmdb_movie_id: movie.id,
        movie_title: movie.title,
        movie_poster_path: movie.poster_path,
      });
    }
  };

  const getImageUrl = (path: string | null, size: string = "w500") => {
    if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600 text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg mb-4">
              {error || "Movie not found"}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const trailer = movie.videos?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  const director = movie.credits?.crew.find((c) => c.job === "Director");
  const topCast = movie.credits?.cast.slice(0, 12) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with Backdrop */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: movie.backdrop_path
            ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${getImageUrl(movie.backdrop_path, "original")})`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors text-white"
          >
            <FaArrowLeft size={20} />
          </button>

          <div className="flex gap-8 items-start">
            <img
              src={getImageUrl(movie.poster_path, "w342")}
              alt={movie.title}
              className="w-64 rounded-lg shadow-2xl hidden md:block"
            />
            <div className="text-white flex-1">
              <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic mb-4">
                  {movie.tagline}
                </p>
              )}

              <div className="flex items-center gap-6 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-xl font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-300">
                    ({movie.vote_count} votes)
                  </span>
                </div>

                {movie.runtime > 0 && (
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <FaCalendar />
                  <span>
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleToggleFavorite}
                  disabled={favoritesLoading}
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  {isFavorite(movie.id) ? (
                    <>
                      <FaHeart /> Remove from Favorites
                    </>
                  ) : (
                    <>
                      <FaRegHeart /> Add to Favorites
                    </>
                  )}
                </button>

                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <FaPlay /> Watch Trailer
                  </a>
                )}

                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium flex items-center gap-2"
                  >
                    <FaExternalLinkAlt /> Official Site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === "overview"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("cast")}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === "cast"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Cast & Crew
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === "videos"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === "reviews"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Reviews
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
            </div>

            {director && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Director
                </h3>
                <p className="text-gray-700">{director.name}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Status
                </h3>
                <p className="text-gray-700">{movie.status}</p>
              </div>

              {movie.budget > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaDollarSign className="text-green-600" />
                    Budget
                  </h3>
                  <p className="text-gray-700">
                    {formatCurrency(movie.budget)}
                  </p>
                </div>
              )}

              {movie.revenue > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaDollarSign className="text-green-600" />
                    Revenue
                  </h3>
                  <p className="text-gray-700">
                    {formatCurrency(movie.revenue)}
                  </p>
                </div>
              )}

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Original Language
                </h3>
                <p className="text-gray-700 uppercase">
                  {movie.original_language}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            {movie.recommendations &&
              movie.recommendations.results.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Recommended Movies
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {movie.recommendations.results.slice(0, 6).map((rec) => (
                      <Link
                        key={rec.id}
                        to={`/movie/${rec.id}`}
                        className="group"
                      >
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                          <img
                            src={getImageUrl(rec.poster_path, "w342")}
                            alt={rec.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-2">
                            <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-purple-600">
                              {rec.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}

        {activeTab === "cast" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cast & Crew
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {topCast.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={getImageUrl(member.profile_path, "w185")}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1">
                      {member.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "videos" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Videos & Trailers
            </h2>
            {movie.videos && movie.videos.results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movie.videos.results.slice(0, 6).map((video) => (
                  <div
                    key={video.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="aspect-video bg-gray-200">
                      {video.site === "YouTube" && (
                        <iframe
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">
                        {video.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{video.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No videos available.</p>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              User Reviews
            </h2>
            {movie.reviews && movie.reviews.results.length > 0 ? (
              <div className="space-y-6">
                {movie.reviews.results.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                        {review.author[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {review.author}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {review.author_details.rating && (
                        <div className="ml-auto flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">
                            {review.author_details.rating}/10
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed line-clamp-6">
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
