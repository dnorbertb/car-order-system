<script setup lang="ts">
import OrderCheckbox from './OrderCheckbox.vue';

interface IProps {
  identifier: string;
  items: Array<{ title: string; value: string }>;
}

defineProps<IProps>();
</script>
<template>
  <div class="flex flex-col gap-y-4">
    <OrderCheckbox
      v-for="item in items"
      :label="item.title"
      :identifier="identifier + item.value"
    />
  </div>
</template>
