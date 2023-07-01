import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOrderStore = defineStore('OrderStore', () => {

  const orderData = ref<{ [key: string]: string | boolean | number }>({})

  return {
    orderData
  };
});
