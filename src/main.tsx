import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";
import router from "./router";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
