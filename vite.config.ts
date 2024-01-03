import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["lib"],
    }),
  ],
  build: {
    lib: {
      entry: "lib/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-admin",
        "@mui/material",
        "@mui/icons-material",
        "@emotion/styled",
        "@emotion/react",
        "react-router-dom"
      ],
    },
  },
});
