import { defineStore } from "pinia";
import { SetupStoreId } from "../../../enum";
import { ref } from "vue";
import { setLocale } from "../../../locales";
import { localStg } from "../../../utils/storage.ts";
import { setDayjsLocale } from "../../../locales/dayjs.ts";
import useBoolean from "../../../utils/useBoolean.ts";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import type { ThemeMode } from "../../../../types/enums/theme.ts";

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const { bool: isFullScreen, toggle: toggleFullScreen } = useBoolean();
  /** 本地语言 **/
  const locale = ref(localStg.get("lang") || "zh-CN");
  /** 边栏是否折叠 **/
  const {
    bool: siderCollapse,
    setBool: setSiderCollapse,
    toggle: toggleSiderCollapse
  } = useBoolean();
  /**
   * 创建响应式断点
   */
  const breakpoints = useBreakpoints(breakpointsTailwind);
  /** 是否移动布局 */
  const isMobile = breakpoints.smaller("sm");
  /** 主题状态 **/
  // 类型定义
  const themeMode = ref<ThemeMode>(localStg.get("theme") || "system");
  // 主题切换方法
  function toggleTheme(mode: ThemeMode) {
    themeMode.value = mode;
    localStg.set("theme", mode);
  }
  const localeOptions: App.I18n.LangOption[] = [
    {
      label: "中文",
      key: "zh-CN"
    },
    {
      label: "English",
      key: "en-US"
    }
  ];
  function init() {
    setDayjsLocale(locale.value);
  }
  function changeLocale(lang) {
    locale.value = lang;
    setLocale(lang);
    localStg.set("lang", lang);
  }
  init();
  return {
    themeMode,
    toggleTheme,
    isMobile,
    locale,
    localeOptions,
    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,
    changeLocale,
    isFullScreen,
    toggleFullScreen
  };
});
