<template>
  <div id="base_panel">
    <n-layout style="height: 100vh" has-sider>
      <!-- 左侧边栏(移动端使用抽屉兼容) -->
      <n-drawer
        v-model:show="showDrawer"
        :width="200"
        placement="left"
        @update-show="show => appStore.setSiderCollapse(!show)">
        <slot name="sider"></slot>
      </n-drawer>
      <!-- 右侧主内容区 -->
      <n-layout style="height: 100vh">
        <!-- 顶部导航栏 -->
        <n-layout-header bordered style="height: 64px">
          <slot name="header"></slot>
        </n-layout-header>

        <!-- 主内容区域 -->
        <n-layout-content style="overflow: hidden; height: calc(100% - 64px)">
          <n-card :bordered="false" style="height: 100%">
            <slot name="content"></slot>
          </n-card>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/modules/app";
import { computed } from "vue";

defineOptions({
  name: "BaseMobileLayout"
});
const appStore = useAppStore();
/**
 * 边栏是否折叠
 */
appStore.toggleSiderCollapse();
const showDrawer = computed(() => !appStore.siderCollapse);
</script>

<style scoped></style>
