<script setup lang="ts">
interface IProps {
  title: string;
  description?: string;
}
defineProps<IProps>();
</script>
<template>
  <section class="mb-3">
    <h1 class="text-3xl font-semibold mb-1">{{ title }}</h1>
    <p v-if="description" class="text-gray-500 font-medium">
      {{ description }}
    </p>
  </section>
</template>
