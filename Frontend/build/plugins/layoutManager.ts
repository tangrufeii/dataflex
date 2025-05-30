import { Router } from "vue-router";
import LayoutManager from "vite-plugin-vue-layouts";
/**
 * 配置全局布局管理器
 */
export function setupLayoutManager() {
  return LayoutManager({
    layoutsDirs: "src/layouts", //指定布局文件目录路径
    pagesDirs: "src/views"
  });
}
