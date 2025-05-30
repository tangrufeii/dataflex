declare namespace App {
  namespace I18n {
    type LangType = "en-US" | "zh-CN";
    type ThemeMode = "dark" | "light" | "system";
    type LangOption = {
      label: string;
      key: LangType;
    };
    type ThemeOption = {
      label: string;
      key: LangType;
    };
  }
}
