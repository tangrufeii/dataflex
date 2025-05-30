<template>
  <div class="exception-container">
    <div class="exception-icon">
      <!-- <SvgIcon :local-icon="icon" />-->
    </div>
    <NButton type="primary" @click="routerPushByKey('home')">
      {{ $t("common.backToHome") }}
    </NButton>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouterPush } from "@/hooks/common/router";
import { $t } from "@/locales";

defineOptions({ name: "ExceptionBase" });

type ExceptionType = "403" | "404" | "500";

interface Props {
  /**
   * Exception type
   *
   * - 403: no permission
   * - 404: not found
   * - 500: service error
   */
  type: ExceptionType;
}

const props = defineProps<Props>();

const { routerPushByKey } = useRouterPush();

const iconMap: Record<ExceptionType, string> = {
  "403": "no-permission",
  "404": "not-found",
  "500": "service-error"
};

const icon = computed(() => iconMap[props.type]);
</script>

<style scoped>
.exception-container {
  width: 100%;
  height: 100%;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  overflow: hidden;
}

.exception-icon {
  display: flex;
  font-size: 400px;
  color: var(--el-color-primary);
}
</style>
