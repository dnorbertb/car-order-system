<script setup lang="ts">
import { computed } from 'vue';
import VRadioSelect from '../../ui/VRadioSelect/VRadioSelect.vue';
import { useOrderStore } from '@/stores/orderDataStore';
import VValidationAlert from '@/ui/VValidationAlert/VValidationAlert.vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { helpers } from '@vuelidate/validators';

interface IProps {
  identifier: string;
  items: Array<{ title: string; description: string; value: string }>;
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

const validation = useVuelidate(
  {
    model: {
      required: helpers.withMessage('This option is required', required),
    },
  },
  {
    model,
  }
);
</script>
<template>
  <div class="flex flex-col gap-y-3">
    <VRadioSelect
      v-for="(item, i) in items"
      :key="'item' + i"
      v-bind="item"
      v-model="model"
      :active="model === item.value"
      :error="validation.model.$error"
    />
    <VValidationAlert :vuelidate="validation.model" />
  </div>
</template>
