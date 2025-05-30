<template>
  <div class="h-full">
    <div v-if="isBlocked" class="flex flex-col items-center justify-center h-full gap-3">
      <span>此页面无法内嵌显示，请在独立窗口中访问</span>
      <a :href="url" target="_blank" rel="noopener noreferrer" class="btn-primary">在新窗口打开</a>
    </div>
    <iframe
      v-else
      ref="iframeRef"
      :src="url"
      style="height: 100%; width: 100%"
      @load="onIframeLoad"
      @error="onIframeError"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  url: string;
}>();

const iframeRef = ref<HTMLIFrameElement | null>(null);
const isBlocked = ref(false);

const onIframeLoad = () => {
  setTimeout(() => {
    const iframe = iframeRef.value;
    if (!iframe) return;
    try {
      // 尝试获取 iframe 的高度（跨域访问会抛错）
      const frameHeight = iframe.contentWindow?.document.body.scrollHeight;
      if (frameHeight === 0 || frameHeight === undefined) {
        isBlocked.value = true;
      }
    } catch (err) {
      // 如果是跨域导致无法访问，我们无法确认 iframe 是否加载成功
      // 但可能仍然成功显示（例如 YouTube、Google 等）
      isBlocked.value = false; // 仍然允许显示 iframe，不强制替换
    }
  }, 500); // 延迟检查，确保 iframe 内容渲染完成
};

const onIframeError = () => {
  isBlocked.value = true;
};

// props.url 变化时重新检查
watch(
  () => props.url,
  () => {
    isBlocked.value = false;
  }
);
</script>
