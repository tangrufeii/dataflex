<template>
  <n-card :bordered="true" :title="$t('page.sysMenu.title')" style="height: 100%">
    <template #header-extra>
      <TableHeaderOperation
          v-model:columns="columnChecks"
          :checked-row-keys="checkedRowKeys"
          :loading="loading"
          @add="handleAdd"
          @refresh="getData"
      />
    </template>
    <n-data-table
        v-model:checked-row-keys="checkedRowKeys"
        :data="data"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :pagination="mobilePagination"
        :row-key="row => row.id"
        :single-line="false"
        class="sm:h-full"
        remote
        :columns="columns"
        size="small"
        striped
    />
    <MenuSaveOrUpdate v-model:show="modalVisible" :is-edit="isEditMode"/>
  </n-card>
</template>
<script lang="tsx" setup>
import {$t} from "@/locales";
import TableHeaderOperation from "@/components/common/table/tableHeaderOperation.vue";
import {h, reactive, ref} from "vue";
import {NaiveUtils} from "@/utils/naive-ui-util.ts";
import {useRouteStore} from "@/stores/modules/route";
import SVGIcon from "@/components/custom/SVGIcon.vue";
import {DataTableRowKey, NButton, NPopconfirm, NTag} from "naive-ui";
import {formatLocaleDateTime} from "@/utils/dateFormatter.ts";
import type {RowData} from "naive-ui/es/data-table/src/interface";
import type {SysMenu} from "@/api/methods/router.ts";
import MenuSaveOrUpdate from "@/views/system/menu/_MenuSaveOrUpdate.vue";
import {useTable, useTableOperate} from "@/hooks/common/table.ts";
import appStore from "@icon-park/vue-next/lib/icons/AppStore";

const routerStore = useRouteStore();
// 模态框控制
const modalVisible = ref(false);
const isEditMode = ref(false);
const currentEditData = ref<SysMenu | null>(null);
// 打开模态框（通用方法）
const openModal = (isEdit: boolean, rowData?: SysMenu) => {
  isEditMode.value = isEdit;
  currentEditData.value = isEdit ? rowData : null;
  modalVisible.value = true;
};

const add = () => {
  openModal(false, null);
};


const hasAuth = (codes: string | string[]) => {
  return true
}

const {
  columns,
  columnChecks,
  data,
  loading,
  getData,
  getDataByPage,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  /**  模拟异步获取数据  **/
  apiFn: async (params: any) => {
    return {
      data: {
        records: routerStore.menuList
      }
    }
  },
  apiParams: {
    page: 1,
    pageSize: 20,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    roleName: null,
    roleCode: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center'
    },

    {
      key: "name",
      title: $t("page.sysMenu.table.columns.name"),
      align: 'left',
      ellipsis: {},
      render: (item, index) => {
        return h("span", item.i18nKey ? $t(`route.${item.i18nKey}`) : item.name);
      }
    },
    {
      key: "icon",
      title: $t("page.sysMenu.table.columns.icon"),
      width: 80,
      render: row => h(SVGIcon, {icon: row.icon})
    },
    {
      key: "path",
      title: $t("page.sysMenu.table.columns.path"),
      align: "center",
      ellipsis: {}
    },

    {
      key: "sort",
      title: $t("page.sysMenu.table.columns.sort"),
      width: 70,
      align: "center"
    },
    {
      key: "visible",
      title: $t("page.sysMenu.table.columns.visible"),
      width: 70,
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
      key: "visible",
      title: $t("page.sysMenu.table.columns.status"),
      width: 70,
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
      key: "createTime",
      title: $t("page.sysMenu.table.columns.createTime"),
      render: row => formatLocaleDateTime(row.createTime, "picker"),
      width: 130,
      ellipsis: {}
    },
    {
      key: "updateTime",
      title: $t("page.sysMenu.table.columns.updateTime"),
      render: row => h("span", formatLocaleDateTime(row.updateTime, "picker")),
      ellipsis: {}
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 280,
      render: row => (
          <div class="flex flex-center gap-8px justify-end">
            {hasAuth('sys:menu:permission:add') && row?.type == 1 && (
                <NButton type="primary" size="small" onClick={() => handleButtonAuth(row.id)}>
                  {$t('page.sysMenu.button.addChild')}
                </NButton>
            )}
            {hasAuth('sys:role:update') && (
                <NButton type="primary" size="small" onClick={() => edit(row.id)}>
                  {$t('common.edit')}
                </NButton>
            )}
            {hasAuth('sys:role:delete') && (
                <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
                  {{
                    default: () => $t('common.confirmDelete'),
                    trigger: () => (
                        <NButton type="error" size="small">
                          {$t('common.delete')}
                        </NButton>
                    )
                  }}
                </NPopconfirm>
            )}
          </div>
      )
    }
  ]
});
const {
  drawerVisible,
  operateType,
  editingId,
  editingData,
  handleId,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
} =
    useTableOperate(data, getData);

function edit(id: string) {
  handleEdit(id);
}

function handleMenuAuth(id: string) {
  handleId(id);
  openMenuModal();
}

function handleButtonAuth(id: string) {
  handleId(id);
  openButtonModal();
}

//const data = ref(routerStore.menuList);
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
<route lang="json">
{
"meta": {
"i18nKey": "system_menu",
"type": 2,
"title": "菜单管理",
"isMenu": true,
"icon": "application-menu"
}
}
</route>
<style scoped></style>
