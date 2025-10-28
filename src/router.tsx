import { Routes, Route, Navigate } from "react-router";
import { useUserStore } from "./store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";

interface RouterGuardProps {
  children: React.ReactNode;
}

const RouterGuard = ({ children }: RouterGuardProps) => {
  const isAuth = useUserStore((state) => state.isAuth);

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/movies"
        element={
          <RouterGuard>
            <Movies />
          </RouterGuard>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppRouter, RouterGuard };
