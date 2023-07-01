import { modelLoader } from "@/helpers/modelLoader";
import type { IOrderController } from "@/types/IOrderController";

export const car: IOrderController = {
    loader: async ({ route }) => {
        // Different api shots here 
        const { product, language } = route.params as Record<string, string>;
        const loader = await modelLoader(product, language);
        const model = loader.model;
        return model;
    },
    submitter: () => {
    },
    routing_rules: [
        { page_name: 'CompanyAddressPage', visible_if: (object: { [key: string]: unknown }) => object['virtual-address-selected'] === 'yes' },
        { page_name: 'MailingAddressPage', visible_if: (object: { [key: string]: unknown }) => object['virtual-address-selected'] === 'yes' },
    ],
}