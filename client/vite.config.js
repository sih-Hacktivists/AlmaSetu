import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/": "https://almasetu-ye1z.onrender.com",
    },
  },
  plugins: [react()],
});
