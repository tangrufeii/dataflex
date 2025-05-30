<template>
  <div class="fullscreen-bg">
    <n-image
      class="bg-image"
      :src="BackImg"
      preview-disabled
      :img-props="{
        style: {
          'object-fit': 'cover',
          width: '100%',
          height: '100%',
          filter: 'contrast(1.1) brightness(0.95)',
          'mix-blend-mode': 'multiply'
        }
      }" />
  </div>
</template>
<script setup lang="ts">
import BackImg from "@/assets/login.png";
</script>
<route lang="yaml">
meta:
  layout: blank
</route>
<style scoped>
.fullscreen-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 关键：确保图片拉伸填充 */
}
</style>
