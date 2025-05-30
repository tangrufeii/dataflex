<template>
  <AdminLayout>
    <template #sider>
      <BaseLayoutSider />
    </template>
    <template #header>
      <BaseLayoutHeader />
    </template>
    <template #content>
      <BaseLayoutContent />
    </template>
  </AdminLayout>
</template>

<script lang="ts" setup>
import BaseLayoutContent from "@/layoutCore/base/content/index.vue";
import BaseLayoutSider from "@/layoutCore/base/sider/index.vue";
import BaseLayoutHeader from "@/layoutCore/base/header/index.vue";
import AdminLayout from "@/layoutCore/base/admin/index.vue";
</script>
<style scoped></style>
