<script setup lang="ts">
import { mdiStar } from '@mdi/js';
import VIcon from '../VIcon/VIcon.vue';

interface IProps {
  modelValue: string;
  value: string;
  active: boolean;
  title: string;
  error?: boolean;
  description?: string;
  recomennded?: boolean;
}

defineProps<IProps>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>
<template>
  <div
    @click="() => emit('update:modelValue', value)"
    :class="[
      `
    relative
    grid 
    grid-cols-[min-content_1fr] 
    auto-rows-min
    gap-x-3 
    gap-y-1 
    items-start 
    p-5 
    rounded-xl
    shadow-sm 
    border
    border-gray-400 
    outline-8 
    outline-gray-100
    hover:outline 
    active:border-primary-700
    active:outline-primary-25
    active:bg-primary-25
    transition
    cursor-pointer 
    group`,
      active &&
        `border-primary-700 bg-primary-25 outline-primary-25 border-2 p-[19px]`,
      error && 'border-red-500',
    ]"
  >
    <VIcon
      v-if="recomennded"
      class="absolute right-1 top-1 h-6 w-6 fill-primary-700"
      :path="mdiStar"
    />
    <div
      :class="[
        `
        rounded-full 
        h-5 w-5 p-1 
        flex 
        items-center 
        justify-center 
        group-hover:outline 
        outline-4 
        outline-inherit 
        border 
        `,
        error ? 'border-red-500' : 'border-inherit',
      ]"
    >
      <input
        type="radio"
        :class="[
          'appearance-none w-full h-full rounded-full scale-0 focus:scale-100 transition',
          active ? `scale-100 bg-primary-700` : `bg-primary-200`,
        ]"
      />
    </div>
    <p class="block -mt-1 text-lg font-semibold">{{ title }}</p>
    <p v-if="description" class="col-start-2 font-medium text-sm text-gray-700">
      {{ description }}
    </p>
  </div>
</template>
