import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173, // 端口号
    host: "localhost",
    // 本地跨域代理. 目前注释的原因：暂时没有用途，server 端已经支持跨域
    proxy: {
      ["/api"]: {
        target: "http://localhost:8080",
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^/api`), ""),
      },
    },
  },
});
