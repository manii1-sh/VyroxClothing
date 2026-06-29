import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
  ],
  build: {
    // Raise the chunk warning limit — our images are large but hashed
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split vendor libs into a separate chunk so they can be cached independently
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const normalizedId = id.replace(/\\/g, "/");
            if (
              normalizedId.includes("node_modules/react/") ||
              normalizedId.includes("node_modules/react-dom/")
            ) {
              return "react-vendor";
            }
            if (
              normalizedId.includes("node_modules/@tanstack/react-router/") ||
              normalizedId.includes("node_modules/@tanstack/react-query/")
            ) {
              return "router-vendor";
            }
            if (
              normalizedId.includes("node_modules/lucide-react/") ||
              normalizedId.includes("node_modules/sonner/")
            ) {
              return "ui-vendor";
            }
          }
        },
      },
    },
  },
});
