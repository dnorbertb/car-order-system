<script setup lang="ts">
interface IProps {
  title: string;
  items: string[];
}

defineProps<IProps>();
</script>
<template>
  <div class="p-5 border rounded-xl border-gray-200">
    <h5 class="font-medium text-lg mb-2">{{ title }}</h5>
    <ul class="list-inside list-disc text-gray-700 text-base">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>
