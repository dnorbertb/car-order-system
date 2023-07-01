<script setup lang="ts">
import { useOrderStore } from '@/stores/orderDataStore';
import VRadioSelect from '@/ui/VRadioSelect/VRadioSelect.vue';
import VValidationAlert from '@/ui/VValidationAlert/VValidationAlert.vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { computed } from 'vue';
interface IProps {
  identifier: string;
  optionOne: {
    value: string;
    title: string;
    description: string;
    recomennded?: boolean;
  };
  optionTwo: {
    value: string;
    title: string;
    description: string;
    recomennded?: boolean;
  };
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
  <div class="grid grid-cols-2 gap-x-2 gap-y-3">
    <VRadioSelect
      v-model="model"
      v-bind="optionOne"
      :active="model === optionOne.value"
      :error="validation.$error"
    />
    <VRadioSelect
      v-model="model"
      v-bind="optionTwo"
      :active="model === optionTwo.value"
      :error="validation.$error"
    />
    <VValidationAlert class="col-span-2" :vuelidate="validation.model" />
  </div>
</template>
