import { menuAlova } from "..";
import type { SysMenu } from "./router.ts";

/**
 * 获取菜单树
 */
export const getMenuTree = () => menuAlova.Get("/");

/**
 * 获取单个菜单详情
 * @param id 菜单ID
 */
export const getMenuById = (id: number) => menuAlova.Get(`/${id}`);

/**
 * 新增菜单
 * @param menu 菜单对象
 */
export const addMenu = (menu: SysMenu) => menuAlova.Post("/", menu);

/**
 * 修改菜单
 * @param menu 菜单对象（需包含id）
 */
export const updateMenu = (menu: any) => menuAlova.Put("/", menu);

/**
 * 批量删除菜单
 * @param ids 菜单ID数组
 */
export const deleteMenus = (ids: number[]) =>
  menuAlova.Delete("/", { params: { idList: ids.join(",") } });
