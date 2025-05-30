import BaseLayout from "./base.vue";
import BlankLayout from "./blank.vue";
import type { RouteComponent } from "vue-router";

/**
 * 导出布局路由常量
 */
export const layouts: Record<RouteLayout, RouteComponent | (() => Promise<RouteComponent>)> = {
  base: BaseLayout,
  blank: BlankLayout
};
