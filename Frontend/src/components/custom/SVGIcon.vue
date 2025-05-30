<template>
  <NIcon :size="size">
    <!--    <component :is="getIconComponent(props.icon)" />-->
    <!--    <div :class="getIconComponent(props.icon)"></div>-->
    <svg v-if="isLocalIcon" class="icon" aria-hidden="true">
      <!-- symbolId格式需与配置一致 -->
      <use :xlink:href="iconSvgPath" />
    </svg>
    <component :is="getIconComponent(props.icon)" v-else />
  </NIcon>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, defineComponent, resolveComponent } from "vue";

interface Props {
  /** Icon park icon name */
  // eslint-disable-next-line vue/require-default-prop
  icon?: string | (() => string);
  size?: number;
}
defineComponent({
  name: "SVGIcon"
});
const props = withDefaults(defineProps<Props>(), {
  size: 24
});
const prefix = import.meta.env.VITE_ICON_PREFIX; // 确保获取到值
const localPrefix = import.meta.env.VITE_ICON_LOCAL_PREFIX;
const isLocalIcon = computed(() => {
  const iconName = `${prefix}-${props.icon}`;
  return iconName?.startsWith(import.meta.env.VITE_ICON_LOCAL_PREFIX);
});
const iconSvgPath = computed(() => {
  return `#${prefix}-${props.icon}`;
});
const getIconComponent = (icon: string | (() => string)) => {
  // 1. 如果是函数，先执行获取真实的 icon
  const iconName = typeof icon === "function" ? icon() : icon;
  // 2. 如果最终 iconName 是字符串，则解析组件名
  if (iconName) {
    return resolveComponent(`${prefix}-${iconName}`);
  }
  // 3. 否则返回 null（不渲染）
  return null;
};
</script>
<style scoped></style>
