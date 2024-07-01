<template>
  <nav class="n-tabs-container border-bottom w-100 position-relative">
    <ul
      v-if="tabList.length"
      ref="tabsRef"
      class="n-tabs d-flex overflow-x-auto w-100"
    >
      <li
        v-for="(item, index) in tabList"
        :key="item.value"
        :ref="
          (el) => {
            tabItemRefs[index] = el;
          }
        "
        class="n-tab-item py-2 px-4 cursor-pointer position-relative whitespace-nowrap text-center"
        :class="{ 'n-tab-item-active text-primary fw-bold': currentTab === item[keyField] }"
        @click="clickTab(item, index)"
      >
        {{ item.label }}
        <notice-badge v-if="item.badge === 'notice'" />
        <span
          v-else-if="item.badge"
          class="tab-badge"
          >{{ item.badge }}
        </span>
      </li>
    </ul>
    <div
      class="slide-hint position-absolute end-0 top-0 d-md-none"
      :class="arrivedState.right ? 'opacity-0 z-minus' : 'opacity-100'"
    >
      <svg-icon
        name="arrow"
        class="slide-hint-icon"
      />
    </div>
  </nav>
</template>
<script setup lang="ts">
export type TabItemType = {
  label: string;
  value: string;
  badge?: string;
};

interface NTabsProps {
  tabList: TabItemType[];
  /*
   * currentTab 要比較的欄位，參照 TabItemType 內的欄位
   */
  keyField?: 'label' | 'value';
}

const props = withDefaults(defineProps<NTabsProps>(), {
  tabList: () => [],
  keyField: 'label'
});

const emit = defineEmits<{
  (e: 'changeTab', item: TabItemType): void;
}>();

const currentTab = defineModel('currentTab', { type: String, default: '' });

const tabsRef = ref<HTMLElement | null>(null);
const tabItemRefs = ref<HTMLElement[] | any[]>([]);
const { x, arrivedState } = useScroll(tabsRef);

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
  if (currentTab.value === item[props.keyField]) return;

  slideTabHandler(index);

  currentTab.value = item[props.keyField];

  emit('changeTab', item);
};

const nTabsBus = useEventBus('nTabsBus');
onMounted(() => {
  nTabsBus.on(clickTab);
});

const initTabHandler = () => {
  const index = props.tabList.findIndex((e) => e[props.keyField] === currentTab.value);
  slideTabHandler(index === -1 ? 0 : index);
};

onMounted(async () => {
  await nextTick(() => {
    initTabHandler();
  });
});

watch(
  () => currentTab.value,
  async () => {
    await nextTick(() => {
      initTabHandler();
    });
  }
);
</script>
<style lang="scss" scoped>
.n-tabs {
  scroll-behavior: smooth;
}

@keyframes opacity-frames {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.n-tab-item {
  transition: all 0.3s ease-in-out;

  .tab-badge {
    position: absolute;
    top: 0;
    right: 1px;
    padding: 1px 2px;
    border-radius: $border-radius-sm;
    background: $green;
    color: $gray-100;
    font-size: 10px;
    animation: opacity-frames 1.5s ease-in-out infinite;
  }

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
  .n-tab-item:not(.n-tab-item-active):hover {
    border-radius: $border-radius $border-radius 0 0;
    background: $blue-100;
    color: $primary;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

.slide-hint {
  padding: 8px 15px;
  background: linear-gradient(90deg, transparent 0%, $body-bg 25%, $blue-100 100%);
  transition: opacity 0.3s ease-in-out;

  &-icon {
    width: 16px;
    height: 16px;
    transform: rotate(90deg);
    fill: $blue-300;
  }
}
</style>
