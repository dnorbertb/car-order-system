<script setup lang="ts">
import VCheckbox from '@/ui/VCheckbox/VCheckbox.vue';
import { useOrderStore } from '@/stores/orderDataStore';
import { computed } from 'vue';

interface IProps {
  identifier: string;
  label: string;
}

const props = defineProps<IProps>();

const model = computed({
  get() {
    return (orderDataStore.orderData[props.identifier] as boolean) ?? false;
  },
  set(value: boolean) {
    orderDataStore.orderData[props.identifier] = value;
  },
});

const orderDataStore = useOrderStore();
</script>
<template>
  <VCheckbox :id="identifier" v-model="model" :label="label" />
</template>
