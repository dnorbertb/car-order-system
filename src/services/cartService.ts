import type { ICartData } from "@/types/ICartData"
import { BACKEND_URL } from "@/env"
const route = BACKEND_URL + '/cart';

export const cartService = {
    async add(data: Omit<ICartData, 'id' | 'createDate' | 'updateDate'>): Promise<ICartData | undefined> {
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
                body: JSON.stringify(data),
            });
            const json = await req.json();
            return json.data as ICartData;
        } catch (error) {
            return undefined;
        }
    },
    async get(id: string): Promise<ICartData | undefined> {
        try {
            const req = await fetch(route + '/get/' + id);
            const json = await req.json();
            return json.data as ICartData;
        } catch (error) {
            return undefined;
        }
    },
    async update(data: Omit<ICartData, 'createDate' | 'updateDate' | 'car' | 'language'>): Promise<ICartData | undefined> {
        try {
            const req = await fetch(route + '/update/' + data.id, {
                method: "PATCH",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data)
            });
            const json = await req.json();
            return json.data as ICartData;
        } catch (error) {
            return undefined;
        }

    },
}