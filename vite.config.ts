import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    { enforce: "pre", ...mdx({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] }) },
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
