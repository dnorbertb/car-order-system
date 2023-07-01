<script setup lang="ts">
interface IProps {
  type: 'button' | 'submit' | 'reset';
  variant: IButtonVariant;
}
withDefaults(defineProps<IProps>(), { type: 'button', variant: 'primary' });

type IButtonVariant = 'primary' | 'secondary' | 'tertiary';

const variants: Record<IButtonVariant, string> = {
  primary: 'px-6 py-2 bg-primary-500 text-white shadow-sm hover:shadow-md',
  secondary:
    'px-6 py-2 bg-white text-black border border-gray-100 shadow-sm hover:shadow-md',
  tertiary: 'bg-transparent px-0 py-0 text-primary-600',
};
</script>
<template>
  <button
    :class="[
      variants[variant],
      'rounded-md font-semibold active:scale-95 transition-transform',
    ]"
    :type="type"
  >
    <slot />
  </button>
</template>
