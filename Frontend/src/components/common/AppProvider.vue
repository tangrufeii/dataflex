<template>
  <NThemeEditor>
    <NLoadingBarProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <NMessageProvider>
            <ContextHolder />
            <slot></slot>
          </NMessageProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NThemeEditor>
</template>
<script lang="ts" setup>
import { createTextVNode, defineComponent } from "vue";
import { NThemeEditor, useDialog, useLoadingBar, useMessage, useNotification } from "naive-ui";

defineOptions({
  name: "AppProvider"
});
/**
 * 注册全局上下文
 */
const ContextHolder = defineComponent({
  name: "ContextHolder",
  setup() {
    function register() {
      window.$loadingBar = useLoadingBar();
      window.$dialog = useDialog();
      window.$message = useMessage();
      window.$notification = useNotification();
    }

    register();
    return () => createTextVNode();
  }
});
</script>

<style scoped></style>
