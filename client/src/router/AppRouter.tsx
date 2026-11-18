import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../globals/constants";
import HomePage from "../pages/home/HomePage";
import FoundationPage from "../pages/dev/FoundationPage";
import ComponentsPage from "../pages/dev/ComponentsPage";
import NotFound from "../components/NotFound";
import ToastViewport from "../components/ToastViewport";

// ─── Routing ──────────────────────────────────────────────────────────────────
// A static site: every route renders in the browser, and the host rewrites
// every path to index.html (see render.yaml).
// Add a page: create it in src/pages/<area>/, add its path to ROUTES in
// globals/constants.ts, register it here.

export function AppRouter() {
  return (
    // BASE_URL follows Vite's `base`, so routes work under a sub-path too.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />

        {import.meta.env.DEV && (
          <>
            <Route path={ROUTES.DEV_FOUNDATION} element={<FoundationPage />} />
            <Route path={ROUTES.DEV_COMPONENTS} element={<ComponentsPage />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastViewport />
    </BrowserRouter>
  );
}
