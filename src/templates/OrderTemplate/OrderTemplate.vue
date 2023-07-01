<script setup lang="ts">
import { usePartnerConfigStore } from '@/stores/parnerConfigStore';
import VButton from '@/ui/VButton/VButton.vue';
import VProgressBar from '@/ui/VProgressBar/VProgressBar.vue';
const partnerStore = usePartnerConfigStore();

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
          <span class="mt-4 font-semibold text-gray-600">$47,500</span>
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
      class="h-full p-4 w-[500px] shrink-0 bg-white shadow border border-gray-200 rounded-3xl"
    >
      Car image
    </div>
  </div>
</template>
