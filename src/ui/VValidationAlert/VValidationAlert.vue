<script setup lang="ts">
import { mdiAlertBox } from '@mdi/js';
import VIcon from '../VIcon/VIcon.vue';
import type { BaseValidation } from '@vuelidate/core';

interface IProps {
  vuelidate: BaseValidation;
}
defineProps<IProps>();
</script>
<template>
  <div
    v-if="vuelidate.$error"
    class="flex gap-x-2 px-4 py-4 bg-red-100 rounded-xl"
  >
    <VIcon class="fill-red-500" :path="mdiAlertBox" />
    <span class="text-red-500 font-semibold">
      {{ vuelidate.$errors[0].$message }}
    </span>
  </div>
</template>
