import type { ICartData } from "./ICartData";

export interface IOrderData {
    cart: ICartData,
    paymentSuccessfull: boolean
}