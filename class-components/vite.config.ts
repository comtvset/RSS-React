import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
});

// export default defineConfig({
//   base: './',
//   plugins: [tsconfigPaths(), react()],
//   css: {
//     modules: {
//       localsConvention: 'camelCase',
//     },
//   },
//   resolve: {
//     alias: {
//       'node-fetch': 'isomorphic-fetch',
//     },
//   },
// });
