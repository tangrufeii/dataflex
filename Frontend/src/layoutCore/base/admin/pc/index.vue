<template>
  <div id="base_panel">
    <n-layout style="height: 100vh" has-sider>
      <!-- 左侧边栏 -->
      <n-layout-sider
        ref="siderRef"
        :collapsed-width="70"
        :width="240"
        :native-scrollbar="false"
        bordered
        :collapsed="appStore.siderCollapse"
        collapse-mode="width"
        show-trigger="arrow-circle"
        :inverted="inverted"
        content-style="display: flex; flex-direction: column; height: 100%; padding: 0 "
        @collapse="appStore.setSiderCollapse(true)"
        @expand="appStore.setSiderCollapse(false)">
        <slot name="sider"></slot>
      </n-layout-sider>
      <!-- 右侧主内容区 -->
      <n-layout style="height: 100vh">
        <!-- 顶部导航栏 -->
        <n-layout-header bordered style="height: 64px">
          <slot name="header"></slot>
        </n-layout-header>

        <!-- 主内容区域 -->
        <n-layout-content style="overflow: hidden; height: calc(100% - 64px); padding: 16px">
          <slot name="content"></slot>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAppStore } from "@/stores/modules/app";
const appStore = useAppStore();
defineOptions({
  name: "BasePcLayout"
});
const inverted = ref(false);
/**
 * 边栏是否折叠
 */
appStore.toggleSiderCollapse();
</script>

<style scoped></style>
