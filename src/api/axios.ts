import axios from "axios";

// The backend origin is resolved at RUNTIME, from whatever domain the
// browser is actually on (window.location.hostname) - not baked in at
// build time via VITE_API_URL. That distinction matters: Vite always
// applies client/.env.production (never .env) to `vite build`, with no
// way to opt out short of renaming files around each build - so a build
// made to test locally silently shipped the real staging backend's
// absolute URL anyway, and "Start Building" tried to reach
// aiwebsitebuilderserver.vestaging.in from a machine that was never
// pointed at it. One build now behaves correctly wherever it's actually
// opened, with nothing to swap before building for a different target:
//   - The known production frontend host maps to its known backend host
//     (the real split-domain Plesk deployment).
//   - Every other host (localhost during local dev/preview, a same-origin
//     Plesk setup, a future staging domain reusing this same build) falls
//     back to a bare relative "/api" - which resolves correctly whenever
//     frontend and backend share an origin (Vite's dev proxy locally, or
//     this server's own NODE_ENV=production static-serving in index.ts).
// KNOWN_BACKEND_HOSTS stays the single place to extend this if another
// frontend domain is ever added (a second environment, a custom domain).
const KNOWN_BACKEND_HOSTS: Record<string, string> = {
  "aiwebsitebuilder.vestaging.in": "https://aiwebsitebuilderserver.vestaging.in",
};

// Exported (not just used internally below) so plain, non-axios <a href>
// links - a file download triggered by navigation, not a fetch/XHR call,
// like PublishPage's "Download Website Code"/"Download Prototype" buttons -
// can point at the real API origin too, instead of each such link
// reimplementing this same resolution logic (or worse, assuming
// same-origin and silently 404ing on a split frontend/backend deployment).
export const API_BASE_URL = (() => {
  const backendOrigin =
    typeof window !== "undefined" ? KNOWN_BACKEND_HOSTS[window.location.hostname] : undefined;
  return backendOrigin ? `${backendOrigin}/api` : "/api";
})();
const baseURL = API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default api;
