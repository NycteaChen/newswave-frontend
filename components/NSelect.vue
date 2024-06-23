<template>
  <select
    :id="id"
    v-model="selected"
    class="form-select n-select"
    required
  >
    <option
      value=""
      disabled
      selected
      hidden
    >
      {{ placeholder }}
    </option>
    <option
      v-for="item in options"
      :key="item.value"
      :value="item.value"
    >
      {{ item.label }}
    </option>
  </select>
</template>
<script lang="ts" setup>
interface OptionType {
  label: string;
  value: string;
}

export interface NSelectProps {
  id?: string;
  options: OptionType[];
  placeholder?: string;
}

withDefaults(defineProps<NSelectProps>(), {
  id: 'nSelect',
  placeholder: '請選擇'
});

const selected = defineModel('selected', { type: String, required: true, default: '' });
</script>
<style lang="scss" scoped>
.n-select:invalid {
  color: $text-muted;
}
</style>
