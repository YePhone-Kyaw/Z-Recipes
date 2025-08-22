import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./route/index.tsx"
import { AuthContextProvider } from "./contexts/AuthContext";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  </StrictMode>
);
