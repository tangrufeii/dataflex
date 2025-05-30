<template>
  <!--动态组件-用于移动端与Pc端兼容-->
  <Component :is="layout">
    <!--  所有组件传递  -->
    <template v-for="(_, slotName) in $slots" #[slotName]="scope">
      <!-- 转发所有插槽内容到目标组件 -->
      <slot :name="slotName" v-bind="scope || {}"></slot>
    </template>
  </Component>
</template>
<script lang="ts" setup>
import BaseMobileLayout from "@/layoutCore/base/admin/mobile/index.vue";
import BasePcLayout from "@/layoutCore/base/admin/pc/index.vue";
import { computed } from "vue";
import { useAppStore } from "@/stores/modules/app";

const appStore = useAppStore();
defineOptions({
  name: "AdminLayout"
});
const layout = computed<Comment>(() => {
  return appStore.isMobile ? BaseMobileLayout : BasePcLayout;
});
</script>
<style scoped></style>
