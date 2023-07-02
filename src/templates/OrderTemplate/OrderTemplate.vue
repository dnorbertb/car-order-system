<script setup lang="ts">
import { BACKEND_URL } from '@/env';
import { useCartStore } from '@/stores/cartStore';
import { usePartnerConfigStore } from '@/stores/parnerConfigStore';
import VButton from '@/ui/VButton/VButton.vue';
import VProgressBar from '@/ui/VProgressBar/VProgressBar.vue';
const partnerStore = usePartnerConfigStore();
const cartStore = useCartStore();

interface IProps {
  progress: number;
  hideBackButton: boolean;
  nextButtonHandler: () => Promise<void> | void;
  backButtonHandler: () => Promise<void> | void;
}

defineProps<IProps>();
</script>
<template>
  <div class="h-full w-full overflow-hidden flex p-4 gap-x-4 bg-white">
    <div class="w-full px-5">
      <div class="h-full max-w-[500px] mx-auto flex flex-col">
        <div class="flex justify-between">
          <img
            class="w-28 h-auto mb-5"
            :src="partnerStore.partnerData.logo.url"
            :alt="partnerStore.partnerData.logo.alt"
          />
          <span class="mt-4 font-semibold text-gray-600"
            >${{ cartStore.summaryPrice }}</span
          >
        </div>
        <VProgressBar :progress="progress" />
        <div class="flex-1 pt-14">
          <slot>Here will be a content</slot>
        </div>
        <div class="flex justify-between py-4">
          <VButton
            v-if="!hideBackButton"
            @click="backButtonHandler"
            type="button"
            variant="secondary"
          >
            Back
          </VButton>
          <VButton
            @click="nextButtonHandler"
            class="ml-auto"
            type="button"
            variant="primary"
          >
            Next
          </VButton>
        </div>
      </div>
    </div>
    <div
      class="hidden lg:flex items-center h-full p-4 w-[500px] shrink-0 bg-white shadow border border-gray-200 rounded-3xl"
    >
      <img
        class="transition-opacity animate-show w-full h-auto mb-40"
        :src="BACKEND_URL + '/public/model3.png'"
        alt="Car image"
      />
    </div>
  </div>
</template>
