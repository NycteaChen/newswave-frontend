<template>
  <div class="n-radio-group rounded-1 d-flex p-1 gap-2">
    <label
      v-for="(item, index) in options"
      :key="item.value"
      class="position-relative z-2 n-radio fs-sm text-center py-1 px-3 cursor-pointer rounded-1"
      :style="!index ? { '--index': activeIndex } : ''"
      :class="{
        'first-option': !index,
        'n-radio-active': item.value === checked
      }"
    >
      <input
        :id="`${item.value}`"
        v-model="checked"
        :name="`${item.value}`"
        class="d-none"
        type="radio"
        :value="item.value"
        autocomplete="off"
      />
      <span
        class="n-radio-label position-relative z-2"
        :class="item.value === checked ? 'text-body-white' : 'text-primary'"
      >
        <slot
          v-if="slots.label"
          name="label"
          :item="item"
        />
        <template v-else>
          {{ item.label }}
        </template>
      </span>
    </label>
  </div>
</template>
<script setup lang="ts">
type RadioItemProps = {
  label: string;
  value: string | number;
};

interface NRadioProps {
  options?: RadioItemProps[];
}

const slots = useSlots();

const checked = defineModel('checked', { type: String || Number, default: '', required: true });

const props = withDefaults(defineProps<NRadioProps>(), {
  options: () => []
});

const activeIndex = computed(() => {
  const index = props.options.findIndex((e) => e.value === checked.value);
  return index === -1 ? 0 : index;
});
</script>
<style lang="scss" scoped>
.n-radio-group {
  border: 1px solid $primary;
}

%transition {
  transition: all 0.3s ease-in-out;
}

.n-radio,
.n-radio-label {
  @extend %transition;
}

.n-radio {
  flex: 1 1 0;
}

@include media-breakpoint-up(md) {
  .n-radio {
    &:not(.n-radio-active):hover {
      background: $blue-100;
    }
  }
}

.first-option::after {
  @extend %transition;

  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: $border-radius-sm;
  background-color: $primary;
  content: '';
  transform: translate(calc(-50% + (100% + 8px) * var(--index)), -50%);
}
</style>
