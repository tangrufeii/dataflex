import NProgress from "nprogress";

/**
 * 初始化naive-ui进度条插件并全局挂在于window上
 */
export function setupNProgress() {
  NProgress.configure({ easing: "ease", speed: 500 });
  // mount on window
  window.NProgress = NProgress;
}
