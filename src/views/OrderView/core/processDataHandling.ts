import { useRoute, useRouter } from "vue-router"
import { useOrderStore } from "@/stores/orderDataStore";
import { orderService } from "@/services/orderService";
import { toRaw } from "vue";

export const useProcessDataHandling = () => {
    const route = useRoute();
    const router = useRouter();
    const { product, language } = route.params as { product: string, language: string };
    const orderStore = useOrderStore();

    const saveProcessData = () => {
        const cartId = route.query.cart as string;
        orderService.update({
            id: cartId,
            orderData: toRaw(orderStore.orderData),
        });
    }

    const restoreProcessData = async () => {
        const cartId = route.query.cart as string;
        const processData = await orderService.get(cartId)
        if (!processData) {
            initializeOrderMonitoring();
            return;
        };
        orderStore.orderData = processData.orderData;
        router.push({
            name: 'OrderView',
            params: {
                product: processData.car,
                language: processData.language
            },
            query: route.query
        });
    }

    const initializeOrderMonitoring = async () => {
        const cartId = route.query.cart as string;
        if (!product) throw new
            Error('Product is not defined, cart cant be activated')

        if (!cartId) {
            const newOrder = await orderService.add({
                car: product,
                language: language,
                orderData: {},
            });
            router.push({ query: { cart: newOrder.id } });
        }
    }

    return {
        initializeOrderMonitoring,
        saveProcessData,
        restoreProcessData,
    }
}