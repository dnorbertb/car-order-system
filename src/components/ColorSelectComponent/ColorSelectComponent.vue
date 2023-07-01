<script setup lang="ts">
import { useOrderStore } from '@/stores/orderDataStore';
import VValidationAlert from '@/ui/VValidationAlert/VValidationAlert.vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
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
  <div>
    <div class="flex gap-x-4 mb-5">
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
    <VValidationAlert :vuelidate="validation.model" />
  </div>
</template>
