import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    host: true,
    port: 80,
    historyApiFallback: true, // Helps with SPA routing
    allowedHosts: [
      "meridian-hosts.com", // Add your specific allowed host
      // 'example.com',    // Add other domains as needed
      // 'all'            // (Not recommended) Allow all hosts - security risk
    ],
  },
});
