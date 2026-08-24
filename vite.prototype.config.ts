import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Separate build, run alongside the main `vite build` (see package.json's
// "build" script) - produces ONE self-contained, non-module JS file (plus
// its CSS) for the "Download Prototype HTML" feature. The main build's
// generated-site.tsx bundle is emitted as an ES module with lazy-loaded,
// code-split component chunks (fine for /generated-sites/, served over a
// real http(s) origin) - a browser refuses to run `<script type="module">`
// loaded from a file:// URL at all, which is exactly how a downloaded
// prototype gets opened. `format: "iife"` avoids ES module syntax
// entirely, and `inlineDynamicImports: true` folds every lazy-loaded
// component chunk into that same single file (Rollup requires this pairing
// for iife/umd output whenever dynamic import() is reachable, which
// ComponentRegistry.ts's React.lazy() calls do) - so the whole component
// library ships in one plain <script>, with zero runtime module loading.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-prototype",
    // One CSS file instead of Vite's default per-chunk splitting - there's
    // only one JS chunk here anyway (inlineDynamicImports below), but this
    // also guarantees a single, predictable output filename to read back
    // in downloadService.ts rather than a content-hashed one.
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(__dirname, "src/prototype-entry.tsx"),
      output: {
        format: "iife",
        inlineDynamicImports: true,
        entryFileNames: "prototype-bundle.js",
        assetFileNames: "prototype-bundle[extname]",
      },
    },
  },
})
