import axios, { AxiosInstance } from "axios";
import { createStore } from "./util";

interface AppState {
  isLoading: boolean;
  error: string | null;
  httpClient: AxiosInstance;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const useAppStore = createStore<AppState>("app", (set) => {
  const baseApiUrl =
    import.meta.env.VITE_BASE_API_URL || "http://localhost:3000/api";
  const httpClient = axios.create({
    baseURL: baseApiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    isLoading: false,
    error: null,
    httpClient,
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    setError: (error: string | null) => set({ error }),
    clearError: () => set({ error: null }),
  };
});

export default useAppStore;
