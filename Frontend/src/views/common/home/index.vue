<template>
  <div class="container">
    <h2>动态圆角调整案例</h2>

    <div class="controls">
      <div class="control-group">
        <label>外层圆角: {{ outerRadius }}px</label>
        <input v-model="outerRadius" type="range" min="0" max="50" @input="updateInnerRadius" />
      </div>

      <div class="control-group">
        <label>内边距: {{ padding }}px</label>
        <input v-model="padding" type="range" min="0" max="30" @input="updateInnerRadius" />
      </div>

      <div class="control-group">
        <label>内层圆角: {{ innerRadius }}px</label>
        <span>(自动计算)</span>
      </div>
    </div>

    <!-- 外层容器 -->
    <div
      class="outer-box"
      :style="{
        'border-radius': `${outerRadius}px`,
        padding: `${padding}px`
      }">
      <!-- 内层容器 -->
      <div
        class="inner-box"
        :style="{
          'border-radius': `${innerRadius}px`,
          height: `calc(200px - ${padding * 2}px)` // 关键调整
        }">
        内容区域
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// 外层圆角半径
const outerRadius = ref(20);
// 内边距
const padding = ref(10);
// 内层圆角半径（根据公式自动计算）
const innerRadius = ref(10);

// 计算内层圆角的函数
const calculateInnerRadius = () => {
  // 核心公式：内圆角 = 外圆角 - 内边距（不小于0）
  return Math.max(0, outerRadius.value - padding.value);
};

// 更新内层圆角
const updateInnerRadius = () => {
  innerRadius.value = calculateInnerRadius();
};

// 初始化计算
updateInnerRadius();
</script>
<route lang="json">
{
  "meta": {
    "layout": "base",
    "icon": "application-menu"
  }
}
</route>
<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: red;
}

.controls {
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.control-group {
  margin-bottom: 10px;
}

.control-group label {
  display: inline-block;
  width: 120px;
  font-weight: bold;
}

input[type="range"] {
  width: 200px;
  vertical-align: middle;
}

.outer-box {
  background: #e3f2fd;
  min-height: 200px;
  transition: all 0.3s ease;
}

.inner-box {
  background: #bbdefb;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: all 0.3s ease;
}

.sibling-box {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #90caf9;
  padding: 8px 12px;
  border-radius: inherit; /* 继承父容器圆角 */
}
</style>
