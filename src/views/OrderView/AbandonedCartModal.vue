<script setup lang="ts">
import HeadingComponent from '@/components/HeadingComponent/HeadingComponent.vue';
import VButton from '@/ui/VButton/VButton.vue';
import VModal from '@/ui/VModal/VModal.vue';
import { ref } from 'vue';

const modal = ref<InstanceType<typeof VModal>>();
let resolveFn: (value: boolean | PromiseLike<boolean>) => void;

const buttonsHandler = (decision: boolean) => {
  resolveFn(decision);
  modal.value?.close();
};

const getUserDecision = async () => {
  if (!modal.value) return undefined;
  modal.value.open();
  return new Promise<boolean>((resolve) => {
    resolveFn = resolve;
  });
};

defineExpose({
  getUserDecision,
});
</script>
<template>
  <VModal
    :close-button-visible="false"
    :overlay-closes-modal="false"
    ref="modal"
  >
    <div class="px-10">
      <HeadingComponent
        class="mb-16"
        title="We found unfinished order."
        description="Do you want to restore previous order data?"
      />
      <div class="flex gap-x-4">
        <VButton
          class="flex-1"
          variant="secondary"
          @click="() => buttonsHandler(false)"
        >
          No
        </VButton>
        <VButton class="flex-1" @click="() => buttonsHandler(true)">
          Yes
        </VButton>
      </div>
    </div>
  </VModal>
</template>
