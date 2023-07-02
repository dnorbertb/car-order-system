import { defineStore } from 'pinia';
import { usePartnerConfigStore } from './parnerConfigStore';
import { useOrderStore } from './orderDataStore';
import { computed } from 'vue';

export const useCartStore = defineStore('Cart Store', () => {
    const partnerStore = usePartnerConfigStore();
    const orderDataStore = useOrderStore();

    const choosenProducts = computed(() => {
        const valuesArr: Array<string> = [];

        for (const key in orderDataStore.orderData) {
            if (typeof orderDataStore.orderData[key] !== 'boolean') {
                valuesArr.push(orderDataStore.orderData[key] as string);
            }
            if (orderDataStore.orderData[key]) {
                valuesArr.push(key);
            }
        }

        return partnerStore.partnerData.pricing.products.filter(p => valuesArr.includes(p.id));
    });

    const summaryPrice = computed(() => choosenProducts.value.reduce((pV, cV) => pV + cV.pricing, 0));

    return {
        choosenProducts,
        summaryPrice
    };
});
