<template>
  <n-menu
    v-model:expanded-keys="expandedKeys"
    v-model:value="activeKey"
    :collapsed="appStore.siderCollapse"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    @update:value="routerPushByKeyWithMetaQuery" />
</template>
<script setup lang="ts">
import { type MenuOption, NEllipsis, NIcon } from "naive-ui";
import { computed, h, nextTick, onMounted, ref, type VNode, watch } from "vue";
import { useAppStore } from "@/stores/modules/app";
import { useRouteStore } from "@/stores/modules/route";
import { getMenuList } from "@/api/methods/router.ts";
import SVGIcon from "@/components/custom/SVGIcon.vue";
import { RouterLink, useRoute } from "vue-router";
import { $t } from "@/locales";
import { useRouterPush } from "@/hooks/common/router.ts";
import { useMenu } from "@/layoutCore/base/context";
import { GLOBAL_SIDER_MENU_ID } from "@/constants/app.ts";
const { routerPushByKeyWithMetaQuery } = useRouterPush();
const appStore = useAppStore();
defineOptions({
  name: "BaseLayoutMenu"
});
const activeKey = ref<string | null>(null);
const route = useRoute();
const routerStore = useRouteStore();
const { selectedKey } = useMenu();
const expandedKeys = ref<string[]>([]);
function updateExpandedKeys() {
  console.log("当前选中的Key:", selectedKey.value);
  activeKey.value = selectedKey.value;

  if (appStore.siderCollapse || !selectedKey.value) {
    expandedKeys.value = [];
    return;
  }

  // 获取当前应展开的路径Keys（去重避免重复添加）
  const newKeysToAdd = routerStore.getSelectedMenuKeyPath(selectedKey.value) || [];
  console.error("newKeysToAdd", newKeysToAdd);
  // 合并现有 expandedKeys 和新增Keys（使用Set自动去重）
  nextTick(() => {
    expandedKeys.value = [
      ...new Set([
        ...expandedKeys.value, // 保留原有Keys
        ...newKeysToAdd // 添加新Keys
      ])
    ];
  });
}
watch(
  () => route.name,
  () => {
    updateExpandedKeys();
  },
  { immediate: true }
);
interface Props {
  /**
   * 边栏是否折叠
   */
  siderCollapsed: boolean;
}
defineProps<Props>();
// 1️⃣ 定义类型（扩展原生 MenuOption）
interface CustomMenuOption extends MenuOption {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  icon?: (() => VNode) | string | Function; // ✅ 允许 string 和函数
}
const menuOptions = computed<CustomMenuOption[]>(() => {
  if (!routerStore.menuList) {
    return [];
  }
  const transformMenu = (menu: any): CustomMenuOption => {
    const label = menu.i18nKey ? $t(`route.${menu.i18nKey}`) : menu.name || "";
    return {
      ...menu,
      icon: () => h(SVGIcon, { icon: menu.icon }),
      key: menu.name || menu.path || menu.url,
      children: menu.children?.map(transformMenu),
      label: label
    };
  };
  console.error("routerStore.menuList", routerStore.menuList);
  return routerStore.menuList.map(transformMenu);
});
const renderLabel = (option: MenuOption) => {
  const label = option.i18nKey ? $t(`route.${option.i18nKey}`) : option.name || "";
  console.error("option", option);
  return h(NEllipsis, null, {
    // 关键修改：这里必须用函数返回插槽内容
    default: () =>
      option.parentId != 0 && option.type == 2
        ? h(RouterLink, { to: option?.path || "/home" }, () => label)
        : h(RouterLink, { to: "" }, () => label)
  });
};
onMounted(() => {
  console.error("初始化");
});
</script>

<style scoped></style>
