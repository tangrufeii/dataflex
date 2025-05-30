<template>
  <n-config-provider
    :date-locale="naiveDateLocale"
    :locale="naiveLocale"
    :theme
    style="height: 100%">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>
<script lang="ts" setup>
import type { GlobalTheme } from "naive-ui";
import { darkTheme, useOsTheme } from "naive-ui";
import { computed, ref } from "vue";
import AppProvider from "./components/common/AppProvider.vue";
import { naiveDateLocales, naiveLocales } from "@/locales/naive.ts";
import { useAppStore } from "@/stores/modules/app";
import { ThemeMode } from "~/types/enums/theme.ts";

const appStore = useAppStore();
const osTheme = ref(useOsTheme());
// eslint-disable-next-line vue/return-in-computed-property
const theme = computed<GlobalTheme | null>(() => {
  if (appStore.themeMode == ThemeMode.DARK) {
    return darkTheme;
  }
  if (appStore.themeMode == ThemeMode.LIGHT) {
    return null;
  }
  if (appStore.themeMode == ThemeMode.SYSTEM) {
    if (osTheme.value && osTheme.value == "dark") {
      return darkTheme;
    }
    return null;
  }
});
const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale];
});

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale];
});
</script>
<style scoped></style>
