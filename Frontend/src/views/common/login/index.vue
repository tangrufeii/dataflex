<template>
  <div :class="['login-container', { 'dark-mode': isDark }]">
    <!-- 登录表单内容 -->
    <LoginRegisterForm />
  </div>
</template>

<script setup lang="ts">
import type { GlobalTheme } from "naive-ui";
import { computed, ref } from "vue";
import { useAppStore } from "@/stores/modules/app/index.ts";
import { darkTheme, useOsTheme } from "naive-ui";
import { ThemeMode } from "~/types/enums/theme.ts";
import LoginRegisterForm from "@/views/common/login/LoginRegisterForm.vue";

const appStore = useAppStore();
const osTheme = ref(useOsTheme());
const isDark = computed<GlobalTheme | null>(() => {
  if (appStore.themeMode === ThemeMode.DARK) {
    return darkTheme;
  }
  if (appStore.themeMode === ThemeMode.LIGHT) {
    return null;
  }
  if (appStore.themeMode === ThemeMode.SYSTEM) {
    if (osTheme.value && osTheme.value === "dark") {
      return darkTheme;
    }
    return null;
  }
});
</script>

<style scoped>
.login-container {
  height: 100vh;
  transition: background 0.5s ease;
  /* Light模式默认背景 */
  background: url("@/assets/login-light.avif") center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dark-mode {
  /* Dark模式星空背景 */
  background: url("@/assets/login-dark.jpg") center/cover;
  color: #f0f0f0;
}
.card-wrapper {
  width: 100%;
  max-width: 420px;
}
.setting {
  display: flex;
  flex-direction: row;
}
</style>
