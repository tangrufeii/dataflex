/** 联合键 */
declare namespace UnionKey {
  /**
   *   登陆模块
   *
   * - pwd-login: 账号密码登陆
   * - code-login: 验证码登陆
   * - register:   注册
   * - reset-pwd: 忘记密码
   * - bind-wechat: 绑定微信
   */
  type LoginModule = "pwd-login" | "code-login" | "register" | "reset-pwd" | "bind-wechat";

  /** 主题方案
   *
   *  light:明亮
   *  dark: 黑暗
   *  auto: 跟随系统
   */
  type ThemeScheme = "light" | "dark" | "auto";

  /**
   *  重置缓存策略
   *
   * - close: 关闭页面时重新缓存
   * - refresh: 刷新页面时重新缓存
   */
  type ResetCacheStrategy = "close" | "refresh";

  /**
   *    布局模式
   *
   * - vertical: 左侧菜单模式
   * - horizontal: 顶部菜单模式
   * - vertical-mix: 左侧菜单混合模式
   * - horizontal-mix: 顶部菜单混合模式
   */
  type ThemeLayoutMode = "vertical" | "horizontal" | "vertical-mix" | "horizontal-mix";

  /** 页面跳转动画模式
   *
   *
   *
   *
   *
   *
   */
  type ThemePageAnimateMode =
    | "fade"
    | "fade-slide"
    | "fade-bottom"
    | "fade-scale"
    | "zoom-fade"
    | "zoom-out"
    | "none";

  /**
   * Tab mode
   *
   * - chrome: chrome style
   * - button: button style
   */
  type ThemeTabMode = import("@sa/materials").PageTabMode;

  /** Unocss animate key */
  type UnoCssAnimateKey =
    | "pulse"
    | "bounce"
    | "spin"
    | "ping"
    | "bounce-alt"
    | "flash"
    | "pulse-alt"
    | "rubber-band"
    | "shake-x"
    | "shake-y"
    | "head-shake"
    | "swing"
    | "tada"
    | "wobble"
    | "jello"
    | "heart-beat"
    | "hinge"
    | "jack-in-the-box"
    | "light-speed-in-left"
    | "light-speed-in-right"
    | "light-speed-out-left"
    | "light-speed-out-right"
    | "flip"
    | "flip-in-x"
    | "flip-in-y"
    | "flip-out-x"
    | "flip-out-y"
    | "rotate-in"
    | "rotate-in-down-left"
    | "rotate-in-down-right"
    | "rotate-in-up-left"
    | "rotate-in-up-right"
    | "rotate-out"
    | "rotate-out-down-left"
    | "rotate-out-down-right"
    | "rotate-out-up-left"
    | "rotate-out-up-right"
    | "roll-in"
    | "roll-out"
    | "zoom-in"
    | "zoom-in-down"
    | "zoom-in-left"
    | "zoom-in-right"
    | "zoom-in-up"
    | "zoom-out"
    | "zoom-out-down"
    | "zoom-out-left"
    | "zoom-out-right"
    | "zoom-out-up"
    | "bounce-in"
    | "bounce-in-down"
    | "bounce-in-left"
    | "bounce-in-right"
    | "bounce-in-up"
    | "bounce-out"
    | "bounce-out-down"
    | "bounce-out-left"
    | "bounce-out-right"
    | "bounce-out-up"
    | "slide-in-down"
    | "slide-in-left"
    | "slide-in-right"
    | "slide-in-up"
    | "slide-out-down"
    | "slide-out-left"
    | "slide-out-right"
    | "slide-out-up"
    | "fade-in"
    | "fade-in-down"
    | "fade-in-down-big"
    | "fade-in-left"
    | "fade-in-left-big"
    | "fade-in-right"
    | "fade-in-right-big"
    | "fade-in-up"
    | "fade-in-up-big"
    | "fade-in-top-left"
    | "fade-in-top-right"
    | "fade-in-bottom-left"
    | "fade-in-bottom-right"
    | "fade-out"
    | "fade-out-down"
    | "fade-out-down-big"
    | "fade-out-left"
    | "fade-out-left-big"
    | "fade-out-right"
    | "fade-out-right-big"
    | "fade-out-up"
    | "fade-out-up-big"
    | "fade-out-top-left"
    | "fade-out-top-right"
    | "fade-out-bottom-left"
    | "fade-out-bottom-right"
    | "back-in-up"
    | "back-in-down"
    | "back-in-right"
    | "back-in-left"
    | "back-out-up"
    | "back-out-down"
    | "back-out-right"
    | "back-out-left";
}
