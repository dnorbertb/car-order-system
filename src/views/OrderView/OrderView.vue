<script setup lang="ts">
// Template
import OrderTemplate from '@/templates/OrderTemplate/OrderTemplate.vue';

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
// import { useProcessDataStorageHandling } from './core/processDataStorageHandling';

// Logic
const { subscribe, callSubscribers, cleanSubscribers } = useSubscribers();
// const { saveProcessData, restoreProcessData, initializeDataLocalStorage } =
// useProcessDataStorageHandling();
const processRoutingStore = useProcessRoutingStore();
const form = ref<InstanceType<typeof HTMLFormElement>>();
const route = useRoute();
const router = useRouter();
const processStore = useProcessConfigStore();
const validation = useVuelidate();

const pageSubmitHandler = () => {
  validation.value.$validate();
  if (validation.value.$error) return;
  callSubscribers('next');
  processRoutingStore.goForward();
  const cartId = route.query.cart as string;
  if (!cartId) return;
  // saveProcessData(cartId);
};

const backButtonHandler = () => {
  validation.value.$validate();
  if (validation.value.$error) return;
  callSubscribers('back');
  processRoutingStore.goBack();
  const cartId = route.query.cart as string;
  if (!cartId) return;
  // saveProcessData(cartId);
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
  // const cartId = route.query.cart as string;
  // if (cartId) {
  //   restoreProcessData(cartId);
  // } else {
  //   initializeDataLocalStorage();
  // }
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
  </OrderTemplate>
</template>
