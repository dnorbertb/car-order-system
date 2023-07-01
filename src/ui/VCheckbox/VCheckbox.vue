<script setup lang="ts">
interface IProps {
  id: string;
  label: string;
  modelValue: boolean;
}

defineProps<IProps>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>
<template>
  <div class="flex items-center">
    <input
      class="appearance-none mr-2 bg-transparent h-5 w-5 border-2 border-primary-600 rounded-md cursor-pointer checked:bg-primary-600 transition-colors checked:bg-checkbox-icon bg-center bg-cover"
      :id="id"
      type="checkbox"
      :checked="modelValue"
      @input="(e) => emit('update:modelValue',
    (e.target as HTMLInputElement).checked)"
    />
    <label :for="id" class="font-semibold text-gray-600 cursor-pointer">
      {{ label }}
    </label>
  </div>
</template>
