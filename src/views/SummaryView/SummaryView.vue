<script setup lang="ts">
import { orderService } from '@/services/orderService';
import { useCartStore } from '@/stores/cartStore';
import VButton from '@/ui/VButton/VButton.vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const deleteProcessCookie = (id: string) => {
  const expirationDate = new Date(new Date().getTime() - 1).toUTCString();
  document.cookie = `cartId=${id};expires=${expirationDate};sameSite=strict;path=/;`;
};

const placeOrderHandler = async (paymentSuccessful: boolean) => {
  const cartId = route.query.cart as string;
  await orderService.add(cartId, paymentSuccessful);
  deleteProcessCookie(cartId);
  router.push({
    name: 'ThankYouView',
    query: route.query,
  });
};

onMounted(() => {
  const cartId = route.query.cart;
  if (!cartId || cartStore.choosenProducts.length < 1) {
    router.push({
      name: 'MainRoute',
    });
  }
});
</script>
<template>
  <main
    class="w-full h-full bg-gray-50 flex justify-center items-center overflow-hidden"
  >
    <div
      class="flex flex-col bg-white p-10 h-full w-full md:max-w-[500px] md:max-h-[600px] md:rounded-xl shadow overflow-hidden"
    >
      <div class="flex flex-col flex-1 mb-4 overflow-hidden">
        <h1 class="mb-5 font-semibold text-xl">Place Order</h1>
        <ul
          class="flex-1 mb-4 h-full shadow border border-gray-200 rounded-xl overflow-y-auto overflow-x-hidden"
        >
          <li
            v-for="item in cartStore.choosenProducts"
            :key="item.id"
            class="bg-white p-4 border-b border-gray-200 flex justify-between"
          >
            <span class="font-semibold"> {{ item.name }} </span>
            <span class="font-semibold text-green-500">
              {{ item.pricing === 0 ? 'Free' : '$' + item.pricing }}
            </span>
          </li>
        </ul>
        <div class="flex justify-between">
          <span class="font-semibold text-lg text-gray-500">Total</span>
          <span class="font-semibold text-lg">
            ${{ cartStore.summaryPrice }}
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <VButton @click="() => placeOrderHandler(true)" class="flex-1">
          Succesfull Payment
        </VButton>
        <VButton @click="() => placeOrderHandler(false)" class="flex-1">
          Unsuccesfull Payment
        </VButton>
      </div>
    </div>
  </main>
</template>
