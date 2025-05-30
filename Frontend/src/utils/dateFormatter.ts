// src/utils/localeDateTime.ts
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import { localStg } from "@/utils/storage";

// 增强型本地化格式配置
const localeFormats = {
  "zh-CN": {
    full: "YYYY年M月D日 HH时mm分ss秒",
    shortDate: "YYYY年M月D日",
    withWeekday: "YYYY年M月D日 dddd",
    time: "HH时mm分ss秒"
  },
  "en-US": {
    full: "MMMM D, YYYY h:mm:ss A",
    shortDate: "MMM D, YYYY",
    withWeekday: "dddd, MMMM D, YYYY",
    time: "h:mm:ss A"
  }
};

/**
 * 智能本地化日期格式化
 * @param utcString ISO时间字符串
 * @param formatType 格式类型
 */
export const formatLocaleDateTime = (
  utcString: string,
  formatType: keyof (typeof localeFormats)["zh-CN"] = "full"
) => {
  const locale = localStg.get("lang") || "zh-CN";
  const dayjsLocale = locale.toLowerCase();

  // 加载对应语言包
  dayjs.locale(dayjsLocale);

  return dayjs(utcString).format(localeFormats[locale][formatType] || localeFormats[locale].full);
};

// 示例用法：
// 中文输出: "2025年4月23日 10时41分46秒"
// 英文输出: "April 23, 2025 10:41:46 AM"
