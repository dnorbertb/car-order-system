<script setup lang="ts">
import { useOrderStore } from '@/stores/orderDataStore';
import { computed } from 'vue';

interface IProps {
  identifier: string;
  items: Array<{ name: string; href: string }>;
}

const props = defineProps<IProps>();
const orderDataStore = useOrderStore();

const model = computed({
  get() {
    return (orderDataStore.orderData[props.identifier] as string) ?? '';
  },
  set(val: string) {
    orderDataStore.orderData[props.identifier] = val;
  },
});

const colorInputMainStyle =
  'relative appearance-none w-14 h-14 rounded-full cursor-pointer bg-contain shadow-lg bg-center';
const inputActiveStyle =
  'outline outline-3 outline-offset-2 outline-primary-600';
</script>
<template>
  <div>
    <div class="flex gap-x-4">
      <input
        v-for="item in items"
        :class="[colorInputMainStyle, model === item.name && inputActiveStyle]"
        :style="`background-image: url('${item.href}');`"
        :key="item.name"
        :value="item.name"
        v-model="model"
        type="radio"
      />
    </div>
  </div>
</template>
