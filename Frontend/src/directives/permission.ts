// src/directives/permission.ts
import { type Directive } from "vue";
import { useAuthStore } from "@/stores/auth";

export const vPermission: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    //const authStore = useAuthStore();
    // if (!authStore.hasPermission(binding.value)) {
    // el.parentNode?.removeChild(el); // 无权限则移除元素
    // 或者隐藏：el.style.display = 'none';
    //}
  }
};
