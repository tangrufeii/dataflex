<template>
  <NPopover placement="bottom-end" trigger="click">
    <template #trigger>
      <NButton size="small" class="column-setting-trigger">
        <template #icon>
          <SVGIcon :icon="'setting'" :size="18" class="icon-style" />
        </template>
        {{ $t("common.columnSetting") }}
      </NButton>
    </template>
    <div class="column-setting-content">
      <VueDraggable v-model="columns" :animation="150" filter=".none_draggable">
        <div v-for="item in columns" :key="item.key" class="column-item">
          <SVGIcon :icon="'drag'" class="drag-handle" />
          <NCheckbox v-model:checked="item.checked" class="column-checkbox none_draggable">
            <template v-if="typeof item.title === 'function'">
              <component :is="item.title" />
            </template>
            <template v-else>
              {{ item.title }}
            </template>
          </NCheckbox>
        </div>
      </VueDraggable>
    </div>
  </NPopover>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>, K = never">
import { VueDraggable } from "vue-draggable-plus";
import { $t } from "@/locales";
import SVGIcon from "@/components/custom/SVGIcon.vue";

defineOptions({
  name: "TableColumnSetting"
});

const columns = defineModel<NaiveUI.TableColumnCheck[]>("columns", {
  required: true
});
</script>

<style scoped>
/* 触发按钮样式 */
.column-setting-trigger {
  display: flex;
  align-items: center;
}

.icon-style {
  font-size: 14px;
  margin-right: 4px;
  color: var(--n-text-color);
}

/* 弹窗内容样式 */
.column-setting-content {
  width: 240px;
  max-height: 300px;
  overflow-y: auto;
}

/* 列项目样式 */
.column-item {
  height: 36px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 8px;
  margin: 2px 0;
  transition: background-color 0.2s;
}

.column-item:hover {
  background-color: rgba(24, 160, 88, 0.12); /* Naive UI 主要颜色透明化 */
}

/* 拖拽手柄 */
.drag-handle {
  cursor: move;
}

/* 复选框样式 */
.column-checkbox {
  flex: 1;
  margin-left: 4px;
}
</style>
