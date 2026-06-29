import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// NOTE: Do NOT add TanStackRouterVite here — tanstackStart already includes
// the router generator and code-splitter plugins internally. Adding it again
// causes a double-transform that breaks SSR with "TSRSplitComponent is not defined".

export default defineConfig({
  plugins: [
    // tanstackStart must come first so it can set up the Vite environments
    // before React and Tailwind run their transforms.
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
