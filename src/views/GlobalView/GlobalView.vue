<script setup lang="ts">
import { usePartnerConfigStore } from '@/stores/parnerConfigStore';
import { setColorPalette } from '@/utils/setColorPalette';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const parnerStore = usePartnerConfigStore();
const isLoading = ref(true);

onMounted(async () => {
  const { brand } = route.params as {
    brand: string;
  };
  const parnerData = await parnerStore.loadPartnerData(brand);
  if (!parnerData) router.push({ name: 'NotFoundView' });
  setColorPalette(parnerData.accent_color);
  isLoading.value = false;
});
</script>
<template>
  <span v-if="isLoading">Loading...</span>
  <router-view v-else />
</template>
