<template>
  <ul
    v-if="tabList.length"
    ref="tabsRef"
    class="n-tabs d-flex overflow-x-auto border-bottom"
  >
    <li
      v-for="(item, index) in tabList"
      :key="item.value"
      :ref="
        (el) => {
          tabItemRefs[index] = el;
        }
      "
      class="n-tab-item py-2 px-4 cursor-pointer position-relative whitespace-nowrap"
      :class="{ 'n-tab-item-active text-primary fw-bold': currentTab === item?.label }"
      @click="clickTab(item, index)"
    >
      {{ item.label }}
    </li>
  </ul>
</template>
<script setup lang="ts">
export type TabItemType = {
  label: string;
  value: string;
};

interface NTabsProps {
  tabList: TabItemType[];
}

const props = withDefaults(defineProps<NTabsProps>(), {
  tabList: () => []
});

const emit = defineEmits<{
  (e: 'changeTab', item: TabItemType): void;
}>();

const currentTab = defineModel('currentTab', { type: String, default: '' });

const tabsRef = ref<HTMLUListElement | null>(null);
const tabItemRefs = ref<HTMLUListElement[] | any[]>([]);
const { x } = useScroll(tabsRef);

const slideTabHandler = (index: number) => {
  const tabsWrapperWidth: number = tabsRef.value?.offsetWidth || 0;
  const { offsetLeft = 0, offsetWidth = 0 } = tabItemRefs.value?.[index] || {};
  if (!index) {
    x.value = 0;
  } else if (offsetLeft + offsetWidth >= tabsWrapperWidth) {
    x.value = offsetLeft - (tabItemRefs.value?.[1]?.offsetLeft || 0) * 0.5;
  } else {
    x.value = tabItemRefs.value?.[index - 1]?.offsetLeft || 0;
  }
};

const clickTab: any = (item: TabItemType, index: number): void => {
  slideTabHandler(index);

  currentTab.value = item.label;

  emit('changeTab', item);
};

const nTabs = useEventBus('nTabs');
onMounted(() => {
  nTabs.on(clickTab);
});

watchImmediate(
  () => currentTab.value,
  (newVal, oldVal) => {
    if (!oldVal && newVal) {
      const index = props.tabList.findIndex((e) => e.label === newVal);
      slideTabHandler(index === -1 ? 0 : index);
    }
  }
);
</script>
<style lang="scss" scoped>
.n-tabs {
  scroll-behavior: smooth;
}

.n-tab-item {
  transition: all 0.3s ease-in-out;

  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 4px;
    border-radius: 8px;
    content: '';
    transition: all 0.3s ease-in-out;
    transform: translateX(-50%);
  }

  &-active::after {
    width: 100%;
    background: $primary;
  }
}

@include media-breakpoint-up(md) {
  .n-tab-item:hover {
    color: $primary;
    font-weight: bold;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
