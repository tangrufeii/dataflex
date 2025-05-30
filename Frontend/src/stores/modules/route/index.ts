import { ref } from "vue";
import { defineStore } from "pinia";
import { SetupStoreId } from "@/enum";
import useBoolean from "../../../utils/useBoolean.ts";
import type { SysMenu } from "../../../api/methods/router.ts";
import type { MenuOption } from "naive-ui";

export const useRouteStore = defineStore(
  SetupStoreId.Route,
  () => {
    /** 常量路由是否初始化 **/
    const { bool: isInitConstantRoute, setBool: setIsInitConstantRoute } = useBoolean();
    /** 权限路由是否初始化 **/
    const { bool: isInitAuthRoute, setBool: setIsInitAuthRoute } = useBoolean();

    // 使用 ref 存储菜单列表
    const menuList = ref<MenuOption[]>();

    /**
     * 设置菜单列表（支持平铺和树形结构）
     * @param list 从后端获取的菜单数据
     */
    function setMenuList(list: SysMenu[]): MenuOption[] {
      // 转换函数（递归处理子菜单）
      const transformMenu = (menu: SysMenu): MenuOption => {
        // 处理国际化标题
        // 基础菜单项
        const menuOption: MenuOption = {
          ...menu,
          icon: (menu.icon as string) || import.meta.env.VITE_MENU_ICON
        };
        // 如果有子菜单且不为空，递归处理
        if (menu.children && menu.children.length > 0) {
          menuOption.children = menu.children.map(child => transformMenu(child));
        }
        return menuOption;
      };

      // 转换整个列表
      const transformedList = list.map(menu => transformMenu(menu));
      menuList.value = transformedList;
      return transformedList;
    }

    return {
      isInitConstantRoute,
      setIsInitConstantRoute,
      isInitAuthRoute,
      setIsInitAuthRoute,
      menuList,
      setMenuList
    };
  },
  {
    persist: {
      key: "route-store", // 自定义存储 key
      storage: localStorage, // 默认就是 localStorage
      paths: ["menuList"] // 仅持久化 menuList
    } // ✔ 启用持久化
  }
);
