import type { App } from "vue";
import { createPinia } from "pinia";
import { resetSetupStore } from "./plugins";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
/** Setup Vue store plugin pinia */
export function setupStore(app: App) {
  const store = createPinia();
  store.use(resetSetupStore);
  store.use(piniaPluginPersistedstate); // 启用插件
  app.use(store);
}
