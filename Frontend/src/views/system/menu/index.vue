<template>
  <n-card :bordered="true" style="height: 100%" :title="$t('route.sysMenu')">
    <template #header-extra>
      <TableHeaderOperation v-model:columns="columns" @add="add" />
    </template>
    <n-data-table
      :columns="columns"
      :data="data"
      :row-key="rowKey"
      :pagination="pagination"
      @update:checked-row-keys="handleCheck" />
  </n-card>
</template>
<script setup lang="ts">
import { $t } from "@/locales";
import TableHeaderOperation from "@/components/common/table/tableHeaderOperation.vue";
import { computed, h, reactive, ref } from "vue";
import { NaiveUtils } from "@/utils/naive-ui-util.ts";
import { useRouteStore } from "@/stores/modules/route";
import SVGIcon from "@/components/custom/SVGIcon.vue";
import { DataTableRowKey, NTag } from "naive-ui";
import { formatLocaleDateTime } from "@/utils/dateFormatter.ts";
import type { RowData } from "naive-ui/es/data-table/src/interface";
const routerStore = useRouteStore();
const add = () => {
  NaiveUtils.success("1111", { duration: 2000 });
};
/** 选中行 **/
const checkedRowKeys = ref<DataTableRowKey[]>([]);
function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeys.value = rowKeys;
}
function rowKey(row: RowData) {
  return row.name;
}
const columns = computed(() => [
  {
    type: "selection"
  },
  {
    title: $t("page.sysMenu.table.columns.name"),
    key: "name",
    align: "left"
  },
  {
    title: $t("page.sysMenu.table.columns.icon"),
    key: "icon",
    render: row => h(SVGIcon, { icon: row.icon })
  },
  {
    title: $t("page.sysMenu.table.columns.path"),
    key: "path",
    align: "center"
  },
  {
    title: $t("page.sysMenu.table.columns.perms"),
    key: "perms",
    align: "center"
  },
  {
    title: $t("page.sysMenu.table.columns.sort"),
    key: "sort",
    align: "center"
  },
  {
    title: $t("page.sysMenu.table.columns.visible"),
    key: "visible",
    render: row =>
      h(
        NTag,
        {
          type: row.visible === 1 ? "success" : "default",
          size: "small"
        },
        {
          default: () => $t(`page.sysMenu.table.visible.${row.visible}`)
        }
      ),
    align: "center"
  },
  // 处理 status - 映射为文字 + Tag 样式
  {
    title: $t("page.sysMenu.table.columns.status"),
    key: "status",
    render: row =>
      h(
        NTag,
        {
          type: row.status === 1 ? "success" : "error",
          size: "small"
        },
        {
          default: () => $t(`page.sysMenu.table.status.${row.status}`)
        }
      ),
    align: "center"
  },
  {
    title: $t("page.sysMenu.table.columns.createTime"),
    key: "createTime",
    render: row => h("span", formatLocaleDateTime(row.createTime, "picker"))
  },
  {
    title: $t("page.sysMenu.table.columns.updateTime"),
    key: "updateTime",
    render: row => h("span", formatLocaleDateTime(row.createTime, "picker"))
  }
]);
const data = ref(routerStore.menuList);
const pagination = reactive({
  page: 2,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [3, 5, 7],
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  }
});
</script>
<style scoped></style>
