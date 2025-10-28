import { createStore } from "./util";
import { tmdbService } from "../services/tmdb";
import { FavoriteMovie, FavoriteMovieCreate } from "../types/tmdb";
import { AxiosError } from "axios";

interface FavoritesState {
  favorites: FavoriteMovie[];
  isLoading: boolean;
  error: string | null;
  shareToken: string | null;
  shareUrl: string | null;
  fetchFavorites: () => Promise<void>;
  addFavorite: (favorite: FavoriteMovieCreate) => Promise<boolean>;
  removeFavorite: (tmdbMovieId: number) => Promise<boolean>;
  isFavorite: (tmdbMovieId: number) => boolean;
  generateShareLink: () => Promise<void>;
  revokeShareLink: () => Promise<void>;
  clearError: () => void;
}

const useFavoritesStore = createStore<FavoritesState>(
  "favorites",
  (set, get) => ({
    favorites: [],
    isLoading: false,
    error: null,
    shareToken: null,
    shareUrl: null,

    fetchFavorites: async () => {
      set({ isLoading: true, error: null });
      try {
        const favorites = await tmdbService.getFavorites();
        set({ favorites, isLoading: false });
      } catch (err) {
        const error = err as AxiosError;
        set({
          error: error.response?.statusText || "Failed to fetch favorites",
          isLoading: false,
        });
      }
    },

    addFavorite: async (favorite: FavoriteMovieCreate) => {
      set({ isLoading: true, error: null });
      try {
        const newFavorite = await tmdbService.addFavorite(favorite);
        set((state) => ({
          favorites: [...state.favorites, newFavorite],
          isLoading: false,
        }));
        return true;
      } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        const message =
          error.response?.data?.detail || "Failed to add to favorites";
        set({ error: message, isLoading: false });
        return false;
      }
    },

    removeFavorite: async (tmdbMovieId: number) => {
      set({ isLoading: true, error: null });
      try {
        await tmdbService.removeFavorite(tmdbMovieId);
        set((state) => ({
          favorites: state.favorites.filter(
            (f) => f.tmdb_movie_id !== tmdbMovieId,
          ),
          isLoading: false,
        }));
        return true;
      } catch (err) {
        const error = err as AxiosError;
        set({
          error:
            error.response?.statusText || "Failed to remove from favorites",
          isLoading: false,
        });
        return false;
      }
    },

    isFavorite: (tmdbMovieId: number) => {
      return get().favorites.some((f) => f.tmdb_movie_id === tmdbMovieId);
    },

    generateShareLink: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await tmdbService.generateShareToken();
        const shareUrl = `${window.location.origin}/shared/${data.share_token}`;
        set({
          shareToken: data.share_token,
          shareUrl,
          isLoading: false,
        });
      } catch (error) {
        set({
          error: "Failed to generate share link",
          isLoading: false,
        });
        throw error;
      }
    },

    revokeShareLink: async () => {
      set({ isLoading: true, error: null });
      try {
        await tmdbService.revokeShareToken();
        set({ shareToken: null, shareUrl: null, isLoading: false });
      } catch (err) {
        const error = err as AxiosError;
        set({
          error: error.response?.statusText || "Failed to revoke share link",
          isLoading: false,
        });
      }
    },

    clearError: () => set({ error: null }),
  }),
  true,
);

export { useFavoritesStore };
