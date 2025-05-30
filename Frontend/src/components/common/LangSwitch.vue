<template>
  <NDropdown :options="langOptions" :value="lang" trigger="click" @select="changeLang">
    <div>
      <ButtonIcon
        :icon="'translate'"
        :tooltip-content="tooltipContent"
        :tooltip-placement="'left'"
        :size="24" />
    </div>
  </NDropdown>
</template>

<script lang="ts" setup>
import { computed, h } from "vue";
import { $t } from "@/locales";
import { Translate } from "@icon-park/vue-next";
import { useAppStore } from "@/stores/modules/app";
import { NIcon } from "naive-ui";
import ButtonIcon from "@/components/custom/ButtonIcon.vue";
const appStore = useAppStore();
defineOptions({
  name: "LangSwitch"
});

interface Props {
  /** Current language */
  lang: App.I18n.LangType;
  /** Language options */
  langOptions: App.I18n.LangOption[];
  /** Show tooltip */
  showTooltip?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true
});

type Emits = {
  (e: "changeLang", lang: App.I18n.LangType): void;
};

const emit = defineEmits<Emits>();

const tooltipContent = computed(() => {
  return $t("icon.lang");
});

function changeLang(lang) {
  appStore.changeLocale(lang);
}
</script>
<style scoped></style>
