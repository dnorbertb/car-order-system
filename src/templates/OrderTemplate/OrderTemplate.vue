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
  <div class="h-full w-full overflow-hidden flex gap-x-4 bg-white">
    <div class="w-full px-1 md:px-5 overflow-hidden">
      <div class="h-full max-w-[500px] mx-auto flex flex-col overflow-hidden">
        <div class="flex justify-between px-3 md:px-5 md:pt-5">
          <img
            class="w-28 h-auto mb-1 md:mb-5"
            :src="partnerStore.partnerData.logo.url"
            :alt="partnerStore.partnerData.logo.alt"
          />
          <span class="mt-4 font-semibold text-gray-600"
            >${{ cartStore.summaryPrice }}</span
          >
        </div>
        <VProgressBar class="px-3 md:px-5" :progress="progress" />
        <div
          class="flex-1 pt-4 md:pt-14 pb-4 overflow-x-hidden overflow-y-auto"
        >
          <slot>Here will be a content</slot>
        </div>
        <div class="flex justify-between py-4 border-t border-t-gray-200">
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
    <div class="hidden lg:block h-full p-4 w-[500px] shrink-0">
      <div
        class="h-full w-full flex items-center bg-white shadow border border-gray-200 rounded-3xl"
      >
        <img
          class="transition-opacity animate-show w-full h-auto mb-40"
          :src="BACKEND_URL + '/public/model3.png'"
          alt="Car image"
        />
      </div>
    </div>
  </div>
</template>
