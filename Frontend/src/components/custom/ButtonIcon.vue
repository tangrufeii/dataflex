<template>
  <NTooltip :disabled="!tooltipContent" :placement="tooltipPlacement" :z-index="zIndex">
    <template #trigger>
      <NButton quaternary v-bind="$attrs" style="height: 36px">
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px">
          <slot>
            <SVGIcon :class="className" :icon="icon" :size="size" />
          </slot>
        </div>
      </NButton>
    </template>
    {{ tooltipContent }}
  </NTooltip>
</template>

<script lang="ts" setup>
import type { PopoverPlacement } from "naive-ui";
import SVGIcon from "@/components/custom/SVGIcon.vue";

defineOptions({
  name: "ButtonIcon",
  inheritAttrs: false
});

interface Props {
  /** Button class */
  className?: string;
  /** IconPark icon name */
  icon?: string;
  /** Tooltip content */
  tooltipContent?: string;
  /** Tooltip placement */
  tooltipPlacement?: PopoverPlacement;
  zIndex?: number;
  size?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  className: "",
  icon: "",
  tooltipContent: "",
  tooltipPlacement: "bottom",
  zIndex: 98,
  size: 24
});
</script>

<style scoped></style>
