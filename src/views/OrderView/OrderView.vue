<script setup lang="ts">
// Template
import OrderTemplate from '@/templates/OrderTemplate/OrderTemplate.vue';
import VIcon from '@/ui/VIcon/VIcon.vue';
import AbandonedCartModal from './AbandonedCartModal.vue';

// App
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';

// Components and Controllers
import { components } from '@/components';
import { controllers } from '@/controllers';

// Stores
import { useProcessConfigStore } from '@/stores/processConfigStore';
import { useSubscribers } from './core/useSubscribers';
import { useProcessRoutingStore } from './core/processRoutingStore';

// Composables
import { useProcessDataHandling } from './core/processDataHandling';
import { mdiLoading } from '@mdi/js';

// Logic
const form = ref<InstanceType<typeof HTMLFormElement>>();
const modal = ref<InstanceType<typeof AbandonedCartModal>>();
const { subscribe, callSubscribers, cleanSubscribers } = useSubscribers();
const { saveProcessData, initializeOrderMonitoring } =
  useProcessDataHandling(modal);
const processRoutingStore = useProcessRoutingStore();
const route = useRoute();
const router = useRouter();
const processStore = useProcessConfigStore();
const validation = useVuelidate();
const isLoading = ref(true);

const pageSubmitHandler = () => {
  validation.value.$validate();
  if (validation.value.$error) return;
  callSubscribers('next');
  processRoutingStore.goForward();
  saveProcessData();
  return;
};

const backButtonHandler = () => {
  validation.value.$validate();
  if (validation.value.$error) return;
  callSubscribers('back');
  processRoutingStore.goBack();
  saveProcessData();
  return;
};

const submitFormOnEnterHit = (e: KeyboardEvent) => {
  if (e.key.toLowerCase() === 'enter') {
    pageSubmitHandler();
  }
};

onMounted(async () => {
  cleanSubscribers();
  const controllerId = route.params.product as string;
  const controllerLoader = controllers[controllerId];
  if (!controllerLoader) return router.push({ name: 'NotFound' });
  const controller = await controllerLoader();
  await processStore.fetchConfig(controller.loader);
  processRoutingStore.startRouting(controller);
  await initializeOrderMonitoring();
  isLoading.value = false;
});
</script>
<template>
  <OrderTemplate
    :progress="processRoutingStore.progress"
    :hide-back-button="processRoutingStore.isFirstPage"
    :next-button-handler="pageSubmitHandler"
    :back-button-handler="backButtonHandler"
  >
    <form
      v-if="!isLoading"
      class="flex flex-col gap-y-4"
      ref="form"
      @submit.prevent="pageSubmitHandler"
      @keypress="submitFormOnEnterHit"
    >
      <component
        v-for="(c, i) in processRoutingStore.currentPage.components"
        :key="processRoutingStore.currentPage.name + i"
        :is="components[c.name]"
        v-bind="c.props"
        @subscribe="subscribe"
      />
    </form>
    <div v-else class="w-full h-full flex items-center justify-center">
      <VIcon
        class="w-16 h-16 fill-primary-700 animate-spin mb-20"
        :path="mdiLoading"
      />
    </div>
    <AbandonedCartModal ref="modal" />
  </OrderTemplate>
</template>
