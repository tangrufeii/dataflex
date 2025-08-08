import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import progress from "vite-plugin-progress";
import { setupHtmlPlugin } from "./html";
import { setupDevtoolsPlugin } from "./devtools";
import { setupUnplugin } from "./unplugin";
import vueJsx from "@vitejs/plugin-vue-jsx";
import LayoutManager from "vite-plugin-vue-layouts";
import { setupUnocss } from "./unocss";
import { setupAutoRouter } from "./autoRouter";
export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  const plugins: PluginOption = [
    // 必须放在 Vue 插件之前
    setupAutoRouter(viteEnv),
    LayoutManager({
      layoutsDirs: "src/layouts", // 布局组件目录
      defaultLayout: "base" // 默认布局名（对应 layouts/default.vue）
    }),
    vue(),
    vueJsx(),
    setupDevtoolsPlugin(viteEnv),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    progress(),
    setupHtmlPlugin(buildTime)
  ];

  return plugins;
}
