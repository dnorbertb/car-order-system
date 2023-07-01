import { useRoute, useRouter } from "vue-router"
import md5 from 'md5';
import { useOrderStore } from "@/stores/orderDataStore";
import { useCartStore } from "@/stores/cartStore";

interface IStorageCart {
    creationDate: string;
    data: {
        [key: string]: string | number | boolean
    },
    cart: {
        [key: string]: string | number | boolean
    },
    va: boolean
}


// THIS NEEDS TO BE TESTED A LOT
// REALLY EXPERIMENTAL VERSION
export const useProcessDataStorageHandling = () => {
    const route = useRoute();
    const router = useRouter();
    const cartId = route.query.cart as string;
    const controller = route.params.product as string;
    const orderStore = useOrderStore();
    const cartStore = useCartStore();

    const saveProcessData = (cartId: string) => {
        const data = {
            creationDate: new Date(),
            data: orderStore.orderData,
            cart: cartStore.selectedProducts,
        }
        localStorage.setItem(cartId, JSON.stringify(data));
    }

    const restoreProcessData = (cartId: string) => {
        const processData = localStorage.getItem(cartId);
        if (!processData) {
            initializeDataLocalStorage();
            return;
        };
        const dataParsed = JSON.parse(processData) as IStorageCart;
        const currentDate = new Date().getTime();
        const cartCreationTime = Date.parse(dataParsed.creationDate);
        const timeout = 7200000;
        if (!(currentDate < (cartCreationTime + timeout))) return;
        orderStore.orderData = dataParsed.data;
        cartStore.selectedProducts = dataParsed.cart;
    }

    const initializeDataLocalStorage = () => {
        if (!controller) throw new
            Error('Controller is not defined, local storage cart cant be activated')

        if (!cartId) {
            const creationDate = new Date().getTime();
            const cartId = md5(creationDate + controller);
            saveProcessData(cartId);
            router.push({ query: { cart: cartId } });
        }
    }

    // I EVEN THINK THAT WE SHOULD MOVE DATA FETCHING TO API
    // SO THEY WOULD BE SAFE, NOT IN LOCAL STORAGE
    // AND THIS SHOULD BE REALLY EASY TO IMPLEMENT WITH LOGIN MODULE AND SO ON
    // AND WE DONT NEED SERVICE WORKER THIS WAY
    // I THINK ITS A PLUS BECAUSE SERVICE WORKER IS NEXT THING TO BUILD
    // INTEGRATING THIS WITH API SHOULD BE MUCH FASTER

    // Add method to call api and fetch data if needeed
    // Add method to show up the modal if there exists cart for current controller but theres no cart id query
    return {
        initializeDataLocalStorage,
        saveProcessData,
        restoreProcessData,
    }
}