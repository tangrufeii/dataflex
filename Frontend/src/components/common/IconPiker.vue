<template>
  <!-- 图标选择器弹窗 -->
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 80%; max-width: 400px"
    title="选择图标">
    <div class="icon-selector-container">
      <!-- 搜索栏 -->
      <n-input
        v-model:value="searchText"
        clearable
        placeholder="搜索图标（支持中文/英文）"
        round
        @input="handleSearch">
        <template #prefix>
          <n-icon :component="Search" />
        </template>
      </n-input>
      <!-- 图标展示区 -->
      <n-virtual-list :item-size="42" :items="filteredIcons">
        <template #default="{ item, index }">
          <n-space justify="space-between">
            <div v-for="icon in item">
              <div
                :class="{ 'icon-item-active': selectedIcon?.name === icon.name }"
                class="icon-item"
                @click="handleSelect(icon)">
                <n-icon :size="28">
                  <component :is="getIconComponent(icon.name)" />
                </n-icon>
              </div>
            </div>
          </n-space>
        </template>
      </n-virtual-list>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import { NModal, NInput, NIcon, NGrid, NGi, NPagination, NTag, NSpace, NEllipsis } from "naive-ui";
import { Search } from "@icon-park/vue-next";
import setting from "@icon-park/vue-next/icons.json";

// 图标数据预处理
interface IconData {
  id: number;
  name: string;
  title: string;
  category: string;
  categoryCN: string;
  tags: string[];
}

const iconList = ref<IconData[]>([]);

// 动态加载图标组件
const getIconComponent = (name: string) => {
  return "icon-" + name;
};

// 初始化图标数据
onMounted(() => {
  iconList.value = setting.map(item => ({
    id: item.id,
    name: item.name,
    title: item.title,
    category: item.categoryCN || item.category,
    tags: item.tags || []
  }));
});

// 搜索与过滤
const searchText = ref("");

const filteredIcons = computed(() => {
  let result = [...iconList.value];
  // 关键词搜索（支持中文/英文/拼音首字母）
  if (searchText.value) {
    const kw = searchText.value.toLowerCase();
    result = result.filter(
      icon =>
        icon.title.includes(kw) ||
        icon.name.toLowerCase().includes(kw) ||
        icon.tags.some(tag => tag.includes(kw))
    );
  }
  return chunkList(result, 5);
});
//数组分组为二维数组
function chunkList(list: Array, chunk: number) {
  let len = list.length;
  let newList = [];
  if (len) {
    for (let i = 0, j = len; i < j; i += chunk) {
      newList.push(list.slice(i, i + chunk));
    }
  }
  return newList;
}

// 选择处理
const selectedIcon = ref<IconData | null>(null);
const showModal = ref(true);

const handleSelect = (icon: IconData) => {
  selectedIcon.value = icon;
  emit("select", icon.name);
  showModal.value = false;
};

// 暴露方法
const open = () => {
  showModal.value = true;
};

defineExpose({ open });

const emit = defineEmits(["select"]);
</script>

<style scoped>
.icon-selector-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 70vh;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: pink;
    transform: scale(1.1);
  }
}

.icon-item-active {
  background-color: var(--n-color-active);
  box-shadow: 0 0 0 2px pink;
}
</style>
