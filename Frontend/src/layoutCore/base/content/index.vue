<template>
  <!-- 路由组件,为了在布局中渲染真实路由组件 -->
  <RouterView v-slot="{ Component, route }">
    <!-- 过渡动画组件 用来渲染路由过渡效果    -->
    <Transition mode="out-in">
      <!--   缓存组件用于缓存当前页面       -->
      <KeepAlive>
        <Component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
<script setup lang="ts">
defineOptions({
  name: "BaseLayoutContent"
});
</script>
<style scoped></style>
