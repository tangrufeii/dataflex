import type { Router } from "vue-router";
import { createRouteGuard } from "./route";
import { createProgressGuard } from "./progress";
import { createDocumentTitleGuard } from "./title";

/**
 * 路由守卫
 *
 * @param router - 路由实例对象
 */
export function createRouterGuard(router: Router) {
  /** 进度条守卫 **/
  createProgressGuard(router);
  /**  路由守卫 **/
  createRouteGuard(router);
  /**  文档标题守卫 **/
  createDocumentTitleGuard(router);
}
