import type { IPageDestroySubscriber } from "@/types/IPageDestroySubscriber";

export const useSubscribers = () => {
    const subscribers: Array<IPageDestroySubscriber> = [];

    const callSubscribers = (type: 'next' | 'back') => {
        const results: Array<boolean> = [];
        subscribers.forEach(async s => results.push(await s.fn(type)));
        if (results.includes(false)) return false;
        return true;
    }

    const subscribe = (o: {
        id: string;
        fn: (actionType: 'next' | 'back') => boolean;
    }) => {
        subscribers.push(o);
    };

    const cleanSubscribers = () => subscribers.length = 0;

    return {
        subscribe,
        callSubscribers,
        cleanSubscribers
    }
}