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

interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

interface SignupResponse {
  id: string;
  username: string;
  email: string;
}

interface ErrorResponse {
  message: string;
}

interface UserState {
  token: string | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  authenticate: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; data?: AuthResponse; error?: string }>;
  signup: (signupData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<{
    success: boolean;
    data?: SignupResponse;
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
      isAuthenticated: false,
      isAuth: false,
      isLoading: false,
      error: null,

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      authenticate: async (credentials) => {
        const { email, password } = credentials;

        try {
          set({ isLoading: true, error: null });

          const response = await api.post("/auth/login", {
            email,
            password,
          });

          const { token, username, email: userEmail } = response.data;

          set({
            token,
            username,
            email: userEmail,
            isAuthenticated: true,
            isAuth: true,
            isLoading: false,
            error: null,
          });

          return { success: true, data: response.data };
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

          const response = await api.post("/auth/signup", {
            username,
            email,
            password,
          });

          const {
            token,
            username: newUsername,
            email: newEmail,
          } = response.data;

          // Auto-login after successful signup
          set({
            token,
            username: newUsername,
            email: newEmail,
            isAuthenticated: true,
            isAuth: true,
            isLoading: false,
            error: null,
          });

          return {
            success: true,
            data: response.data,
            message: "Account created successfully!",
          };
        } catch (err) {
          const error = err as AxiosError<ErrorResponse>;
          let errorMessage: string;

          if (
            error.response?.data?.message.includes("already exists") ||
            error.response?.data?.message.includes("already registered")
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
