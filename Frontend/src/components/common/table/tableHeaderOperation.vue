<template>
  <NSpace :align="itemAlign" wrap justify="end" class="table-header-operation">
    <slot name="prefix"></slot>
    <slot name="default">
      <NButton size="small" ghost type="primary" class="operation-button" @click="add">
        <template #icon>
          <SVGIcon :icon="'add-one'" :size="18" class="button-icon" />
        </template>
        {{ $t("common.add") }}
      </NButton>
      <NPopconfirm class="delete-confirm" @positive-click="batchDelete">
        <template #trigger>
          <NButton
            size="small"
            ghost
            type="error"
            class="operation-button"
            :disabled="disabledDelete">
            <template #icon>
              <SVGIcon :icon="'delete-one'" :size="18" class="button-icon" />
            </template>
            {{ $t("common.batchDelete") }}
          </NButton>
        </template>
        {{ $t("common.confirmDelete") }}
      </NPopconfirm>
    </slot>
    <NButton size="small" class="operation-button" @click="refresh">
      <template #icon>
        <SVGIcon
          :icon="'refresh'"
          :size="18"
          class="button-icon"
          :class="{ 'spin-animation': loading }" />
      </template>
      {{ $t("common.refresh") }}
    </NButton>
    <TableColumnSetting v-model:columns="columns" />
    <slot name="suffix"></slot>
  </NSpace>
</template>

<script setup lang="ts">
import { $t } from "@/locales";
import TableColumnSetting from "./TableColumnSetting.vue";
import SVGIcon from "@/components/custom/SVGIcon.vue";

defineOptions({
  name: "TableHeaderOperation"
});

interface Props {
  itemAlign?: NaiveUI.Align;
  disabledDelete?: boolean;
  loading?: boolean;
}

defineProps<Props>();

interface Emits {
  (e: "add"): void;
  (e: "delete"): void;
  (e: "refresh"): void;
}

const emit = defineEmits<Emits>();

const columns = defineModel<NaiveUI.TableColumnCheck[]>("columns", {
  default: () => []
});

function add() {
  emit("add");
}

function batchDelete() {
  emit("delete");
}

function refresh() {
  emit("refresh");
}
</script>

<style scoped>
.table-header-operation {
  width: 100%;
}

@media (max-width: 640px) {
  .table-header-operation {
    width: 200px;
  }
}

.operation-button {
  display: flex;
  align-items: center;
}

.button-icon {
  margin-right: 4px;
  font-size: 14px;
  color: inherit;
}

.delete-confirm .n-popconfirm__action {
  margin-top: 8px;
}

.spin-animation {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
