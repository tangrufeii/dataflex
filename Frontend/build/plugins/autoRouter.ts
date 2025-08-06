import VueRouter from "unplugin-vue-router/vite";

export function setupAutoRouter(viteEnv: Env.ImportMeta) {
  const { VITE_AUTH_ROUTE_MODE } = viteEnv;
  if (VITE_AUTH_ROUTE_MODE == "static") {
    return VueRouter({
      routesFolder: "src/views", // 路由组件目录
      dts: "types/typed-router.d.ts", // 类型声明文件
      routeBlockLang: "json" // 也支持 yaml
    });
  } else {
    return VueRouter({
      routesFolder: "src/views", // 路由组件目录
      dts: "types/typed-router.d.ts", // 类型声明文件
      routeBlockLang: "json" // 也支持 yaml
    });
  }
}
