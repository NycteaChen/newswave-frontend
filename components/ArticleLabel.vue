<template>
  <span class="badge bg-transparent fw-bold">{{ text }}</span>
</template>
<script lang="ts" setup>
interface ArticleLabelProps {
  text: string;
}

withDefaults(defineProps<ArticleLabelProps>(), {
  text: ''
});
</script>
<style lang="scss" scoped>
.badge {
  padding: 5px 10px;
  border: 1px solid $blue-500;
  color: $blue-500;
}
</style>
