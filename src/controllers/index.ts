import type { IOrderController } from '@/types/IOrderController';

export const controllers: { [key: string]: () => Promise<IOrderController> } = {
    model3: () => import('./model3').then(c => c.car),
}