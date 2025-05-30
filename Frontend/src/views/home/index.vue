<template>
  <div>123333333321</div>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { router } from "@/router";
import { getMenuList, type SysMenu } from "@/api/methods/router.ts";
import type { ResponseData } from "@/api";
getMenuList().then((menuList: ResponseData<SysMenu[]>) => {
  console.error("menuList", menuList);
});
</script>

<style scoped></style>
