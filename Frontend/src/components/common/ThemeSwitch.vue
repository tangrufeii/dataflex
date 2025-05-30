<template>
  <ButtonIcon
    :icon="currentIcon"
    :tooltip-content="tooltipContent"
    tooltip-placement="bottom"
    @click="cycleTheme" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Translate } from "@icon-park/vue-next";
import { useAppStore } from "@/stores/modules/app";
import ButtonIcon from "@/components/custom/ButtonIcon.vue";
import { ThemeIcon, ThemeMode } from "~/types/enums/theme.ts";
import { $t } from "@/locales";

const appStore = useAppStore();

defineOptions({
  name: "ThemeSwitch"
});
const currentIcon = computed(() => ThemeIcon[appStore.themeMode]);
const tooltipContent = computed(() => {
  return (
    `当前主题：${appStore.themeMode}` + "(" + $t(`theme.themeSchema.${appStore.themeMode}`) + ")"
  );
});

function cycleTheme() {
  const modes = Object.values(ThemeMode);
  const currentIndex = modes.indexOf(appStore.themeMode);
  const nextIndex = (currentIndex + 1) % modes.length;
  appStore.toggleTheme(modes[nextIndex]);
}
</script>
