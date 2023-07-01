import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { IModel } from "./IModel";


export type OrderLoaderFunction = ({ route }: { route: RouteLocationNormalizedLoaded }) => Promise<IModel>;

export interface IOrderController {
    loader: OrderLoaderFunction;
    submitter: () => void;
    routing_rules: Array<{
        page_name: string;
        visible_if: (object: { [key: string]: unknown }) => boolean;
    }>;
}