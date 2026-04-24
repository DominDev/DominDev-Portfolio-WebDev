import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

const shouldAnalyzeBundle = process.env.BUNDLE_ANALYZE === "true";

export default defineConfig({
  base: "/DominDev-DominDynamics/",
  plugins: [
    react(),
    shouldAnalyzeBundle &&
      visualizer({
        filename: "_docs/bundle-analysis-report.html",
        template: "treemap",
        gzipSize: true,
        brotliSize: true,
        open: false,
      }),
  ].filter(Boolean),
});
