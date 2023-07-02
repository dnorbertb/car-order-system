import type { IOrderData } from "@/types/IOrderData"
import { BACKEND_URL } from "@/env"
const route = BACKEND_URL + '/order';


export const orderService = {
    async add(cartId: string, paymentSuccessfull: boolean): Promise<IOrderData | undefined> {
        try {
            const req = await fetch(route + '/create', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify({ cartId, paymentSuccessfull }),
            });
            const json = await req.json();
            return json.data as IOrderData;
        } catch (error) {
            return undefined;
        }

    },
    async get(id: string): Promise<IOrderData | undefined> {
        try {
            const req = await fetch(route + '/get/' + id);
            const json = await req.json();
            return json.data as IOrderData;
        } catch (error) {
            return undefined;
        }
    },
}