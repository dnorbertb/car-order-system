<script setup lang="ts">
import { ref } from 'vue';
import VIcon from '@/ui/VIcon/VIcon.vue';
import { mdiClose } from '@mdi/js';
const modalVisible = ref(false);

interface IProps {
  overlayClosesModal?: boolean;
  closeButtonVisible?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  overlayClosesModal: true,
  closeButtonVisible: true,
});

const open = () => (modalVisible.value = true);
const close = () => (modalVisible.value = false);
const closeByOverlay = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (props.overlayClosesModal && target.dataset.elementName === 'wrapper') {
    modalVisible.value = false;
  }

  return;
};

defineExpose({
  close,
  open,
});
</script>
<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="modalVisible"
        class="absolute top-0 left-0 w-screen h-screen bg-gray-900 opacity-70 z-50"
      >
        &nbsp;
      </div>
    </Transition>
    <Transition name="modal">
      <div
        v-if="modalVisible"
        @click="(e: MouseEvent) => closeByOverlay(e)"
        data-element-name="wrapper"
        class="absolute top-0 left-0 w-full h-full grid overflow-hidden z-50"
      >
        <div
          class="mb-0 sm:mb-auto m-auto relative flex min-w-[120px] max-w-[640px] max-h-[700px] sm:max-h-[610px] pt-16 pb-4 sm:py-[72px] bg-white rounded-t-md sm:rounded-md overflow-hidden"
        >
          <button
            v-if="closeButtonVisible"
            class="absolute top-5 sm:top-6 right-6 p-2 rounded-xl hover:bg-gray-200 cursor-pointer"
            @click="close"
          >
            <VIcon class="fill-gray-700" :path="mdiClose" />
          </button>
          <slot> </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-enter-to {
  opacity: 0.7;
}

.modal-enter-active,
.modal-leave-active {
  transition: transform 0.6s ease;
}

.modal-enter-from,
.modal-leave-to {
  transform: translateY(100%);
}
</style>
