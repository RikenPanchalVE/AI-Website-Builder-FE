import axios from "axios";

// A bare relative "/api" only resolves correctly when the browser is on the
// same origin as the API (single-server deployment, or local dev via Vite's
// own proxy - see vite.config.ts). Deployed with the frontend and backend
// on separate domains, VITE_API_URL supplies the backend's real origin -
// baked in at build time, so it must be set wherever the client is BUILT,
// not just present in this repo's .env. Falls back to the relative path
// when unset, so same-origin/dev setups need no configuration at all.
// Exported (not just used internally below) so plain, non-axios <a href>
// links - a file download triggered by navigation, not a fetch/XHR call,
// like PublishPage's "Download Website Code"/"Download Prototype" buttons -
// can point at the real API origin too, instead of each such link
// reimplementing this same VITE_API_URL fallback logic (or worse, assuming
// same-origin and silently 404ing on a split frontend/backend deployment).
export const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api`
  : "/api";
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
