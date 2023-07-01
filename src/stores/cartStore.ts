import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
// import { useConfigStore } from './processConfigStore';

export const useCartStore = defineStore('Cart Store', () => {
    // const configStore = useConfigStore();

    // const selectedBundleId = ref('Platinum');
    // const selectedProducts = ref<{ [key: string]: string | boolean | number }>({});
    // const selectedBundleData = computed(() => {
    //     return configStore.pricing.bundles.find(b =>
    //         b.external_service_id.toLocaleLowerCase() === selectedBundleId.value.toLowerCase()
    //     );
    // });
    // const bundleIncludedProducts = computed(() => selectedBundleData.value?.included);
    // const selectedProductsData = computed(() => {
    //     return configStore.pricing.products
    //         .filter(m => selectedProducts.value[m.external_service_id])
    // });
    // const isIncludedInBundle = (productId: string) =>
    //     bundleIncludedProducts.value?.includes(productId)

    return {
        // selectedBundleId,
        // selectedProducts,
        // selectedBundleData,
        // selectedProductsData,
        // bundleIncludedProducts,
        // isIncludedInBundle
    };
});
