<template>
  <n-card style="height: 100%" :content-style="{ padding: '0px', height: '100%' }">
    <!-- Logo区 -->
    <BaseLayoutLogo :sider-collapsed="appStore.siderCollapse" />

    <!-- 菜单区 -->
    <BaseLayoutMenu :sider-collapsed="appStore.siderCollapse" />
  </n-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { MenuOption } from "naive-ui";
import BaseLayoutMenu from "@/layoutCore/base/menu/index.vue";
import BaseLayoutLogo from "@/layoutCore/base/logo/index.vue";
import { useAppStore } from "@/stores/modules/app";
defineOptions({
  name: "BaseLayoutSider"
});
const appStore = useAppStore();
</script>
<style scoped></style>
