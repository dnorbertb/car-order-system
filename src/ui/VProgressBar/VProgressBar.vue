<script setup lang="ts">
interface IProps {
  progress: number;
}

defineProps<IProps>();
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="relative bg-gray-300 h-1 w-full rounded-lg overflow-hidden">
      <div
        :style="`transform:translate(${progress}%)`"
        class="absolute -left-full bg-black h-1 w-full rounded-lg transition-transform duration-700"
      >
        &nbsp;
      </div>
    </div>
    <p class="text-center text-sm font-semibold text-gray-400 mt-1">
      {{ progress }}%
    </p>
  </div>
</template>
