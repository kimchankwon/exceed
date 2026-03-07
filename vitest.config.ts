/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".cache", "public"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/test/**", "src/pages/**", "src/gatsby-types.d.ts"],
    },
  },
  define: {
    "process.env.FIBERY_WORKSPACE": JSON.stringify("test-workspace"),
    "process.env.FIBERY_TOKEN": JSON.stringify("test-token"),
  },
});
