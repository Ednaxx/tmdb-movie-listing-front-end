import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { useUserStore } from "./store/user";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";
import Favorites from "./pages/Favorites";
import SharedFavorites from "./pages/SharedFavorites";
import MovieDetails from "./pages/MovieDetails";

// Guard to protect routes that require authentication
const RouterGuard = ({ children }: { children: React.ReactNode }) => {
  const token = useUserStore((state) => state.token);
  return token ? <>{children}</> : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/movies",
    element: (
      <RouterGuard>
        <Movies />
      </RouterGuard>
    ),
  },
  {
    path: "/favorites",
    element: (
      <RouterGuard>
        <Favorites />
      </RouterGuard>
    ),
  },
  {
    path: "/movie/:movieId",
    element: (
      <RouterGuard>
        <MovieDetails />
      </RouterGuard>
    ),
  },
  {
    path: "/shared/:shareToken",
    element: <SharedFavorites />,
  },
]);

export default router;
