<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="模态框"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true">
      <template #header-extra>噢！</template>
      内容
      <template #footer>尾部</template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import type { SysMenu } from "@/api/methods/router.js";
const props = defineProps<{
  show: boolean;
  isEdit: boolean;
  editData?: SysMenu | null;
}>();
const emit = defineEmits(["update:show", "submit", "cancel"]);
const showModal = computed({
  get: () => props.show,
  set: val => emit("update:show", val)
});

const isEditMode = ref(false); // 标记当前是否处于编辑模式
const currentEditId = ref<number | null>(null); // 当前编辑的ID
</script>

<style scoped></style>
