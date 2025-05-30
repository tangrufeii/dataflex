import { userAlova } from "..";

/**
 * 获取用户信息
 */
export const getUserInfo = id => userAlova.Get("/user/" + id);
