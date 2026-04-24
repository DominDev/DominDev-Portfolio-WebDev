/**
 * main.jsx
 * Inicjalizacja aplikacji React.
 * Łączy główny komponent App z elementem #root w HTML.
 */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
