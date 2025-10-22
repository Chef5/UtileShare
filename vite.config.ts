import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import viteSeoPlugin from "./scripts/vite-plugin-seo.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSeoPlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router", "pinia"],
          utils: ["axios", "@vueuse/core"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "pinia", "axios", "@vueuse/core"],
  },
});
