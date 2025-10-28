import { createStore } from "./util";
import useAppStore from "./app";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = useAppStore.getState().httpClient;

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.state?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface ErrorResponse {
  detail: string;
}

interface UserState {
  token: string | null;
  username: string | null;
  email: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  authenticate: (credentials: {
    username: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  signup: (signupData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<{
    success: boolean;
    message?: string;
    error?: string;
  }>;
  logout: () => void;
}

const useUserStore = createStore<UserState>(
  "user",
  (set) => {
    return {
      token: null,
      username: null,
      email: null,
      userId: null,
      isAuthenticated: false,
      isAuth: false,
      isLoading: false,
      error: null,

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      authenticate: async (credentials) => {
        const { username, password } = credentials;

        try {
          set({ isLoading: true, error: null });

          const formData = new URLSearchParams();
          formData.append("username", username);
          formData.append("password", password);

          const response = await api.post("/users/token", formData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          const { access_token } = response.data;

          set({
            token: access_token,
            username,
            isAuthenticated: true,
            isAuth: true,
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (err) {
          const error = err as AxiosError<ErrorResponse>;
          const errorMessage =
            error.response?.status === 401
              ? "Invalid credentials"
              : "Authentication failed";
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
            isAuth: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      signup: async (signupData) => {
        const { username, email, password } = signupData;

        try {
          set({ isLoading: true, error: null });

          const response = await api.post("/users/register", {
            username,
            email,
            password,
          });

          const userData = response.data;

          const formData = new URLSearchParams();
          formData.append("username", username);
          formData.append("password", password);

          const loginResponse = await api.post("/users/token", formData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          const { access_token } = loginResponse.data;

          set({
            token: access_token,
            username: userData.username,
            email: userData.email,
            userId: userData.id,
            isAuthenticated: true,
            isAuth: true,
            isLoading: false,
            error: null,
          });

          return {
            success: true,
            message: "Account created successfully!",
          };
        } catch (err) {
          const error = err as AxiosError<ErrorResponse>;
          let errorMessage: string;

          const detail = error.response?.data?.detail || "";
          if (
            detail.includes("already exists") ||
            detail.includes("already registered")
          ) {
            errorMessage = "Email or username already exists";
          } else {
            errorMessage = "Signup failed";
          }

          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
            isAuth: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        set({
          token: null,
          username: null,
          email: null,
          userId: null,
          isAuthenticated: false,
          isAuth: false,
          isLoading: false,
          error: null,
        });
      },
    };
  },
  true,
);

export { useUserStore };
