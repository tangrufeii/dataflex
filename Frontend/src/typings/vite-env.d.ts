/**

 Env 命名空间
 用于声明 import.meta 对象的类型
 **/
declare namespace Env {
  /* 路由历史模式类型 */
  type RouterHistoryMode = "hash" | "history" | "memory";

  /** import.meta 接口扩展 **/

  interface ImportMeta extends ImportMetaEnv {
    /* 应用基础路径 */
    readonly VITE_BASE_URL: string;
    /* 应用标题 */
    readonly VITE_APP_TITLE: string;
    /* 应用描述 */
    readonly VITE_APP_DESC: string;
    /* 路由历史模式配置 */
    readonly VITE_ROUTER_HISTORY_MODE?: RouterHistoryMode;
    /* Iconify 图标前缀 */
    readonly VITE_ICON_PREFIX: "icon";
    /*
     * 本地图标前缀
     *
     * 该前缀必须以图标前缀开头
     */
    readonly VITE_ICON_LOCAL_PREFIX: "local-icon";
    /* 后端服务基础地址 */
    readonly VITE_SERVICE_BASE_URL: string;
    /*
     * 后端服务成功状态码
     *
     * 当收到该码时表示请求成功
     */
    readonly VITE_SERVICE_SUCCESS_CODE: string;
    /*
     * 后端服务登出状态码
     *
     * 当收到该码时会强制用户退出登录并重定向到登录页
     *
     * 多个状态码用英文逗号分隔
     */
    readonly VITE_SERVICE_LOGOUT_CODES: string;
    /*
     * 后端服务模态框登出码
     *
     * 当收到该码时会通过弹窗方式提示用户重新登录
     *
     * 多个状态码用英文逗号分隔
     */
    readonly VITE_SERVICE_MODAL_LOGOUT_CODES: string;
    /*
     * 后端服务Token过期码
     *
     * 当收到该码时会自动刷新Token并重发请求
     *
     * 多个状态码用英文逗号分隔
     */
    readonly VITE_SERVICE_EXPIRED_TOKEN_CODES: string;
    /* 静态路由模式下预定义的超管角色 */
    readonly VITE_STATIC_SUPER_ROLE: string;
    /*
     * 其他后端服务地址
     *
     * 值为JSON格式字符串
     */
    readonly VITE_OTHER_SERVICE_BASE_URL: string;
    /*
     * 是否开启HTTP代理
     *
     * 仅在开发环境生效
     */
    readonly VITE_HTTP_PROXY?: CommonType.YesOrNo;
    /*
     * 权限路由模式
     *
     * - Static: 前端生成路由
     * - Dynamic: 后端生成路由
     */
    readonly VITE_AUTH_ROUTE_MODE: "static" | "dynamic";
    /*
     * 首页路由键名
     *
     * 仅静态路由模式生效，动态路由模式下由后端定义
     */
    readonly VITE_ROUTE_HOME: "/";
    /*
     * 菜单默认图标（当菜单未设置图标时使用）
     *
     * Iconify 图标名称
     */
    readonly VITE_MENU_ICON: string;
    /* 是否生成sourcemap文件 */
    readonly VITE_SOURCE_MAP?: CommonType.YesOrNo;

    /* 应用打包后是否自动检测更新 */
    readonly VITE_AUTOMATICALLY_DETECT_UPDATE?: CommonType.YesOrNo;
    /* 在终端显示代理URL日志 */
    readonly VITE_PROXY_LOG?: CommonType.YesOrNo;
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}
