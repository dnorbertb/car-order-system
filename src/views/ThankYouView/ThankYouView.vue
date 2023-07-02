<script setup lang="ts">
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent.vue';
import { orderService } from '@/services/orderService';
import { useCartStore } from '@/stores/cartStore';
import type { IOrderData } from '@/types/IOrderData';
import VButton from '@/ui/VButton/VButton.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const orderData = ref<IOrderData>();
const isLoading = ref(true);

const placeOrderHandler = (paymentSuccessfull: boolean) => {
  const cartId = route.query.cart as string;
  orderService.add(cartId, paymentSuccessfull);
  if (!orderData.value) return;
  orderData.value.paymentSuccessfull = true;
};

onMounted(async () => {
  const cartId = route.query.cart;
  const data = await orderService.get(cartId as string);

  if (!cartId || !data) {
    router.push({
      name: 'MainRoute',
    });
  }

  orderData.value = data;
  isLoading.value = false;
});
</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <LoadingComponent v-if="isLoading" />
    <main
      v-else
      class="w-full h-full bg-gray-50 flex justify-center items-center overflow-hidden"
    >
      <div
        class="flex flex-col bg-white p-10 w-full md:h-[unset] md:max-w-[500px] md:max-h-[600px] md:rounded-xl shadow overflow-hidden"
      >
        <h1 class="text-center text-7xl font-bold">
          {{
            orderData?.paymentSuccessfull
              ? 'Thank You!'
              : 'Oh no! Something went wrong'
          }}
        </h1>
        <span class="mb-6 font-semibold text-sm text-gray-400 text-center">
          Order id: {{ orderData?.cart.id }}
        </span>
        <p class="text-center text-lg font-semibold mb-5">
          {{
            orderData?.paymentSuccessfull
              ? 'We got your order, we will contact You soon!'
              : 'Please update payment details!'
          }}
        </p>
        <VButton
          @click="() => placeOrderHandler(true)"
          class="bg-red-600"
          v-if="!orderData?.paymentSuccessfull"
        >
          Solve the payment
        </VButton>
      </div>
    </main>
  </div>
</template>
