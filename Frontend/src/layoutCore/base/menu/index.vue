<template>
  <n-menu
    v-model:value="activeKey"
    :collapsed="appStore.siderCollapse"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    :render-label="renderLabel" />
</template>
<script setup lang="ts">
import { type MenuOption, NEllipsis, NIcon } from "naive-ui";
import { computed, h, onMounted, ref, type VNode } from "vue";
import { useAppStore } from "@/stores/modules/app";
import { useRouteStore } from "@/stores/modules/route";
import { getMenuList } from "@/api/methods/router.ts";
import SVGIcon from "@/components/custom/SVGIcon.vue";
import { RouterLink } from "vue-router";
import { $t } from "@/locales";
const appStore = useAppStore();
defineOptions({
  name: "BaseLayoutMenu"
});
const activeKey = ref<string | null>(null);
const routerStore = useRouteStore();

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
  const transformMenu = (menu: any): CustomMenuOption => {
    return {
      ...menu,
      icon: () => h(SVGIcon, { icon: menu.icon }),
      key: menu.path || menu.url,
      children: menu.children?.map(transformMenu)
    };
  };
  return routerStore.menuList.map(transformMenu);
});
const renderLabel = (option: MenuOption) => {
  const label = option.i18nKey ? $t(`route.${option.i18nKey}`) : option.name || "";
  return h(NEllipsis, null, {
    // 关键修改：这里必须用函数返回插槽内容
    default: () =>
      option.parentId != 0 && option.type == 2
        ? h(RouterLink, { to: option?.path || "/home" }, () => label)
        : h(RouterLink, {}, () => label)
  });
};
onMounted(async () => {
  const data = await getMenuList();
  routerStore.setMenuList(data.data);
});
</script>

<style scoped></style>
