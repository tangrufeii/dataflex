import type { Router } from "vue-router";
import { useTitle } from "@vueuse/core";
import { $t } from "@/locales";

/**
 * 创建路由文档表体守卫
 * @param router 路由实例对象
 */
export function createDocumentTitleGuard(router: Router) {
  router.afterEach(to => {
    const { i18nKey, title } = to.meta;

    const documentTitle = i18nKey ? $t(i18nKey) : title;

    useTitle(documentTitle);
  });
}
