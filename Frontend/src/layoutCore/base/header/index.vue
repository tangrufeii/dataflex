<template>
  <n-card :bordered="false" content-style="padding: 10px 16px;">
    <div style="display: flex; align-items: center; height: 100%">
      <div style="flex: 1">
        <ButtonIcon
          :icon="'menu-unfold'"
          :tooltip-content="tooltipContent"
          :size="24"
          @click="appStore.toggleSiderCollapse()" />
      </div>
      <div style="display: flex; align-items: center">
        <FullScreen :full="appStore.isFullScreen" @click="toggleFullScreen" />
        <LangSwitch :lang="appStore.locale" :lang-options="localeOptions" />
        <ThemeSwitch />
        <!--        <div> 右侧面板</div>-->
        <n-avatar
          round
          size="small"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          style="margin-left: 12px" />
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import LangSwitch from "@/components/common/LangSwitch.vue";
import FullScreen from "@/components/common/FullScreen.vue";
import { useAppStore } from "@/stores/modules/app";
import { useFullscreen } from "@vueuse/core";
import ButtonIcon from "@/components/custom/ButtonIcon.vue";
import { computed } from "vue";
import { $t } from "@/locales";
import ThemeSwitch from "@/components/common/ThemeSwitch.vue";
const appStore = useAppStore();
defineOptions({
  name: "BaseLayoutHeader"
});
const localeOptions = [
  {
    label: "中文",
    key: "zh-CN"
  },
  {
    label: "English",
    key: "en-US"
  }
];
const { isFullscreen, toggle } = useFullscreen();
const toggleFullScreen = () => {
  appStore.toggleFullScreen();
  toggle();
};
const tooltipContent = computed(() => {
  return appStore.siderCollapse ? $t("icon.collapse") : $t("icon.expand");
});
</script>

<style scoped></style>
