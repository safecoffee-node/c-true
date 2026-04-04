import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./layout.tsx";
import { QuotesPage } from "./pages/quotes.tsx";
import { Page } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Page />} />
          <Route path="/quotes" element={<QuotesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
