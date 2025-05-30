import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";
import { setupVitePlugins } from "./build/plugins";
import { getBuildTime } from "./build/config";
import process from "node:process";

export default defineConfig(configEnv => {
  /** 环境变量 **/
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta;
  /** 记录打包时间 **/
  const buildTime = getBuildTime();

  const enableProxy = configEnv.command === "serve" && !configEnv.isPreview;
  return {
    plugins: setupVitePlugins(viteEnv, buildTime),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~": fileURLToPath(new URL("./", import.meta.url))
      }
    },
    server: {
      host: "0.0.0.0",
      port: 9527,
      open: true
    }
  };
});
