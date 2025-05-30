import type { PiniaPluginContext } from "pinia";

import { SetupStoreId } from "@/enum";
import { klona as jsonClone } from "klona/json";

/**
 * 插件重置由 setup 语法编写的 store 的状态
 *
 * @param context
 */
export function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = Object.values(SetupStoreId) as string[];

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store;

    const defaultStore = jsonClone($state);

    context.store.$reset = () => {
      context.store.$patch(defaultStore);
    };
  }
}
