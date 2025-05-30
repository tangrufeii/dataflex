<template>
  <ButtonIcon
    :key="String(full)"
    :tooltip-content="full ? $t('icon.fullscreenExit') : $t('icon.fullscreen')"
    :icon="full ? 'full-screen-one' : 'off-screen'"
    :size="24" />
</template>

<script setup lang="ts">
import { $t } from "@/locales";
import ButtonIcon from "@/components/custom/ButtonIcon.vue";
import SVGIcon from "@/components/custom/SVGIcon.vue";

defineOptions({
  name: "FullScreen"
});

interface Props {
  full?: boolean;
}

defineProps<Props>();
</script>

<style scoped></style>
