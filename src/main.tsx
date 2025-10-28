import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";
import App from "./App.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
