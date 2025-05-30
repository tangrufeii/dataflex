<template>
  <div
    class="project_info"
    style="height: 64px; margin-right: 0px; display: flex; align-items: center">
    <n-image
      :img-props="{
        style: {
          'border-radius': '4px',
          'object-fit': 'cover',
          filter: 'contrast(1.2)',
          'mix-blend-mode': 'lighten',
          'background-color': 'transparent' /* 去除底色 */
        }
      }"
      :style="{
        'padding-left': siderCollapsed ? '13px' : '24px',
        'background-color': 'transparent',
        transition:
          'background-color .3s var(--n-bezier), padding-left .3s var(--n-bezier), border-color .3s var(--n-bezier)'
      }"
      :src="IconPNG"
      :width="40"
      preview-disabled />
    <n-h1
      v-show="!siderCollapsed"
      style="
        margin: 0 0 0 0px;
        font-size: 18px;
        overflow: hidden;
        white-space: normal;
        word-break: normal;
      ">
      DateFlex
    </n-h1>
  </div>
</template>
<script setup lang="ts">
import IconPNG from "@/assets/icon.png";
defineOptions({
  name: "BaseLayoutLogo"
});

interface Props {
  /**
   * 边栏是否折叠
   */
  siderCollapsed: boolean;
}

defineProps<Props>();
</script>
<style scoped>
/* 关键CSS */
.project_info {
  height: 64px;
  margin-right: 0;
  display: flex;
  align-items: center;
  overflow: hidden; /* 防止文字溢出导致布局抖动 */
}
.title {
  margin: 0 0 0 12px;
  font-size: 18px;
  transition:
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform; /* 启用GPU加速 */
}
.title--collapsed {
  opacity: 0;
  transform: translateX(10px); /* 向右淡出效果 */
}
</style>
