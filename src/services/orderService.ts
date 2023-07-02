import type { IOrderData } from "@/types/IOrderData"
import { BACKEND_URL } from "@/env"
const route = BACKEND_URL + '/order';

export const orderService = {
    async add(data: Omit<IOrderData, 'id' | 'createDate' | 'updateDate'>): Promise<IOrderData> {
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
        return json.data as IOrderData;
    },
    async get(id: string): Promise<IOrderData> {
        const req = await fetch(route + '/get/' + id);
        const json = await req.json();
        return json.data as IOrderData;
    },
    async update(data: Omit<IOrderData, 'createDate' | 'updateDate' | 'car' | 'language'>): Promise<IOrderData> {
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
        return json.data as IOrderData;
    },
}