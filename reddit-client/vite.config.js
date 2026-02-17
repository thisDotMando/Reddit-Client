import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "https://www.reddit.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  test: {
    environment: "jsdom",
    globals: true,

    // 🔥 NUR deine Tests!
    include: ["src/**/*.{test,spec}.{js,jsx}"],

    // 🔥 WICHTIG!
    exclude: ["node_modules", "e2e"],

    setupFiles: "./src/setupTests.js",
  },
});
