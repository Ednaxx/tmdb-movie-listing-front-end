import useAppStore from "../store/app";
import {
  SearchMoviesResponse,
  MovieDetails,
  FavoriteMovie,
  FavoriteMovieCreate,
  ShareTokenResponse,
} from "../types/tmdb";

const api = useAppStore.getState().httpClient;

export const tmdbService = {
  searchMovies: async (query: string, page: number = 1) => {
    const response = await api.get<SearchMoviesResponse>("/tmdb/search", {
      params: { query, page },
    });
    return response.data;
  },

  getMovieDetails: async (movieId: number) => {
    const response = await api.get<MovieDetails>(`/tmdb/movie/${movieId}`);
    return response.data;
  },

  getFavorites: async () => {
    const response = await api.get<FavoriteMovie[]>("/favorites/");
    return response.data;
  },

  addFavorite: async (favorite: FavoriteMovieCreate) => {
    const response = await api.post<FavoriteMovie>("/favorites/", favorite);
    return response.data;
  },

  removeFavorite: async (tmdbMovieId: number) => {
    await api.delete(`/favorites/${tmdbMovieId}`);
  },

  generateShareToken: async () => {
    const response = await api.post<ShareTokenResponse>("/users/share-token");
    return response.data;
  },

  revokeShareToken: async () => {
    await api.delete("/users/share-token");
  },

  getSharedFavorites: async (shareToken: string) => {
    const response = await api.get<FavoriteMovie[]>(
      `/favorites/shared/${shareToken}`,
    );
    return response.data;
  },
};
