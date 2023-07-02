import { useRoute, useRouter } from "vue-router"
import { useOrderStore } from "@/stores/orderDataStore";
import { cartService } from "@/services/cartService";
import { toRaw, type Ref } from "vue";
import type AbandonedCartModal from '../AbandonedCartModal.vue';


export const useProcessDataHandling = (modalRef: Ref<InstanceType<typeof AbandonedCartModal> | undefined>) => {
    const orderTimeout = 172800000;
    const route = useRoute();
    const router = useRouter();
    const { product, language } = route.params as { product: string, language: string };
    const orderStore = useOrderStore();

    const saveProcessData = () => {
        const cartId = route.query.cart as string;
        if (!cartId) return;
        cartService.update({
            id: cartId,
            orderData: toRaw(orderStore.orderData),
        });
    }

    const restoreProcessData = async () => {
        const cartId = route.query.cart as string;
        const processData = await cartService.get(cartId)
        if (!processData) {
            createNewProcess();
            return;
        };
        orderStore.orderData = processData.orderData;
        router.push({
            query: route.query
        });
    }

    const createNewProcess = async () => {
        const newOrder = await cartService.add({
            car: product,
            language: language,
            orderData: {},
        });

        if (!newOrder) return;
        /// HERE SHOULD BE SOME ANOTHER HANDLING
        router.push({ query: { cart: newOrder.id } });
        createProcessCookie(newOrder.id, orderTimeout);
    }

    const getProcessIdFromCookies = () => {
        const cartIdFromCookie = getCookie('cartId');
        if (!cartIdFromCookie) return undefined;
        return cartIdFromCookie;
    }

    const initializeOrderMonitoring = async () => {
        if (!product) throw new
            Error('Product is not defined, cart cant be activated');

        const cartId = route.query.cart as string;
        if (cartId) {
            restoreProcessData();
            return;
        }

        const abandonedId = getProcessIdFromCookies();
        if (!abandonedId) {
            createNewProcess();
            return;
        }

        const userWantsToContinue = await modalRef.value?.getUserDecision()
        if (!userWantsToContinue) {
            createNewProcess();
            return;
        }

        await router.push({ query: { cart: abandonedId } });
        restoreProcessData();
        return;
    }

    return {
        initializeOrderMonitoring,
        saveProcessData,
        restoreProcessData,
    }
}


const getCookie = (name: string) => {
    const cookies = document.cookie.split(';');
    const cookieString = cookies.find(i => i.includes(name));
    if (!cookieString) return undefined;
    return cookieString.slice(name.length + 2);
}

const createProcessCookie = (id: string, timeout: number) => {
    const expirationDate = new Date(new Date().getTime() + timeout).toUTCString();
    document.cookie = `cartId=${id};expires=${expirationDate};path=/`;
}
