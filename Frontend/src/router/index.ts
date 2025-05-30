import type { App } from "vue";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw,
  type RouterHistory
} from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import { getMenuList } from "../api/methods/router.ts";

const {
  VITE_ROUTER_HISTORY_MODE = "history",
  VITE_BASE_URL,
  VITE_AUTH_ROUTE_MODE
} = import.meta.env;

const historyCreatorMap: Record<Env.RouterHistoryMode, (base?: string) => RouterHistory> = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory
};

// 基础路由表（同步）
const constantRoutes: RouteRecordRaw[] = [
  {
    name: "root",
    path: "/",
    redirect: "/home",
    meta: { hidden: true }
  },
  {
    name: "home",
    path: "/home",
    component: () => import("../views/home/index.vue")
  },
  {
    name: "login",
    path: "/login",
    component: () => import("../views/common/login/index.vue"),
    meta: { layout: "blank" }
  },
  {
    name: "403",
    path: "/403",
    component: () => import("../views/common/403/index.vue"),
    meta: { layout: "blank" }
  },
  {
    name: "500",
    path: "/500",
    component: () => import("../views/common/500/index.vue"),
    meta: { layout: "blank" }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/common/404/index.vue")
  }
];

// 动态路由加载器
const loadDynamicRoutes = async (): Promise<RouteRecordRaw[]> => {
  if (VITE_AUTH_ROUTE_MODE === "static") {
    return []; // 静态模式直接返回空（或你的静态路由）
  }

  try {
    const { data } = await getMenuList();
    return transformRouteNodes(data);
  } catch (error) {
    console.error("动态路由加载失败:", error);
    return [];
  }
};

// 后端数据结构转换
const transformRouteNodes = (nodes: any[]): RouteRecordRaw[] => {
  return nodes.map(node => {
    const route: RouteRecordRaw = {
      path: node.path,
      name: node.name,
      component: () => import(resolveComponent(node.component)),
      meta: {
        title: node.name,
        icon: node.icon,
        isFrame: node.isFrame == 1,
        url: node.url || "",
        hidden: node.visible === 0
      },
      props: {
        url: node.url || ""
      }
    };

    if (node.children?.length) {
      route.children = transformRouteNodes(node.children);
    }

    return route;
  });
};

// 动态解析组件（关键！）
const resolveComponent = (componentPath: string | null) => {
  if (!componentPath) return undefined;

  // 处理Layout组件
  if (componentPath === "Layout") {
    return "../layouts/base.vue";
  }
  if (componentPath === "frame-page") {
    return "../views/common/iframe-page/[url].vue";
  }
  // 动态加载业务组件（需匹配你的项目结构）
  const normalizedPath = componentPath.startsWith("/") ? componentPath.slice(1) : componentPath;

  return `../views/${normalizedPath}.vue`;
};

// 创建路由实例（同步基础路由）
export const router = createRouter({
  history: historyCreatorMap[VITE_ROUTER_HISTORY_MODE](VITE_BASE_URL),
  routes: setupLayouts(constantRoutes)
});

// 初始化动态路由
export async function setupRouter(app: App) {
  app.use(router);

  // 动态添加路由
  const dynamicRoutes = await loadDynamicRoutes();
  dynamicRoutes.forEach(route => {
    router.addRoute(route);
  });

  // 确保404路由最后添加
  router.addRoute({
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/common/404/index.vue")
  });

  await router.isReady();
}
