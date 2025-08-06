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
import { useRouteStore } from "../stores/modules/route";
import { routes } from "vue-router/auto-routes";
import { $t } from "@/locales";
import { CONSTANT_ROUTES } from "./constantRouter/constantRouter.ts";
import { DOCUMENT_ROUTES } from "./constantRouter/documentRouter.ts";
import { BASE_ROUTER } from "./constantRouter/baseRouter.ts";
const {
  VITE_ROUTER_HISTORY_MODE = "history",
  VITE_BASE_URL,
  VITE_AUTH_ROUTE_MODE
} = import.meta.env;
interface RouteRecordRaw {
  path: string;
  name?: string;
  component?: string;
  meta?: {
    layout?: string;
    menuType?: "dir" | "page";
    title?: string;
    /**
     * 国际化键
     *
     */
    i18nKey?: string;
    isMenu?: boolean;
    /**
     * 菜单图标
     */
    icon?: string;
    /**
     * 排序
     */
    sort?: number;
    /**
     * 是否可见（1显示 0隐藏）
     */
    visible?: number;
    isLayout?: boolean;
    /**
     * 菜单类型（1:目录 2:菜单)
     */
    type?: string;
    [key: string]: any;
  };
  children?: RouteRecordRaw[];
}

interface MenuItem {
  id: number;
  parentId: number;
  name: string;
  icon?: string;
  path: string;
  component?: string;
  perms: null;
  type: 1 | 2; // 1: 目录, 2: 菜单
  sort: number;
  visible: 1 | 0;
  status: 1 | 0;
  createTime: string;
  updateTime: string;
  deleted: 0 | 1;
  i18nKey?: string;
  isFrame: 0 | 1;
  url: string | null;
  children: MenuItem[] | null;
}
/**
 * 将路由配置转换为菜单结构
 * 1. 自动生成ID和父子关系
 * 2. 处理空路径路由的meta继承
 * 3. 自动识别iframe页面并设置对应字段
 * 4. 自动设置目录/菜单类型和组件路径
 */
export const convertRoutesToMenus = (routes: RouteRecordRaw[], parentPath = ""): MenuItem[] => {
  const menus: MenuItem[] = [];

  for (const route of routes) {
    // 跳过空路径的路由项，但保留其meta给父级使用
    if (route.path === "") {
      continue;
    }
    if (route.path.startsWith("_") || route.path.startsWith("/_")) {
      continue;
    }
    // 修正路径拼接：
    // - 如果路径已经是绝对路径（以/开头），直接使用
    // - 否则拼接父路径（处理系统管理/菜单管理这类嵌套场景）
    const fullPath = route.path.startsWith("/")
      ? route.path
      : `${parentPath}/${route.path}`.replace(/\/+/g, "/"); // 避免多斜杠

    // 处理iframe页面特殊情况
    const isFramePage = fullPath.includes("/iframe-page");

    // 确定菜单类型（目录或菜单）
    const isDirectory =
      route.children &&
      route.children
        .filter(child => !(child.path.startsWith("_") || child.path.startsWith("/_")))
        .some(child => child.path !== "");
    const menuType: 1 | 2 = isDirectory ? 1 : 2;

    // 获取元数据（考虑空路径子路由的meta继承）
    const effectiveCom = getEffectiveCom(route);
    const effectiveMeta = effectiveCom.meta;
    // 跳过不显示在菜单中的路由
    if (effectiveMeta?.isMenu === false) {
      continue;
    }

    // 创建菜单项
    const menuItem: MenuItem = {
      name:
        effectiveCom?.name ||
        effectiveMeta?.name ||
        route.name?.toString() ||
        generateDefaultName(fullPath),
      icon: effectiveMeta?.icon || getDefaultIcon(menuType),
      path: fullPath,
      component: effectiveCom.component,
      perms: null,
      type: effectiveMeta?.type || menuType,
      sort: 0,
      visible: 1,
      status: 1,
      deleted: 0,
      i18nKey: effectiveMeta?.i18nKey,
      isFrame: isFramePage ? 1 : 0,
      url: isFramePage ? extractFrameUrl(fullPath) : null,
      children: null
    };

    // 递归处理子路由（传递当前fullPath作为父路径）
    if (route.children) {
      const childMenus = convertRoutesToMenus(
        route.children.filter(child => child.path !== ""),
        fullPath // 关键点：传递当前路径作为父路径
      );
      if (childMenus.length > 0) {
        menuItem.children = childMenus;
      }
    }
    if (!menuItem.path.startsWith("_") && !menuItem.path.startsWith("/_")) {
      menus.push(menuItem);
    }
  }

  return menus;
};
const historyCreatorMap: Record<Env.RouterHistoryMode, (base?: string) => RouterHistory> = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory
};
// 辅助函数：获取有效的meta数据（考虑空路径子路由的meta继承）
function getEffectiveCom(route: RouteRecordRaw): RouteRecordRaw {
  // 检查是否有空路径的子路由并提供meta
  if (route.children) {
    const emptyPathChild = route.children.find(child => child.path === "");
    if (emptyPathChild) {
      return { ...route, ...emptyPathChild };
    }
  }

  return route;
}

// 辅助函数：从iframe路径中提取URL
function extractFrameUrl(framePath: string): string {
  const match = framePath.match(/\/iframe-page\/(.+)/);
  return match ? match[1] : "";
}

// 辅助函数：生成默认名称
function generateDefaultName(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .map(segment => segment.replace(/^\w/, c => c.toUpperCase()))
    .join("_");
}

// 辅助函数：获取默认图标
function getDefaultIcon(menuType: 1 | 2): string {
  return menuType === 1 ? "folder" : "file";
}
// 基础路由表（同步）
const constantRoutes: RouteRecordRaw[] = [
  {
    name: "root",
    path: "/",
    redirect: "/home",
    meta: { hidden: false }
  },
  {
    name: "home",
    path: "/home",
    component: () => import("../views/common/home/index.vue")
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
  }
];
const autoRouterTransomMenuList = (routers: []) => {
  const menuList = routers.filter(e => e.path != "/" && e.path != "/common" && e.path != "/home");
  return convertRoutesToMenus(menuList);
};
// 动态路由加载器
const loadDynamicRoutes = async (): Promise<RouteRecordRaw[]> => {
  const routerStore = useRouteStore();
  if (VITE_AUTH_ROUTE_MODE == "static") {
    const { data } = await getMenuList();
    const staticMenu = autoRouterTransomMenuList(routes);
    DOCUMENT_ROUTES.forEach(it => staticMenu.push(it));
    routerStore.setMenuList(staticMenu);
    CONSTANT_ROUTES.forEach(it => staticMenu.push(it));
    return BASE_ROUTER; // 静态模式直接返回空（或你的静态路由）
  }
  try {
    const { data } = await getMenuList();
    routerStore.setMenuList(data);
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
      name: node.name,
      path: node.path,
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
    if (node.component !== "Layout") {
      route.component = () => import(resolveComponent(node.component));
    } else {
      route.meta.layout = "base";
    }
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
/**
 * 规范化路由配置
 * 1. 移除空路径("")的子路由，将其meta提升到父级
 * 2. 过滤掉路径以_开头的路由
 * 3. 保留完整的树形结构处理
 */
function normalizeRoutes(routes: RouteRecordRaw[], parentPath = ""): RouteRecordRaw[] {
  return routes
    .map(route => {
      // 直接过滤掉_开头的路由（不参与后续处理）
      if (route.path.startsWith("_")) {
        return null;
      }
      // 2. 构建完整路径
      const fullPath = [parentPath, route.path]
        .filter(p => p !== "") // 避免双斜杠
        .join("/")
        .replace(/\/+/g, "/"); // 归一化路径
      let infoChild: RouteRecordRaw = null;
      // 处理带children的路由
      if (route.children) {
        // 深拷贝避免修改原对象
        const newRoute = { ...route };
        newRoute.children = [];

        for (const child of route.children) {
          // 跳过_开头的路径
          if (child.path.startsWith("_")) continue;

          if (child.path === "") {
            infoChild = child;
            // 空路径子路由 -> 元数据提升
            newRoute.meta = {
              ...(newRoute.meta || {}),
              ...(child.meta || {})
            };
          } else {
            // 普通子路由 -> 递归处理
            const processedChild = normalizeRoutes([child])[0];
            if (processedChild) {
              newRoute.children.push(processedChild);
            }
          }
        }

        // 清理空children
        if (newRoute.children.length === 0) {
          delete newRoute.children;
          if (!newRoute.component && infoChild) {
            newRoute.component = infoChild.component;
          }
        }
        if (!newRoute.name) {
          newRoute.name = newRoute?.meta?.name
            ? newRoute.meta.name
            : generateAutoRouteName(route, infoChild, fullPath);
        }
        return newRoute;
      }

      return route;
    })
    .filter((route): route is RouteRecordRaw => route !== null); // 类型守卫过滤null
}

// 智能路由名生成器
function generateAutoRouteName(
  route: RouteRecordRaw,
  child: ProcessedRoute | undefined,
  fullPath: string
): string {
  // 优先级：现有名称 > 子路由名称 > 自动生成名称
  return route.name?.toString() || child?.name?.toString() || generateDefaultName(fullPath);
}

// 初始化路由实例
const initRouter = () => {
  // 处理静态路由的meta布局设置
  const processedRoutes: RouteRecordRaw[] =
    VITE_AUTH_ROUTE_MODE === "static" ? normalizeRoutes(routes) : constantRoutes;
  return createRouter({
    history: historyCreatorMap[VITE_ROUTER_HISTORY_MODE](VITE_BASE_URL),
    routes: setupLayouts(processedRoutes)
  });
};
function transformToMenu(routes, basePath) {
  return routes
    .filter(route => {
      // 1. 过滤掉不需要的路径（如 `/common` 下的非菜单项）
      const isCommonRoute = route.path.startsWith("/common");
      const isMenu = route.meta?.isMenu !== false;
      return !isCommonRoute || isMenu;
    })
    .map(route => {
      const fullPath = `${basePath}/${route.path}`.replace(/\/+/g, "/");
      const menuItem = {
        path: route.path,
        name: route.name
      };

      // 2. 保留 meta 信息（如果有）
      if (route.meta) {
        menuItem.meta = { ...route.meta };
      }

      // 3. 递归处理子路由
      if (route.children) {
        menuItem.children = transformToMenu(route.children, fullPath);
      }

      return menuItem;
    });
}

export const router = initRouter();
// 初始化动态路由
export async function setupRouter(app: App) {
  // 动态添加路由
  const dynamicRoutes = await loadDynamicRoutes();
  console.error("dynamicRoutes", dynamicRoutes);
  setupLayouts(dynamicRoutes).forEach(route => {
    router.addRoute(route);
  });
  router.addRoute({
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/common/404/index.vue")
  });

  app.use(router);
  //确保404路由最后添加;

  await router.isReady();
}
