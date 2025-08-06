import { createAlova } from "alova";
import VueHook from "alova/vue";
import adapterFetch from "alova/fetch";
import { type ResponseData, routerAlova } from "../index.ts";
import { types } from "sass";
import List = types.List;

// 定义返回类型接口（根据你的 SysMenu 实体类）
export interface SysMenu {
  /** 菜单ID **/
  id: number;
  /** 父菜单ID（0表示根菜单） **/
  parentId: number;
  /** 菜单名称 **/
  name: string;
  /** 菜单图标 **/
  icon?: string;
  /**  路由路径 **/
  path?: string;
  /**  组件路径 **/
  component?: string;
  /** 权限标识 **/
  perms?: string;
  /** 菜单类型（1目录 2菜单 3按钮） **/
  type: number;
  /** 排序 **/
  sort?: number;
  /** 是否可见（1显示 0隐藏） **/
  visible?: number;
  /** 状态（1正常 0停用） **/
  status?: number;
  /** 创建时间 **/
  createTime?: string;
  /** 修改时间 **/
  updateTime?: string;
  /** 逻辑删除 **/
  deleted?: number;
  /** 国际化键 **/
  i18nKey?: string;
  children?: List<SysMenu>;
  /** 是否是外链(0否 1是) **/
  isFrame?: number;
  /** 外链链接 **/
  url?: string;
}

/**
 * 获取菜单列表（支持查询条件）
 * @param params 查询条件（对应后端SysMenu实体字段）
 */
export const getMenuList = (params?: Partial<SysMenu>) => {
  return routerAlova.Get<ResponseData<SysMenu[]>>("", {
    params // 自动将对象转为query参数
  });
};
