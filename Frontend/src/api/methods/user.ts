import { userAlova } from "..";

/**
 * 获取用户信息
 */
export const addMenuInfo = id => userAlova.Get("/user/" + id);
